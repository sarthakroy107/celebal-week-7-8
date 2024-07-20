"use client";

import { useCartStore } from "@/lib/cart-store";
import { Button } from "./ui/button";

export function CartButton({ itemId }: { itemId: number }) {
  const id = useCartStore((state) =>
    state.items.find((item) => item.id === itemId)
  );
  const push = useCartStore((state) => state.push);
  const pop = useCartStore((state) => state.pop);

  return (
    <>
      {id ? (
        <div className="flex items-center gap-x-2 h-10">
          <button
            className="text-xl font-medium rounded-sm bg-black text-white px-3 py-0.5"
            onClick={() => pop(itemId)}
          >
            -
          </button>
          <p className="text-xl font-medium w-6 text-center">{id.quantity}</p>
          <button
            className="text-xl font-medium rounded-sm bg-black text-white px-3 py-0.5"
            onClick={() => push(itemId)}
          >
            +
          </button>
        </div>
      ) : (
        <Button className="w-24" onClick={() => push(itemId)}>Add</Button>
      )}
    </>
  );
}
