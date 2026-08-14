import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth-utils";

export async function createOrder(orderItem: {
    productId: string;
    quantity: number
}[]) {
    const userConnected = await getCurrentUser()

    if(!userConnected) {
        throw new Error("you are not allowed to create an order")
    }
    const [newOrder] = await db.insert(orders).values({userId: userConnected.id}).returning()
    return newOrder
    
}