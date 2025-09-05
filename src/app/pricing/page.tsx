
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Code, Bot, Palette, ShoppingCart, DollarSign, BrainCircuit, Rocket, Wrench } from 'lucide-react';
import Link from 'next/link';

const designAndBranding = {
  title: 'Design & Branding',
  icon: Palette,
  items: [
    { name: 'Logo Design & Style Guide', price: '$2,500+' },
    { name: 'Full Brand Identity System', price: '$3,500+' },
    { name: 'UI/UX for Web & Mobile', price: '$4,500+' },
  ],
};

const webAndApp = {
  title: 'Web & App Development',
  icon: Code,
  items: [
    { name: 'Marketing Website (CMS)', price: '$7,500+' },
    { name: 'E-commerce Store', price: '$12,000+' },
    { name: 'Custom App / SaaS MVP', price: '$25,000+' },
  ],
};

const aiAndConsulting = {
  title: 'AI & Consulting',
  icon: BrainCircuit,
  items: [
    { name: 'AI Integration (AaaS)', price: '$8,000+' },
    { name: 'Custom AI Agent Development', price: '$15,000+' },
    { name: 'Paid Discovery & Roadmapping', price: '$3,000' },
  ],
};

const retainersAndHourly = {
    title: 'Retainers & Hourly',
    icon: Wrench,
    items: [
        { name: 'General Technical/Development', price: '$175/hr' },
        { name: 'Specialized Consulting (AI/IT)', price: '$250/hr' },
        { name: '15-min billing increments', price: 'Fair & transparent' },
    ],
};

const plans = [designAndBranding, webAndApp, aiAndConsulting, retainersAndHourly];

export default function PricingPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Pricing & Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transparent, a la carte pricing for transformative results. Choose a service or book a consultation.
        </p>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {plans.map((plan) => (
          <Card key={plan.title} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <plan.icon className="w-8 h-8 text-primary" />
                <CardTitle>{plan.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <ul className="space-y-3">
                {plan.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-semibold text-foreground">{item.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                   <Link href="/book">Book a Consultation</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
