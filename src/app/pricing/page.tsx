
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const pricingPlans = [
  {
    title: 'Full Brand Identity',
    price: 'From $15,000',
    features: [
      { name: 'Brand Strategy & Positioning', price: '$5,000' },
      { name: 'Logo & Identity System Design', price: '$6,000' },
      { name: 'Comprehensive Brand Guidelines', price: '$2,500' },
      { name: 'Key Visuals & Mockups', price: '$2,000' },
      { name: 'Social Media & Digital Asset Kit', price: '$1,500' },
    ],
    isActionable: false,
  },
  {
    title: 'AI Integration Strategy',
    price: 'From $20,000',
    features: [
      { name: 'AI Opportunity Analysis', price: '$7,000' },
      { name: 'Custom AI Strategy Development', price: '$8,000' },
      { name: 'Implementation Roadmap & MVP Plan', price: '$4,000' },
      { name: 'Technology & Vendor Selection', price: '$2,000' },
      { name: 'Team Training & Enablement Session', price: '$3,000' },
    ],
    isActionable: false,
  },
  {
    title: 'Technology Modernization',
    price: 'From $25,000',
    features: [
      { name: 'Full Tech Stack Audit', price: '$8,000' },
      { name: 'Scalable Architecture Design', price: '$9,000' },
      { name: 'Data Migration Planning & Support', price: '$5,000' },
      { name: 'API & Integration Strategy', price: '$4,000' },
      { name: 'Performance Optimization Plan', price: '$3,000' },
    ],
    isActionable: false,
  },
  {
    title: 'Paid Discovery & Roadmapping',
    price: 'Fixed $3,000',
    features: [
      { name: 'In-depth Stakeholder Workshops', price: '$1,000' },
      { name: 'Competitive & Market Analysis', price: '$500' },
      { name: 'User Persona & Journey Mapping', price: '$500' },
      { name: 'Technical Feasibility Assessment', price: '$500' },
      { name: 'Actionable Strategic Roadmap', price: '$500' },
    ],
    isActionable: true,
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Pricing & Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing for transformative results. Build your plan or choose a package.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {pricingPlans.map((plan) => (
          <Card key={plan.title} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription className="text-2xl font-semibold !text-primary-foreground">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <p className="text-muted-foreground font-semibold">What's included:</p>
                <ul className="space-y-3">
                    {plan.features.map(feature => (
                        <li key={feature.name} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                <span className="text-muted-foreground">{feature.name}</span>
                            </div>
                            <span className="font-semibold text-primary-foreground/90">{feature.price}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
              {plan.isActionable ? (
                <Button asChild className="w-full">
                  <Link href="/book">Book Discovery Session</Link>
                </Button>
              ) : (
                <Button asChild className="w-full" variant="outline">
                    <Link href="/book">Book a Consultation</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
