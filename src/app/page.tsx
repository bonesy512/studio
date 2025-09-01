
import { Button } from '@/components/ui/button';
import AISuggestion from '@/components/ai-suggestion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Design & Branding',
    description: 'Building enduring brands with comprehensive strategy, visual identity, and web design.',
  },
  {
    title: 'Technology & Development',
    description: 'From custom apps to modernizing tech, we build functional, scalable digital realities.',
  },
  {
    title: 'AI & Strategic Consulting',
    description: 'Harnessing AI honestly and charting a clear course forward with strategic roadmapping.',
  },
];

export default function Home() {
  return (
    <div className="space-y-24">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">The Salt & Light Co.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A high-end design, technology, and AI consultancy for ambitious brands. We build what's next.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter">Your Vision, Illuminated.</h2>
        <div className="text-muted-foreground space-y-4 max-w-4xl">
           <p>
            At The Salt & Light Co., we partner with inspiring Austin businesses to transform bold ideas into tangible digital realities. From foundational branding that tells your unique story to sophisticated AI integrations that future-proof your operations, our work is a testament to honest craftsmanship and strategic guidance. We're here to be a light for your mission, building the digital tools you need to shine in Austin and beyond.
          </p>
          <p>
            Our pedigree includes founding successful ventures like{' '}
            <a href="https://landhacker.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              landhacker.ai
            </a>{' '}
            and{' '}
            <a href="https://lazily.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              lazily.ai
            </a>. Learn more <Link href="/about" className="text-primary underline">about us</Link>.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tighter">Services & Areas of Focus</h2>
          <Button asChild variant="link" className="text-lg">
            <Link href="/services">View All Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <AISuggestion />

      <section className="text-center">
        <Button asChild size="lg">
          <Link href="/pricing">View Pricing & Requirements →</Link>
        </Button>
      </section>
    </div>
  );
}
