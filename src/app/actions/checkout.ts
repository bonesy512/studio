'use server';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(productName: string, amount: number) {
  const origin = (await headers()).get('origin') || process.env.NEXT_PUBLIC_APP_URL;

  if (!origin) {
    throw new Error('Could not determine origin URL');
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
          },
          unit_amount: amount * 100, // amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/book?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });

  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error('Could not create Stripe checkout session.');
  }
}
