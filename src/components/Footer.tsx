
'use client';

import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

import { COMPANY_EMAIL } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const email = COMPANY_EMAIL;

  return (
    <footer className="w-full">
      <div className="max-w-4xl mx-auto px-4">
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Schustereit & Co.</h3>
            <p className="text-muted-foreground">
              Your partners in growth, from Austin with love.
              <br />
              Thomas & Lindsey
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Menu</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
                <li><Link href="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/book" className="hover:text-foreground">Book Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="h-5">
                  <a href={`mailto:${email}`} className="hover:text-foreground">{email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-6 text-center text-muted-foreground text-sm">
          <p className="h-5">
            <span suppressHydrationWarning>&copy; {currentYear} Schustereit & Co. All Rights Reserved. | Austin, Texas</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
