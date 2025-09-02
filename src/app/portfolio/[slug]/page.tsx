// src/app/portfolio/[slug]/page.tsx
import { projects } from '@/lib/portfolio-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

// This function tells Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function PortfolioProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div>
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/portfolio">
              <ArrowLeft className="mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
        <div className="relative w-full h-96 rounded-lg overflow-hidden border">
           <Image
            src={project.imageUrl}
            alt={`Hero image for ${project.title}`}
            fill
            className="object-cover"
            data-ai-hint={project.imageHint}
          />
        </div>
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-5xl font-bold tracking-tighter">{project.title}</h1>
                <p className="text-xl text-muted-foreground">{project.description}</p>
            </div>
            {project.link !== '#' && (
                <Button asChild>
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        View Live Project <ExternalLink className="ml-2" />
                    </Link>
                </Button>
            )}
        </div>
      </header>
      
      <main className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader><CardTitle>Project Goal</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed project goal will be displayed here soon.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Our Solution</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">A breakdown of the solution we provided will be displayed here soon.</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle>Technologies</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">The technologies used for this project will be listed here soon.</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
            <CardHeader><CardTitle>Project Showcase</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">More images and details about the project will be displayed here soon.</p>
               <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Image coming soon</p>
                  </div>
                   <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Image coming soon</p>
                  </div>
               </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
