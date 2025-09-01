'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Information' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/book', label: 'Book Now' },
  ];

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        'transition-colors hover:text-foreground/80',
        pathname === href ? 'text-foreground' : 'text-foreground/60'
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">Bonesy Design</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle navigation menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 p-6">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-bold">Bonesy Design</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} href={link.href}>
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
