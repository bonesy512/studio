// src/app/services/page.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Code, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const serviceCategories = [
  {
    category: 'Design & Branding',
    icon: Palette,
    services: [
      {
        title: 'Full Brand Identity',
        headline: 'We Build Brands That Endure.',
        content: "A powerful brand is more than a logo; it's the soul of your business and your most valuable asset. We guide you through a comprehensive discovery process to unearth your mission, values, and voice. Our Full Brand Identity service delivers a complete strategic and visual foundation—including brand strategy, logo systems, a cohesive visual identity, and detailed guidelines to ensure your brand is not just seen, but remembered and trusted."
      },
      {
        title: 'Marketing & E-commerce Websites',
        headline: 'Your Digital Foundation, Fortified.',
        content: "Your website is the center of your digital ecosystem. It must be more than a brochure; it must be a high-performance engine for growth. We design and develop stunning marketing and e-commerce websites that are not only aesthetically impressive but are also built on a technically sound, scalable foundation. We create seamless, user-centric experiences that serve as a powerful tool for your business, driving both engagement and revenue."
      }
    ]
  },
  {
    category: 'Technology & Development',
    icon: Code,
    services: [
      {
        title: 'Custom App / SaaS Platform (MVP)',
        headline: 'From Ambitious Idea to Functional Reality.',
        content: "You've identified a unique problem that requires a sophisticated digital solution. We specialize in turning complex concepts into functional, scalable Custom Applications and Software-as-a-Service (SaaS) platforms. Starting with a Minimum Viable Product (MVP), we help you get to market efficiently, gather critical user feedback, and lay a rock-solid architectural foundation for future growth and investment."
      },
      {
        title: 'Technology Modernization',
        headline: 'Future-Proofing Your Technical Foundation.',
        content: "Legacy systems and outdated technology hinder growth and create operational friction. Our Technology Modernization service is designed for established businesses ready to upgrade their infrastructure for the future. We conduct a thorough assessment of your current tech stack, devise a strategic migration plan, and provide expert execution to ensure a seamless transition to a more agile, secure, and scalable technological foundation."
      }
    ]
  },
  {
    category: 'AI & Strategic Consulting',
    icon: BrainCircuit,
    services: [
      {
        title: 'AI Integration & Custom Agent Development',
        headline: 'Harnessing Artificial Intelligence, Strategically.',
        content: "AI offers unprecedented opportunities for efficiency and innovation, but knowing where to start can be overwhelming. We serve as your C-level guide into the world of AI. We help you identify the most impactful opportunities within your operations, develop a custom AI strategy, and build and implement solutions—from workflow automation to bespoke AI agents—that deliver measurable business value and a distinct competitive advantage."
      },
      {
        title: 'Paid Discovery & Roadmapping',
        headline: 'Charting a Clear Course Forward.',
        content: "The most successful ventures begin with a clear, strategic plan. Our Paid Discovery & Roadmapping service is the essential first step for any complex digital initiative. We dive deep into your business goals, technical requirements, and market landscape. Through this intensive, collaborative process, we deliver a comprehensive strategic roadmap—a blueprint for success that ensures your investment is built on a foundation of clarity and foresight."
      }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We provide a suite of services built on a foundation of C-level strategic insight and hands-on technical and operational excellence.
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
