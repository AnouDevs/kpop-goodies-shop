import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex gap-4 mb-6 text-sm">
      <Link href="/" className="text-blue-600 underline">
        Catalog
      </Link>
      <Link href="/orders" className="text-blue-600 underline">
        My Orders
      </Link>
    </nav>
  );
}