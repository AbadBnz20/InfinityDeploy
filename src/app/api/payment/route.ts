import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  const paymentIntent = await stripe.paymentIntents.create({
    amount:Math.round(data.room.price * 100),
    currency: "USD",
    automatic_payment_methods: {
      enabled: true,
    },
    
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
}
