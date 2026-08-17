import { getMyOrders } from "@/services/orders";

export default async function OrdersPage() {
  const orders = await getMyOrders();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="border p-4 rounded">
            <p className="font-semibold">Status: {order.status}</p>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}