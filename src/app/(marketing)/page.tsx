
import { Button } from '@/components/ui/button';
import AISuggestion from '@/components/ai-suggestion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

import { SERVICES } from '@/lib/constants';
import { HOME_CONTENT } from '@/lib/content';

const services = SERVICES;

export default function Home() {
  return (
    <div className="space-y-24">
      <section className="text-center space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">{HOME_CONTENT.hero.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {HOME_CONTENT.hero.subtitle}
        </p>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter">{HOME_CONTENT.story.title}</h2>
        <div className="text-muted-foreground space-y-4 max-w-4xl mx-auto">
          <p>
            {HOME_CONTENT.story.p1}
          </p>
          <p>
            {HOME_CONTENT.story.p2_start}
            <a href={HOME_CONTENT.story.p2_link1_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
              {HOME_CONTENT.story.p2_link1_text}
            </a>
            {HOME_CONTENT.story.p2_mid}
            <a href={HOME_CONTENT.story.p2_link2_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
              {HOME_CONTENT.story.p2_link2_text}
            </a>
            {HOME_CONTENT.story.p2_end}
            <Button asChild variant="link" className="text-base p-0 h-auto">
              <Link href="/about">{HOME_CONTENT.story.cta}</Link>
            </Button>
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tighter">{HOME_CONTENT.services.title}</h2>
          <Button asChild variant="link" className="text-lg">
            <Link href="/services">{HOME_CONTENT.services.cta} <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
        <h2 className="text-3xl font-bold tracking-tighter text-center">{HOME_CONTENT.cta.title}</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          {HOME_CONTENT.cta.description}
        </p>
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/book">{HOME_CONTENT.cta.button}</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
