import { TItem } from "@/data/items";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CartButton } from "./cart-button";

export function GridItemCard(item: TItem) {
  return (
    <div className="border border-black/10 rounded-sm hover:shadow-md  flex flex-col justify-center max-w-[400px] bg-white hover:bg-white/90 transition p-3 px-3.5">
      <Image
        src={item.image}
        width={300}
        height={300}
        alt={item.title}
        draggable={false}
        className="w-[21rem] h-56 object-cover border border-black/10 rounded-sm mx-auto"
      />
      <p className="text-xl font-medium text-black px-1 mt-1">
        {item.title.length > 50 ? item.title.slice(0, 48) + "..." : item.title}{" "}
      </p>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-x-1 px-1">
            <p
              className={cn(
                "rounded-[3px] text-xs p-0.5 text-center w-9 text-white font-semibold",
                item.rating >= 4
                  ? "bg-green-700"
                  : item.rating >= 3.5
                  ? "bg-green-500"
                  : item.rating >= 3
                  ? "bg-green-400"
                  : item.rating >= 2
                  ? "bg-yellow-400 "
                  : "bg-red-500"
              )}
            >
              {item.rating}
            </p>
            <p className="text-black/70">({item.reviews})</p>
          </div>
          <div className="flex gap-x-1 items-center">
            <p className="px-1 text-lg font-medium">₹{item.price}</p>
            <s className="text-black/70 text-sm">
              {Math.round(item.price + (item.price * item.discount) / 100)}
            </s>
            <p className="text-green-800 text-sm font-medium">
              {item.discount}% off
            </p>
          </div>
          <p className="px-1 text-black/65 text-xs">Free delhivery</p>
        </div>
        <CartButton itemId={item.id} />
      </div>
    </div>
  );
}
