"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function ControlOptions() {
  return (
    <div className="w-72 text-xl font-medium mt-16">
      <Accordion type="single" collapsible className="border-y border-black/20">
        <AccordionItem value="item-1" className="">
          <AccordionTrigger className="bg-slate-200 text-xl font-medium px-3">
            Discount
          </AccordionTrigger>
          <AccordionContent className="p-3 space-y-1 font-medium">
            {[20, 30, 40, 50, 60, 75].map((discount, index) => (
              <Details
                key={index}
                detail={discount.toString()}
                category="discount"
                char="% or above"
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="border-y border-black/20">
        <AccordionItem value="item-1" className="">
          <AccordionTrigger className="bg-slate-200 text-xl font-medium px-3">
            Price
          </AccordionTrigger>
          <AccordionContent className="p-3 space-y-1 font-medium">
            {[50, 100, 250, 500, 1000].map((discount, index) => (
              <Details
                key={index}
                detail={discount.toString()}
                category="price"
                char="+"
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="border-y border-black/20">
        <AccordionItem value="item-1" className="">
          <AccordionTrigger className="bg-slate-200 text-xl font-medium px-3">
            Rating
          </AccordionTrigger>
          <AccordionContent className="p-3 space-y-1 font-medium">
            {[4.5, 4, 3.5, 3, 2].map((discount, index) => (
              <Details
                key={index}
                detail={discount.toString()}
                category="rating"
                char="+"
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function Details({
  detail,
  category,
  char,
}: {
  detail: string;
  category: string;
  char: string;
}) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const discount = searchParams.get("discount");
  const rating = searchParams.get("rating");

  const params: string[] = [];

  if (price || category === "price") {
    const value = category === "price" ? detail : price;
    const newValue = category === "price" && value === price ? "" : value;
    params.push(`price=${newValue}`);
  }

  if (discount || category === "discount") {
    const value = category === "discount" ? detail : discount;
    const newValue = category === "discount" && value === discount ? "" : value;
    params.push(`discount=${newValue}`);
  }

  if (rating || category === "rating") {
    const value = category === "rating" ? detail : rating;
    const newValue = category === "rating" && value === rating ? "" : value;
    params.push(`rating=${newValue}`);
  }

  const ultimateSearchParams = params.join("&");

  return (
    <Link
      href={path + `?${ultimateSearchParams}`}
      className="flex gap-x-1 items-center my-0.5"
    >
      <Checkbox
        checked={
          searchParams.get(category) && searchParams.get(category) === detail
            ? true
            : false
        }
      />
      <p>
        {detail}
        {char}
      </p>
    </Link>
  );
}
