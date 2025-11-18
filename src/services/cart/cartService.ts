import prisma from "../../config/prisma.config"

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