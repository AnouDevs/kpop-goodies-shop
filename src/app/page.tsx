import Link from "next/link";
import { getProducts } from "@/services/products";
import { OrderButton } from "@/components/order-button";
import { LogoutButton } from "@/components/logout-button";
import { getCurrentUser } from "@/lib/auth-utils";

export default async function HomePage() {
  const products = await getProducts();
  const user = await getCurrentUser();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Catalog</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <p className="text-sm text-gray-600">
                Logged in as {user.email} ({user.role})
              </p>
              <Link href="/orders" className="text-sm text-blue-600 underline">
                My Orders
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="text-sm text-blue-600 underline">
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.productId} className="border p-4 rounded">
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="mt-2">{(product.price / 100).toFixed(2)}€</p>
            <div className="mt-2">
              <OrderButton productId={product.productId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}