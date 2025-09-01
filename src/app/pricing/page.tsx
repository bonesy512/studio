
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

const designAndBranding = [
  {
    title: 'Logo Design',
    price: '$2,800',
    description: 'A unique and memorable logo to represent your brand.',
    isActionable: true,
  },
  {
    title: 'Full Brand Identity',
    price: '$6,500',
    description: 'A comprehensive brand system including logo, color palette, typography, and style guide.',
    isActionable: true,
  },
];

const webAndApp = [
  {
    title: 'Marketing Website',
    price: '$7,500',
    description: 'A beautiful and effective website to showcase your business.',
    isActionable: true,
  },
  {
    title: 'E-commerce Website',
    price: '$12,000',
    description: 'A robust online store to sell your products and services.',
    isActionable: true,
  },
  {
    title: 'Custom App / SaaS Platform (MVP)',
    price: '$25,000+',
    description: 'A minimum viable product for your custom application or SaaS idea.',
    isActionable: false,
  },
];

const aiAndConsulting = [
  {
    title: 'AI Integration (AaaS)',
    price: '$8,000',
    description: 'Integrate AI into your existing systems to improve efficiency.',
    isActionable: true,
  },
  {
    title: 'Custom AI Agent Development',
    price: '$15,000',
    description: 'A custom-built AI agent to automate tasks and delight your users.',
    isActionable: false,
  },
];

const retainersAndHourly = [
    {
        title: 'General Technical/Development',
        price: '$175/hr',
        description: 'For ongoing development, maintenance, and support needs.',
        isActionable: false,
    },
    {
        title: 'Specialized Consulting (AI/IT Strategy)',
        price: '$250/hr',
        description: 'Expert guidance on AI and IT strategy to drive your business forward.',
        isActionable: false,
    },
     {
        title: 'Paid Discovery & Roadmapping',
        price: 'Fixed $3,000',
        description: 'In-depth analysis and strategic planning for your project.',
        isActionable: true,
    }
];


export default function PricingPage() {
  const renderPlan = (plan: any) => (
    <Card key={plan.title} className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{plan.title}</CardTitle>
        <CardDescription className="text-2xl font-semibold !text-primary-foreground">{plan.price}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
          <p className="text-muted-foreground">{plan.description}</p>
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
  );

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Pricing & Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing for transformative results. Choose a service or book a consultation.
        </p>
      </section>
      
      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Design & Branding</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {designAndBranding.map(renderPlan)}
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Web & App Development</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {webAndApp.map(renderPlan)}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-4">AI & Consulting</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {aiAndConsulting.map(renderPlan)}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Retainers & Hourly</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {retainersAndHourly.map(renderPlan)}
          </div>
        </div>
      </section>
    </div>
  );
}
