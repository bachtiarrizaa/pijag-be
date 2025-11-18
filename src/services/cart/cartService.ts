import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../../config/prisma.config"
import { Cart } from "../../types/cart";

export const getCartService = async (customerId: number) => {
  const getCart = await prisma.cart.findFirst({
    where: { customer_id: customerId },
    include: { items: { include: { product: true } } }
  });

  if (!getCart) {
    return{ id: null, customer_id:customerId, total: 0, items: [] };
  }

  return getCart;
}

export const addItemtoCartService = async (customerId: number, data: Cart) => {
  const { productId, quantity } = data;

  // cek customer
  const customer = await prisma.customer.findFirst({
    where: { id: customerId }
  });

  if (!customer) {
    // throw { statusCode: 400, message:  };
    const error: any = new Error("Customer record not found.")
    error.statusCode = 400;
    throw error;
  }

  // cek atau buat cart
  let cart = await prisma.cart.findFirst({
    where: { customer_id: customerId }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { customer_id: customerId }
    });
  }

  // cek apakah produk sudah ada di cart
  let cartItem = await prisma.cartItem.findFirst({
    where: { cart_id: cart.id, product_id: productId }
  });

  // ambil data produk
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    // throw { statusCode: 404, message: "Product not found" };
    const error: any = new Error("Product not found")
    error.statusCode = 400;
    throw error;
  }

  const price = product.price.toNumber();
  const subtotal = new Decimal(price * quantity);

  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: {
        quantity: cartItem.quantity + quantity,
        subtotal: new Decimal(price * (cartItem.quantity + quantity))
      }
    });
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        cart_id: cart.id,
        product_id: productId,
        quantity,
        price,
        subtotal,
      }
    });
  }

  // update total cart
  const total = await prisma.cartItem.aggregate({
    where: { cart_id: cart.id },
    _sum: { subtotal: true }
  });

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      total: total._sum.subtotal || new Decimal(0)
    }
  });

  return cartItem;
};

export const updateCartItemService = async (cartItemId: number, data: Cart) => {
  const { quantity } = data;

  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId }
  });

  if (!cartItem) {
    const error: any = new Error("Cart item not found");
    error.statusCode = 400;
    throw error;
  }

  if (quantity === 0) {
    await prisma.cartItem.delete({
      where: { id: cartItemId }
    });

    const total = await prisma.cartItem.aggregate({
      where: { cart_id: cartItem.cart_id },
      _sum: { subtotal: true }
    });

    return { message: "Item removed from cart"};
  }

  const subtotal = new Decimal(cartItem.price).mul(quantity);

  const updatedItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity, subtotal }
  });

  const total = await prisma.cartItem.aggregate({
    where: { cart_id: cartItem.cart_id },
    _sum: { subtotal: true }
  });

  await prisma.cart.update({
    where: { id: cartItem.cart_id },
    data: { total: total._sum.subtotal || new Decimal(0)}
  });

  return updatedItem;
}

export const deleteCartItemService = async (cartItemId: number) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId}
  });

  if (!cartItem) {
    const error: any = new Error ("Cart item not found");
    error.statusCode = 404;
    throw error;
  };

  const deleteitem = await prisma.cartItem.delete({
    where: { id: cartItemId }
  });

  const total = await prisma.cartItem.aggregate({
    where: { cart_id: cartItem.cart_id },
    _sum: { subtotal: true }
  });

  await prisma.cart.update({
    where: { id: cartItem.cart_id },
    data: { total: total._sum.subtotal || new Decimal(0)}
  });

  return deleteitem;
}