import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-utils";
import { eq } from "drizzle-orm";

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

export async function getProducts() {
  return await db.select().from(products);
}

export async function updateProduct(
  productId: string,
  data: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  },
) {
  await requireAdmin();

  return await db
    .update(products)
    .set(data)
    .where(eq(products.productId, productId));
}

export async function deleteProduct(productId: string) {
  await requireAdmin();

  return await db.delete(products).where(eq(products.productId, productId));
}
