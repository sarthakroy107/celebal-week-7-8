"use client";

import { ListItemCard } from "@/components/list-item-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fakeItems } from "@/data/items";
import { useCartStore } from "@/lib/cart-store";
import Script from "next/script";
import { toast } from "sonner";
import { TOrder } from "../orders/page";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const itemIds = useCartStore((state) => state.items);
  const itemsInCart = fakeItems.filter((item) =>
    itemIds.some((thisItem) => item.id === thisItem.id)
  );

  const handleCheckOut = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const amount = itemsInCart
      .map(
        (item) =>
          item.price *
          (itemIds.find((thisItem) => thisItem.id === item.id)?.quantity || 1)
      )
      .reduce((a, b) => a + b, 0);
    try {
      const orderId: string = await createOrderId(amount);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        name: "Test user",
        description: "Testing payment",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });

          const res = await result.json();
          console.log(res);
          if (res.isOk) {
            const placeOrder = {
              placedAt: new Date().toISOString(),
              orderId: orderId,
              amount: amount,
              status: "success",
            } satisfies TOrder;
            const localOrders = window.localStorage.getItem("orders");
            if (localOrders) {
              const parsedLocalOrders = JSON.parse(localOrders) as TOrder[];
              window.localStorage.setItem(
                "orders",
                JSON.stringify([...parsedLocalOrders, placeOrder])
              );
            } else {
              window.localStorage.setItem(
                "orders",
                JSON.stringify([placeOrder])
              );
            }
            toast.success("payment succeed");
            router.push("/orders");
          } else {
            toast.error(res.message);
          }
        },
        prefill: {
          email: "xyz@gmail.com",
        },
        theme: {
          color: "#56gt76",
        },
      };

      //@ts-ignore
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        toast.error(response.error.description);
      });

      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <main className="p-5 flex flex-col items-center w-full">
        <p className="mt-16 mb-2 text-3xl font-medium">Cart</p>
        <div className="flex gap-x-2 justify-between w-2/3 px-5">
          <ScrollArea className="space-y-3 gap-y-1 max-h-[48rem] pb-8">
            {itemsInCart.map((item) => (
              <ListItemCard key={item.id} {...item} />
            ))}
          </ScrollArea>
          <div className="bg-slate-50 rounded-sm border border-black/10 w-[28rem] min-h-5 flex flex-col items-center justify-between p-4">
            <div className="w-full">
              <h3 className="w-full py-1 text-2xl font-medium text-center border-b border-black/15">
                Cart Value
              </h3>
              <div className="w-full">
                <p className="text-xl font-medium mt-3">Items</p>
                <div className="text-sm text-black/60 space-x-1 p-1 pb-3 border-b border-black/25">
                  {itemsInCart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <p className="min-w-32 text-start">
                        {item.title.length > 30
                          ? item.title.substring(0, 28) + "..."
                          : item.title}
                      </p>
                      <div className="flex gap-x-1">
                        <p className="min-w-12 text-start">₹{item.price}</p>
                        <p>x</p>
                        <p className="min-w-3 text-end">
                          {
                            itemIds.find((thisItem) => thisItem.id === item.id)
                              ?.quantity
                          }
                        </p>
                        <p>=</p>
                        <p className="min-w-12 text-end">
                          ₹
                          {item.price *
                            (itemIds.find((thisItem) => thisItem.id === item.id)
                              ?.quantity || 1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-lg font-medium mt-2">
                  Total Items: {itemsInCart.length}
                </p>
                <p className="text-lg font-medium">
                  Total Quantity: {itemIds.reduce((a, b) => a + b.quantity, 0)}
                </p>
                <p className="text-xl mt-1 font-medium">
                  Total Price: ₹
                  {itemsInCart
                    .map(
                      (item) =>
                        item.price *
                        (itemIds.find((thisItem) => thisItem.id === item.id)
                          ?.quantity || 1)
                    )
                    .reduce((a, b) => a + b, 0)}
                </p>
              </div>
            </div>
            <Button onClick={handleCheckOut} className="w-full mb-2">
              Checkout
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

const createOrderId = async (amount: number) => {
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
};
