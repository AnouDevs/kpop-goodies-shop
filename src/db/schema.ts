import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  productId: uuid("product_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  stock: integer("stock").notNull().default(0),
});

export const orders = pgTable("orders", {
  orderId: uuid("order_id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  status: text("status").notNull().default("pending"),
  orderDate: timestamp("order_date").notNull().defaultNow(),
  trackingNumber: text("tracking_number"),
});

export const orderItems = pgTable("order_items", {
  orderItemId: uuid("order_item_id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull().references(() => orders.orderId),
  productId: uuid("product_id").notNull().references(() => products.productId),
  quantity: integer("quantity").notNull(),
});