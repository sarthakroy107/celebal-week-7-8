"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
export type TOrder = {
  orderId: string;
  amount: number;
  status: "success" | "failed";
  placedAt: string;
};

export default function Page() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  useEffect(() => {
    (async () => {
      const localOrders = window.localStorage.getItem("orders");

      if (localOrders) {
        setOrders(await JSON.parse(localOrders));
      }
    })();
  }, []);
  return (
    <main className="min-h-screen w-full p-5 px-12">
      <h2 className="text-3xl font-medium mt-16 mb-5 w-full text-center">Your Orders</h2>
      <Table className="">
        <TableCaption>Don&apos;t worry, Just Refresh</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sl No.</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.orderId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.placedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
