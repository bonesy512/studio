'use server';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(productName: string, amount: number) {
  const origin = headers().get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key_here') {
    // In a development environment without a real Stripe key,
    // we can simulate a successful checkout for UI/UX testing.
    console.log('Stripe key not found or is placeholder, simulating successful checkout.');
    const successUrl = new URL(`${origin}/pricing`);
    successUrl.searchParams.set('session_id', `cs_test_${btoa(Math.random().toString()).substring(0, 30)}`);
    redirect(successUrl.toString());
    return;
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
    success_url: `${origin}/pricing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });

  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error('Could not create Stripe checkout session.');
  }
}
