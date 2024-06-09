import axios from 'axios';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
  });

  const body = await req.text();

  const stripeSignature = req.headers.get('stripe-signature') as string;

  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      endPointSecret
    );
  } catch (error) {
    return NextResponse.json({ msg: 'Webhook error', error });
  }

  const eventType = stripeEvent.type;

  if (eventType === 'checkout.session.completed') {
    const session = stripeEvent.data.object;

    console.log('Checkout session completed:', session.id);
  }

  return new Response('', { status: 200 });
}
