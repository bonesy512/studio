import { Button } from '@/components/ui/button';
import AISuggestion from '@/components/ai-suggestion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    title: 'Full Brand Identity',
    description: 'A complete visual and strategic foundation. We cover brand strategy, logo design, visual systems, and comprehensive guidelines.',
  },
  {
    title: 'AI Integration Strategy',
    description: 'Unlock the power of artificial intelligence. We identify opportunities, develop a custom AI strategy, and create a roadmap for implementation.',
  },
  {
    title: 'Technology Modernization',
    description: 'Future-proof your infrastructure. Our team assesses your current tech stack, plans a migration to modern systems, and supports the execution.',
  },
  {
    title: 'Paid Discovery & Roadmapping',
    description: 'The perfect starting point for complex projects. We conduct an in-depth discovery process to deliver a strategic roadmap with actionable steps.',
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
        <h2 className="text-3xl font-bold tracking-tighter">Who We Are</h2>
        <div className="text-muted-foreground space-y-4">
          <p>
            Based in Austin, Texas, The Salt & Light Co. is a collective of designers, developers, and strategists who believe in the power of technology to reshape industries. We partner with forward-thinking companies to create category-defining brands, products, and AI-powered experiences. Our work is minimalist, our process is collaborative, and our results are transformative.
          </p>
          <p>
            Our pedigree includes founding successful ventures like{' '}
            <a href="https://landhacker.ai" target="_blank" rel="noopener noreferrer" className="text-primary-foreground underline">
              landhacker.ai
            </a>{' '}
            and{' '}
            <a href="https://lazily.ai" target="_blank" rel="noopener noreferrer" className="text-primary-foreground underline">
              lazily.ai
            </a>. Learn more <Link href="/about" className="text-primary-foreground underline">about us</Link>.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter">Services & Areas of Focus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
