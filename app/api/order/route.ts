import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  const { amount } = (await request.json()) as {
    amount: string;
    currency: string;
  };

  if (!amount) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const options = {
    amount: amount,
    currency: "INR",
    receipt: "receipt_order_1",
  };

  const order = await razorpay.orders.create(options);

  return NextResponse.json({ orderId: order.id }, { status: 200 });
}
