import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="max-w-4xl mx-auto px-4">
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Bonesy Design</h3>
            <p className="text-muted-foreground">
              Crafting tomorrow's digital experiences.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Menu</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/" className="hover:text-foreground">Information</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/book" className="hover:text-foreground">Book Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="mailto:studio@bonesydesign.com" className="hover:text-foreground">studio@bonesydesign.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Bonesy Design. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
