import { TItem } from "@/data/items";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ListItemCard(item: TItem) {
  return (
    <div className="flex">
      <Image
        src={item.image}
        width={300}
        height={300}
        alt={item.title}
        draggable={false}
        className="w-[16rem] h-44 object-cover border border-black/10 rounded-sm mx-auto"
      />

      <div className="w-full py-1 px-2">
        <h2 className="text-2xl font-medium">{item.title}</h2>
        <div className="flex items-center gap-x-1 p-1 text-sm mb-1">
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
        <p className="text-black/75 mt-1">
          {item.description.length > 80
            ? item.description.slice(0, 78) + "..."
            : item.description}
        </p>
      </div>
    </div>
  );
}
