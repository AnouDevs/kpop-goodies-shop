import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-utils";

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}) {
  await requireAdmin();

  const [newProduct] = await db.insert(products).values(data).returning();
  return newProduct;
}