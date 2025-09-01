import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block">
            Bonesy Design
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm ml-auto">
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Information
          </Link>
          <Link
            href="/pricing"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Pricing
          </Link>
          <Link
            href="/book"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
