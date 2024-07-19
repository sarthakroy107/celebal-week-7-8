"use client";
import { GridItemCard } from "@/components/grid-item-card";
import { TItem } from "@/data/items";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function DispayCarousel({
  items,
  title,
  link,
}: {
  items: TItem[];
  title: string;
  link: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-3xl font-medium my-2 mb-3">{title}</p>
        {link === "featured" ? (
          <></>
        ) : (
          <Link
            href={`/${link}`}
            className="text-blue-500 hover:underline pr-10 text-sm"
          >
            See all items
          </Link>
        )}
      </div>
      <Carousel responsive={responsive}>
        {items.map((item) => (
          <GridItemCard key={item.id} {...item} />
        ))}
      </Carousel>
    </div>
  );
}
