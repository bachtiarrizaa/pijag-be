import dayjs from "dayjs";

export function generateOrderCode(source: "customer" | "cashier") {
  const prefix = source === "customer" ? "C" : "K";
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${dayjs().format("YYYYMMDD")}-${random}`;
}