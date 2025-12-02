
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Code, Bot, Palette, ShoppingCart, DollarSign, BrainCircuit, Rocket, Wrench, Drone } from 'lucide-react';
import Link from 'next/link';

const designAndBranding = {
  title: 'Design & Branding',
  id: 'design-branding',
  icon: Palette,
  items: [
    { name: 'Logo Design', price: '$1,000+' },
    { name: 'Logo Design & Style Guide', price: '$2,000+' },
    { name: 'Full Brand Identity System', price: '$5,000+' },
    { name: 'UI/UX for Web & Mobile', price: '$5,000+' },
  ],
};

const webAndApp = {
  title: 'Web & App Development',
  id: 'web-app',
  icon: Code,
  items: [
    { name: 'Wordpress Website (CMS)', price: '$5,000+' },
    { name: 'E-commerce Store', price: '$7,500+' },
    { name: 'Custom App / SaaS MVP', price: '$17,500+' },
  ],
};

const aiAndConsulting = {
  title: 'AI & Consulting',
  id: 'ai-consulting',
  icon: BrainCircuit,
  items: [
    { name: 'AI Integration (AaaS)', price: '$5,000+' },
    { name: 'Custom AI Agent Development', price: '$10,000+' },
    { name: 'Paid Discovery & Roadmapping', price: '$2,000' },
  ],
};

const retainersAndHourly = {
  title: 'Retainers & Hourly',
  id: 'retainers-hourly',
  icon: Wrench,
  items: [
    { name: 'General Technical/Development', price: '$175/hr' },
    { name: 'Specialized Consulting (AI/IT)', price: '$250/hr' },
    { name: '15-min billing increments', price: 'Fair & transparent' },
  ],
};

const droneServices = {
  title: 'Drone Services',
  id: 'drone-services',
  icon: Drone,
  items: [
    { name: 'Land Development & Purchase Insight', price: '$175/hr' },
    { name: 'Infrared Scans (Roof/Moisture)', price: '$2,500' },
    { name: '15-min billing increments', price: 'Included' },
  ],
};

const plans = [designAndBranding, webAndApp, aiAndConsulting, retainersAndHourly, droneServices];

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
          <Card key={plan.title} id={plan.id} className="flex flex-col h-full">
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
