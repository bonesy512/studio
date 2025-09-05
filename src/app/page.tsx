
import { Button } from '@/components/ui/button';
import AISuggestion from '@/components/ai-suggestion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Brand Strategy & Identity',
    description: 'We build enduring brands through comprehensive strategy, visual identity, and messaging that tells your unique story and resonates with your audience.',
  },
  {
    title: 'Digital Marketing Campaigns',
    description: 'From concept to execution, we design and manage impactful digital marketing campaigns across all channels to drive growth and engagement.',
  },
  {
    title: 'Advertising & Media Buying',
    description: 'We handle media planning and buying to ensure your message reaches the right audience, at the right time, on the right platform for maximum ROI.',
  },
];

export default function Home() {
  return (
    <div className="space-y-24">
      <section className="text-center space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">Schustereit & Co.</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A full-service marketing and advertising agency built on integrity, strategic foresight, and operational excellence. We are the strategic stewards of your brand's future.
        </p>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter">Your Vision, Amplified.</h2>
        <div className="text-muted-foreground space-y-4 max-w-4xl mx-auto">
           <p>
            At Schustereit & Co., we bring C-level, hands-on operational expertise to every client engagement. Our unique blend of strategic business development, IT infrastructure, and digital marketing savvy allows us to build campaigns that are not only creative and impactful, but also technically sound and deeply integrated with your business goals.
          </p>
          <p>
            Our pedigree includes founding successful ventures like{' '}
            <a href="https://landhacker.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              landhacker.ai
            </a>{' '}
            and{' '}
            <a href="https://lazily.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              lazily.ai
            </a>. Learn more <Link href="/about" className="text-primary underline">about us</Link>.
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
      
      <AISuggestion />

      <section className="text-center">
        <Button asChild size="lg">
          <Link href="/pricing">View Pricing & Book a Consultation →</Link>
        </Button>
      </section>
    </div>
  );
}
