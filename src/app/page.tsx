
import { Button } from '@/components/ui/button';
import AISuggestion from '@/components/ai-suggestion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Brand Strategy & Identity',
    description: 'Together, we’ll build an enduring brand that truly feels like you. We dive deep into your story and your goals to create a clear strategy, a beautiful visual identity, and messaging that connects with the people you want to reach.',
  },
  {
    title: 'Digital Marketing Campaigns',
    description: "We love bringing a great story to life online. We'll work with you from the first idea to the final click, designing and managing digital marketing campaigns that don't just get attention—they build community and drive real growth.",
  },
  {
    title: 'Advertising & Media Buying',
    description: "We'll help you get your message in front of the right people, at the right time. We handle all the planning and media buying to make sure your investment works hard for you, connecting you with the audience that needs to hear what you have to say.",
  },
];

export default function Home() {
  return (
    <div className="space-y-24">
      <section className="text-center space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">Schustereit & Co.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your vision, our partnership. Marketing for your life's work.
        </p>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter">It Started with a Partnership.</h2>
        <div className="text-muted-foreground space-y-4 max-w-4xl mx-auto">
           <p>
            Our story began in the whirlwind of life, where we realized we could conquer just about anything with our heads together. That belief is the foundation of our business. We know you’ve poured everything into your work, and we’re here to be the dedicated partners who help you share it with the world. We combine our strengths—from big-picture brand strategy to the nitty-gritty of digital marketing—to build a plan that feels like *you* and truly connects with your customers.
          </p>
          <p>
            Before we teamed up, we each built our own successful ventures (you might have heard of{' '}
            <a href="https://landhacker.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              landhacker.ai
            </a>{' '}
            and{' '}
            <a href="https://lazily.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              lazily.ai
            </a>
            !). We learned so much along the way, and now we bring all of that experience to the table for you.{' '}
            <Button asChild variant="link" className="text-base p-0 h-auto">
                <Link href="/about">Read Our Full Story</Link>
            </Button>
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tighter">Core Services</h2>
          <Button asChild variant="link" className="text-lg">
            <Link href="/services">View All Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Ready to start the conversation?</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Every great partnership starts with a simple chat. We'd love to hear about your business, your vision, and where you'd like to go. Let's see if we're the right fit to help you get there.
        </p>
         <div className="text-center">
            <Button asChild size="lg">
              <Link href="/book">Let's Chat</Link>
            </Button>
         </div>
      </section>

    </div>
  );
}
