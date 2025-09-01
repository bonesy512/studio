// src/app/portfolio/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Paintbrush } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Our Work</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A selection of projects that showcase our passion for design, technology, and innovation.
        </p>
      </section>

      <section className="flex justify-center items-center h-96">
        <Card className="text-center p-8 space-y-4">
          <CardHeader className="items-center">
            <Paintbrush className="w-12 h-12 text-primary" />
            <CardTitle>Portfolio Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are currently curating a collection of our best work. Please check back soon to see our projects.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
