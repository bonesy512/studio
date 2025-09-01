'use server';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createDiscoverySession() {
  const origin = headers().get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Paid Discovery & Roadmapping',
            description: 'In-depth discovery process and strategic roadmap.',
          },
          unit_amount: 300000, // $3000.00
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/pricing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
  });

  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error('Could not create Stripe checkout session.');
  }
}
