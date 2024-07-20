import { fakeItems } from "@/data/items";
import { DispayCarousel } from "./carousel";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white p-6 px-12 space-y-7 mt-12">
      <DispayCarousel
        link="featured"
        title="Featured Items"
        items={fakeItems.filter((_, index) => index < 6)}
      />
      <DispayCarousel
        link="electronics"
        title="Electronics"
        items={fakeItems.filter(items => items.category === "electronics")}
      />
      <DispayCarousel
        link="wearables"
        title="Clothing"
        items={fakeItems.filter((items, index) => items.category === "wearables")}
      />
      <DispayCarousel
        link="books"
        title="Books"
        items={fakeItems.filter((items, index) => items.category === "books")}
      />
      <DispayCarousel
        link="food"
        title="Food"
        items={fakeItems.filter((items, index) => items.category === "food")}
      />
    </main>
  );
}
