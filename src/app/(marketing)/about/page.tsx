// src/app/about/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint } from 'lucide-react';
import Image from 'next/image';
import { ABOUT_CONTENT } from '@/lib/content';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">{ABOUT_CONTENT.hero.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {ABOUT_CONTENT.hero.description}
        </p>
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">{ABOUT_CONTENT.founders.title}</CardTitle>
          <CardDescription>{ABOUT_CONTENT.founders.role}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="relative w-full h-[512px] rounded-lg overflow-hidden border-4 border-primary/20">
            <Image
              src={ABOUT_CONTENT.founders.image}
              alt={ABOUT_CONTENT.founders.imageAlt}
              fill
              className="object-cover"
              data-ai-hint="family landscape"
            />
          </div>
          <div className="space-y-4 text-muted-foreground text-center justify-center px-12">
            <p>
              {ABOUT_CONTENT.founders.p1}
            </p>
            <p>
              {ABOUT_CONTENT.founders.p2}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground rounded-full p-3 z-10 transition-transform group-hover:scale-110">
          <PawPrint className="w-6 h-6" />
        </div>
        <CardHeader>
          <CardTitle>{ABOUT_CONTENT.mascot.title}</CardTitle>
          <CardDescription>{ABOUT_CONTENT.mascot.role}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/50 shrink-0">
            <Image
              src={ABOUT_CONTENT.mascot.image}
              alt={ABOUT_CONTENT.mascot.imageAlt}
              width={256}
              height={256}
              data-ai-hint="great pyrenees puppy"
              className="object-cover object-bottom w-full h-full transition-transform group-hover:scale-110"
            />
          </div>
          <div className="text-center md:text-left space-y-2">
            <p className="text-lg text-muted-foreground">
              {ABOUT_CONTENT.mascot.description}
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
