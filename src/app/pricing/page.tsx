import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const pricingPlans = [
  {
    title: 'Full Brand Identity',
    price: 'From $15,000',
    features: [
      'Brand Strategy & Positioning',
      'Logo & Identity System Design',
      'Comprehensive Brand Guidelines',
      'Key Visuals & Mockups',
      'Social Media & Digital Asset Kit',
    ],
    isActionable: false,
  },
  {
    title: 'AI Integration Strategy',
    price: 'From $20,000',
    features: [
      'AI Opportunity Analysis',
      'Custom AI Strategy Development',
      'Implementation Roadmap & MVP Plan',
      'Technology & Vendor Selection',
      'Team Training & Enablement Session',
    ],
    isActionable: false,
  },
  {
    title: 'Technology Modernization',
    price: 'From $25,000',
    features: [
      'Full Tech Stack Audit',
      'Scalable Architecture Design',
      'Data Migration Planning & Support',
      'API & Integration Strategy',
      'Performance Optimization Plan',
    ],
    isActionable: false,
  },
  {
    title: 'Paid Discovery & Roadmapping',
    price: 'Fixed $3,000',
    features: [
      'In-depth Stakeholder Workshops',
      'Competitive & Market Analysis',
      'User Persona & Journey Mapping',
      'Technical Feasibility Assessment',
      'Actionable Strategic Roadmap',
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
          Simple, transparent pricing for transformative results. Choose a starting point.
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
                        <li key={feature} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-muted-foreground">{feature}</span>
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
