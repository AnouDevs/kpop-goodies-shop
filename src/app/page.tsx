import { getProducts } from "@/services/products";
import { OrderButton } from "@/components/order-button";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Catalog</h1>
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