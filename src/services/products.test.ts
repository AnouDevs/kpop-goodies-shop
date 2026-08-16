import { describe, expect, it, vi } from "vitest";
import { createProduct, updateProduct } from "./products";
import { auth } from "@/lib/auth";

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

const fakeProduct = {
  name: "Test Product",
  description: "A test product",
  price: 10,
  category: "test",
  stock: 5,
};

const fakeProductId = "123qsdfsd";

describe("createProduct", () => {
  it("throws an error when you are not connected", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    await expect(createProduct(fakeProduct)).rejects.toThrow(
      "Not authenticated",
    );
  });

  it("throws an error when user is not admin", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { role: "client" },
    } as any);
    await expect(createProduct(fakeProduct)).rejects.toThrow(
      "Insufficient permissions",
    );
  });
});

describe("updateProduct", () => {
  it("throws an error when you are not connected", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    await expect(updateProduct(fakeProductId, fakeProduct)).rejects.toThrow(
      "Not authenticated",
    );
  });

  it("throws an error when user is not admin", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { role: "client" },
    } as any);
    await expect(updateProduct(fakeProductId, fakeProduct)).rejects.toThrow(
      "Insufficient permissions",
    );
  });
});
