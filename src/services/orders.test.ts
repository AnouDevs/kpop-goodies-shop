import { describe, expect, it, vi } from "vitest";
import { cancelOrder, createOrder, getAllOrders, shipOrder } from "./orders";
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

vi.mock("@/db", () => ({
  db: {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi
          .fn()
          .mockResolvedValue([{ userId: "someone-else", status: "pending" }]),
      })),
    })),
  },
}));

const fakeItems = {
  productId: "adsqfs12312",
  quantity: 50,
};

const fakeOrderId = "order5234532534";
const fakeTrackingNumber = "dsqfsdfzesqfqs234234234";

describe("createOrder", () => {
  it("throws an error when you are not connected", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    await expect(createOrder([fakeItems])).rejects.toThrow(
      "you are not allowed to create an order",
    );
  });
});

describe("getAllOrders", () => {
  it("throws an error when you are not connected", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    await expect(getAllOrders()).rejects.toThrow("Not authenticated");
  });

  it("throws an error when user is not admin", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { role: "client" },
    } as any);
    await expect(getAllOrders()).rejects.toThrow("Insufficient permissions");
  });
});

describe("cancelOrder", () => {
  it("throws an error when you are not allowed to cancel an order", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    await expect(cancelOrder(fakeOrderId)).rejects.toThrow(
      "you are not allowed to cancel an order",
    );
  });

  it("throws an error when you cannot cancel this order", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { role: "client" },
    } as any);
    await expect(cancelOrder(fakeOrderId)).rejects.toThrow(
      "you cannot cancel this order",
    );
  });
});

describe("shipOrder", () => {
  it("throws an error when you are not connected", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);
    await expect(shipOrder(fakeOrderId, fakeTrackingNumber)).rejects.toThrow(
      "Not authenticated",
    );
  });

  it("throws an error when user is not admin", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { role: "client" },
    } as any);
    await expect(shipOrder(fakeOrderId, fakeTrackingNumber)).rejects.toThrow(
      "Insufficient permissions",
    );
  });
});
