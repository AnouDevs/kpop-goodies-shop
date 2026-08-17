"use server";

import { createOrder } from "@/services/orders";

export async function orderProduct(productId: string) {
  await createOrder([{ productId, quantity: 1 }]);
}