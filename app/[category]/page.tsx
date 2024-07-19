"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ControlOptions } from "./controls";
import { fakeItems } from "@/data/items";
import { GridItemCard } from "@/components/grid-item-card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ListItemCard } from "@/components/list-item-card";

export default function Page({ params }: { params: { category: string } }) {
  const filteredList = fakeItems.filter(
    (item) => item.category === params.category
  );
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <main className="flex gap-x-3 p-3 w-full">
      <ControlOptions />
      <ScrollArea className="h-[56rem] w-full">
        <div className="flex items-end gap-x-2 border-b border-black/15 mb-5 pt-3 font-medium text-lg fixed top-0 bg-white/80 w-full min-h-14">
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
        <div className="h-16"></div>
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
