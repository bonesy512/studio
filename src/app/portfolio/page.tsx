// src/app/portfolio/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'ProJob',
    description: 'Detailed project description and images coming soon.',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'modern tech application',
    link: '#',
  },
  {
    title: 'Clevr Sol',
    description: 'Detailed project description and images coming soon.',
    imageUrl: 'https://picsum.photos/600/401',
    imageHint: 'solution branding',
    link: '#',
  },
  {
    title: 'Wakesurf Saloon',
    description: 'Detailed project description and images coming soon.',
    imageUrl: 'https://picsum.photos/600/402',
    imageHint: 'recreational brand',
    link: '#',
  },
  {
    title: 'Landhacker.AI',
    description: 'AI-powered platform for land investment analysis.',
    imageUrl: 'https://picsum.photos/600/403',
    imageHint: 'AI data analysis',
    link: 'https://landhacker.ai',
  },
  {
    title: 'Lazily.AI',
    description: 'AI tools to streamline and automate workflows.',
    imageUrl: 'https://picsum.photos/600/404',
    imageHint: 'automation software',
    link: 'https://lazily.ai',
  },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Our Work</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A selection of projects that showcase our passion for design, technology, and innovation.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col group overflow-hidden">
            <div className="relative overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={`Screenshot of ${project.title}`}
                width={600}
                height={400}
                data-ai-hint={project.imageHint}
                className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  {project.link !== '#' && (
                    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="shrink-0 ml-4">
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Future content can go here */}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
