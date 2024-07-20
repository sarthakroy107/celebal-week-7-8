"use client";
import { GridItemCard } from "@/components/grid-item-card";
import { Input } from "@/components/ui/input";
import { fakeItems } from "@/data/items";
import { cn } from "@/lib/utils";
import { LucideSearch } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [filteredItems, setFilteredItems] = useState(fakeItems);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const titleFiltered = fakeItems.filter((item) =>
      item.title
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(search.replace(/\s/g, "").toLowerCase())
    );
    const categoryFiltered = fakeItems.filter((item) =>
      item.category
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(search.replace(/\s/g, "").toLowerCase())
    );

    const allFilteredItems = [...titleFiltered];
    categoryFiltered.forEach((item) => {
      if (!titleFiltered.includes(item)) {
        allFilteredItems.push(item);
      }
    });

    setFilteredItems(allFilteredItems);
  }, [search]);

  useEffect(() => {}, [filteredItems]);

  return (
    <main className="mt-10 w-full flex flex-col items-center p-7">
      <p className="mt-4 mb-1 text-3xl font-semibold">Search Product</p>
      <p className="text-sm text-black/50">
        Category name or Product title
      </p>
      <p className="mb-7 mt-1 text-xs text-black/40">
        Categories in stock: electronics, wearables, furniture, books, food,
        misc
      </p>
      <div className="flex mx-auto">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="w-[30rem] rounded-l-full focus-visible:ring-0 focus:ring-0"
        />
        <button className="bg-slate-200/80 px-3 pr-5 rounded-r-full">
          <LucideSearch />
        </button>
      </div>
      <div
        className={cn(
          filteredItems.length
            ? "grid grid-cols-4 gap-2.5 mt-7"
            : "w-full flex justify-center"
        )}
      >
        {filteredItems.length ? (
          filteredItems.map((item) => <GridItemCard key={item.id} {...item} />)
        ) : (
          <p className="text-xl font-medium text-black/50 mt-10">
            No items found
          </p>
        )}
      </div>
    </main>
  );
}
