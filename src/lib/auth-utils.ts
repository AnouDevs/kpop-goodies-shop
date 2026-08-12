import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
}

export async function requireAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Not authenticated");
  }
  if (currentUser.role === "admin") {
    return currentUser;
  }
  throw new Error("Insufficient permissions");
}