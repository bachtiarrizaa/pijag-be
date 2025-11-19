import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../../config/prisma.config";
import { OrderSource } from "@prisma/client";
import { CreateOrder, OrderItem } from "../../types/order";
import { generateOrderCode } from "../../utils/generateOrderCode";

export const createOrderService = async (cashier_id: number | null, data: CreateOrder) => {
  const { customer_id, items } = data;

  if (!customer_id || customer_id == null) {
    const error: any = new Error("customer_id is required")
    error.statusCode = 400;
    throw error;
  }

  if (!items || items.length === 0) {
    const error: any = new Error("Items cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  let source: OrderSource;
  if (cashier_id) {
    source = OrderSource.cashier;
  } else {
    source = OrderSource.customer;
  }

  const order_code = generateOrderCode(source);

  let total = new Decimal(0);

  const validatedItems = await Promise.all(
    items.map(async (item: OrderItem) => {
      const product = await prisma.product.findUnique({
        where: { id: BigInt(item.product_id) },
      });

      if (!product)
        throw { statusCode: 404, message: `Product not found: ${item.product_id}` };

      const quantity = Number(item.quantity);
      const subtotal = product.price.mul(quantity);
      total = total.add(subtotal);

      return {
        product_id: BigInt(item.product_id),
        quantity,
        price: product.price,
        subtotal,
      };
    })
  );

  return prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        customer_id: BigInt(customer_id),
        cashier_id: cashier_id ? BigInt(cashier_id) : null,
        source,
        order_code,
        total,
        final_total: total,
        order_items: { create: validatedItems },
      },
      include: { order_items: true },
    });

    for (const item of validatedItems) {
      await tx.product.update({
        where: { id: item.product_id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return newOrder;
  });
};
