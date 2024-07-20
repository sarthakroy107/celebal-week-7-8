"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ControlOptions } from "./controls";
import { fakeItems } from "@/data/items";
import { GridItemCard } from "@/components/grid-item-card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ListItemCard } from "@/components/list-item-card";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { category: string } }) {
  const [filteredList, setFilteredList] = useState(
    fakeItems.filter((item) => item.category === params.category)
  );

  const searchParams = useSearchParams();
  const [view, setView] = useState<"list" | "grid">("list");

  useEffect(() => {
    console.log("In useEffect");
    let list = fakeItems.filter((item) => item.category === params.category);
    const rating = searchParams.get("rating");
    const price = searchParams.get("price");
    const disount = searchParams.get("discount");
    if (rating) {
      console.log("rating", rating);
      list = list.filter((item) => item.rating >= Number(rating));
    }
    if (price) {
      console.log("price", price);
      list = list.filter((item) => item.price >= Number(price));
    }
    if (disount) {
      console.log("disount", disount);
      list = list.filter((item) => item.discount >= Number(disount));
    }
    console.log("list", list);
    setFilteredList(list || []);
  }, [searchParams]);

  useEffect(() => {}, [filteredList]);

  return (
    <main className="flex gap-x-3 p-3 w-full">
      <ControlOptions />
      <ScrollArea className="h-[56rem] w-full">
        <div className="flex items-end gap-x-2 border-b border-black/15 mb-5 pt-3 font-medium text-lg fixed top-14 bg-white/80 w-full min-h-14">
          <button onClick={() => setView("list")}>
            <p className={cn(view === "list" && "text-blue-500")}>List view</p>
            <div
              className={cn(view === "list" && "bg-blue-500 w-full", "h-1")}
            ></div>
          </button>
          <button onClick={() => setView("grid")}>
            <p className={cn(view === "grid" && "text-blue-500")}>Grid view</p>
            <div
              className={cn(view === "grid" && "bg-blue-500 w-full", "h-1")}
            ></div>
          </button>
        </div>
        <div className="mt-24"></div>
        <div
          className={cn(
            view === "grid" && "w-full grid grid-cols-4 gap-1.5",
            view === "list" && "px-1 space-y-3"
          )}
        >
          {view === "grid"
            ? filteredList.map((item) => (
                <GridItemCard key={item.id} {...item} />
              ))
            : filteredList.map((item) => (
                <ListItemCard key={item.id} {...item} />
              ))}
        </div>
      </ScrollArea>
    </main>
  );
}
