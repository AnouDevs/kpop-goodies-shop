import { describe, it, expect, vi } from "vitest";
import { requireAdmin } from "./auth-utils";
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

describe("requireAdmin", () => {
  it("throws an error when no user is connected", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);

    await expect(requireAdmin()).rejects.toThrow("Not authenticated");
  });

  it("throws an error when user is not admin", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { role: "client" },
    } as any);
    await expect(requireAdmin()).rejects.toThrow("Insufficient permissions");
  });

  it("returns the user when they are admin", async () => {
    const mockUser = { id: "123", role: "admin" };
    vi.mocked(auth.api.getSession).mockResolvedValue({ user: mockUser } as any);

    const result = await requireAdmin();

    expect(result).toEqual(mockUser);
  });
});
