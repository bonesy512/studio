import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const pricingPlans = [
  {
    title: 'Full Brand Identity',
    price: 'From $15,000',
    description: 'A complete visual and strategic foundation. We cover brand strategy, logo design, visual systems, and comprehensive guidelines to ensure consistency at every touchpoint.',
  },
  {
    title: 'AI Integration Strategy',
    price: 'From $20,000',
    description: 'Unlock the power of artificial intelligence. We identify opportunities, develop a custom AI strategy, and create a roadmap for implementation, from chatbots to complex data models.',
  },
  {
    title: 'Technology Modernization',
    price: 'From $25,000',
    description: 'Future-proof your infrastructure. Our team assesses your current tech stack, plans a migration to modern systems, and supports the execution for enhanced performance and scalability.',
  },
  {
    title: 'Paid Discovery & Roadmapping',
    price: 'Fixed $3,000',
    description: 'The perfect starting point for complex projects. We conduct an in-depth discovery process to understand your challenges and deliver a strategic roadmap with clear, actionable steps. This fee is credited towards any larger project engagement.',
    isActionable: true,
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Pricing & Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Simple, transparent pricing for transformative results.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pricingPlans.map((plan) => (
          <Card key={plan.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription className="text-2xl font-semibold !text-primary-foreground">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{plan.description}</p>
            </CardContent>
            {plan.isActionable && (
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="https://calendly.com/your-username/discovery-session" target="_blank" rel="noopener noreferrer">
                    Book Discovery Session
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </section>
    </div>
  );
}
