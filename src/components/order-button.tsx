"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { orderProduct } from "@/app/actions";

export function OrderButton({ productId }: { productId: string }) {
  const [ordered, setOrdered] = useState(false);

  async function handleClick() {
    await orderProduct(productId);
    setOrdered(true);
  }

  if (ordered) {
    return <p className="text-sm text-green-600">Order placed ✓</p>;
  }

  return <Button onClick={handleClick}>Order</Button>;
}