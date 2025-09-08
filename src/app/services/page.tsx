// src/app/services/page.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Code, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const serviceCategories = [
  {
    category: 'AI & Strategic Consulting',
    icon: BrainCircuit,
    services: [
      {
        title: 'AI Integration & Custom Agent Development',
        headline: 'Putting artificial intelligence to work for you.',
        content: "AI can open up incredible opportunities, but it’s hard to know where to begin. We act as your personal guide, helping you find the best ways to use AI in your business. We’ll develop a custom strategy and build tailored AI solutions—from simple automations to complex agents—that save you time and give you a competitive edge."
      },
      {
        title: 'Paid Discovery & Roadmapping',
        headline: 'The perfect plan starts here.',
        content: "The best projects begin with a clear and thoughtful plan. Our Discovery & Roadmapping service is the essential first step for any big project. We’ll dive deep with you to understand your goals, technical needs, and the challenges ahead, delivering a detailed roadmap that ensures your project is set up for success from day one."
      }
    ]
  },
  {
    category: 'Design & Branding',
    icon: Palette,
    services: [
      {
        title: 'Full Brand Identity',
        headline: 'A brand that’s authentically you.',
        content: "A powerful brand is more than a logo—it’s the heart of your business. We work closely with you to understand your mission, values, and voice. From there, we build a complete brand foundation, including a clear strategy, a beautiful visual identity, and detailed guidelines to make sure your story is told consistently and memorably."
      },
      {
        title: 'Marketing & E-commerce Websites',
        headline: 'Your digital home, beautifully built.',
        content: "Your website is the centerpiece of your online world. We design and build stunning, high-performance websites that are not just beautiful, but also intuitive and reliable. We focus on creating a seamless experience for your visitors that drives engagement and growth for your business."
      }
    ]
  },
  {
    category: 'Technology & Development',
    icon: Code,
    services: [
      {
        title: 'Custom App / SaaS Platform (MVP)',
        headline: 'From ambitious idea to working reality.',
        content: "Have a big idea for a custom app or platform? We specialize in turning complex concepts into functional, market-ready products. We start by building a Minimum Viable Product (MVP) to help you launch efficiently, get real user feedback, and create a solid foundation for future growth."
      },
      {
        title: 'Technology Modernization',
        headline: 'Future-proofing your business.',
        content: "Outdated technology can hold your business back. We help you move forward by assessing your current systems and creating a clear plan to upgrade your tech. We’ll guide you through every step of the transition to a more secure, scalable, and efficient foundation for your business."
      }
    ]
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We offer a range of services designed to bring your vision to life, combining strategic thinking with hands-on expertise.
        </p>
      </section>

      {serviceCategories.map((category) => (
        <section key={category.category} className="space-y-8">
          <div className="flex items-center gap-4">
            <category.icon className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold tracking-tighter">{category.category}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.services.map((service) => (
              <Card key={service.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <h3 className="text-lg font-semibold text-primary">{service.headline}</h3>
                  <p className="text-muted-foreground">{service.content}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/pricing">View Pricing Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
