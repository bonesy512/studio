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
        headline: 'Building Brands That Endure.',
        content: "A powerful brand is more than a logo; it's the soul of your business. For many Austin entrepreneurs, capturing that essence is the first major hurdle. We guide you through a comprehensive discovery process to unearth your mission, values, and voice. Our Full Brand Identity service delivers a complete strategic and visual foundation, including brand strategy, logo design, a cohesive visual system (colors, typography), and detailed guidelines to ensure consistency across every touchpoint. We build local Austin brands that are not just seen, but remembered and trusted."
      },
      {
        title: 'Marketing & E-commerce Websites',
        headline: 'Your Digital Lighthouse.',
        content: "Your website should be your hardest-working employee, attracting and engaging customers 24/7. We design and develop stunning, high-performance marketing and e-commerce websites that serve as a beacon for your brand in the competitive Austin market. Whether you need a compelling marketing site to tell your story or a robust e-commerce platform to drive sales, we build seamless, user-friendly experiences. Our focus is on creating a digital home that not only looks beautiful but also drives real-world results for your business."
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
        content: "You've identified a unique problem that needs a digital solution. Now, you need a technical partner in Austin to help you build it with excellence. We specialize in turning complex concepts into functional, scalable Custom Applications and Software-as-a-Service (SaaS) platforms. Starting with a Minimum Viable Product (MVP), we help you get to market quickly, gather user feedback, and lay a rock-solid foundation for future growth. Let us be the technical guide that illuminates the path from your vision to a thriving product."
      },
      {
        title: 'Technology Modernization',
        headline: 'Future-Proofing Your Foundation.',
        content: "Outdated technology can hinder growth and create inefficiencies. Our Technology Modernization service is designed for established Austin businesses ready to upgrade their infrastructure for the future. We conduct a thorough assessment of your current tech stack, devise a strategic migration plan to modern systems, and provide expert support throughout the execution. We help you shed legacy constraints and embrace a more agile, secure, and scalable technological foundation."
      }
    ]
  },
  {
    category: 'AI & Strategic Consulting',
    icon: BrainCircuit,
    services: [
      {
        title: 'AI Integration & Custom Agent Development',
        headline: 'Harnessing Artificial Intelligence, Honestly.',
        content: "Artificial intelligence offers unprecedented opportunities for efficiency and innovation. But for many business owners in Austin, knowing where to start is overwhelming. We serve as your trusted guide into the world of AI. We help you identify the most impactful opportunities within your operations, develop a custom AI strategy, and build and implement solutions—from workflow automation to custom AI agents—that deliver measurable value. Our goal is to demystify AI, providing you with practical tools that empower your team and serve your customers better."
      },
      {
        title: 'Paid Discovery & Roadmapping',
        headline: 'Charting a Clear Course Forward.',
        content: "The most successful projects begin with a clear, strategic plan. Our Paid Discovery & Roadmapping service is the essential first step for any complex digital initiative. We dive deep into your goals, challenges, and the unique landscape of the Austin market. Through this intensive, collaborative process, we deliver a comprehensive strategic roadmap complete with actionable steps, clear timelines, and defined deliverables. This isn't just a plan; it's a blueprint for success, ensuring your investment is built on a foundation of clarity and foresight."
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
          Honest craftsmanship and strategic guidance to help your Austin-based business shine. We build the digital tools you need to succeed.
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
