import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { getCurrentUser, requireAdmin } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";

export async function createOrder(
  items: { productId: string; quantity: number }[],
) {
  const userConnected = await getCurrentUser();

  if (!userConnected) {
    throw new Error("you are not allowed to create an order");
  }

  const [newOrder] = await db
    .insert(orders)
    .values({ userId: userConnected.id })
    .returning();

  const itemsToInsert = items.map((item) => ({
    orderId: newOrder.orderId,
    productId: item.productId,
    quantity: item.quantity,
  }));

  return await db.insert(orderItems).values(itemsToInsert).returning();
}

export async function getMyOrders() {
  const userConnected = await getCurrentUser();
  if (!userConnected) {
    throw new Error("you are not allowed to get your order");
  }
  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userConnected.id));
}

export async function getAllOrders() {
  await requireAdmin();
  return await db.select().from(orders);
}
