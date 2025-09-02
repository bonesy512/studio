// src/app/portfolio/[slug]/page.tsx
import { projects } from '@/lib/portfolio-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import { generateProjectContent } from '@/ai/flows/ai-portfolio-generation';
import { Suspense } from 'react';

// This function tells Next.js which slugs to pre-render at build time
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

async function GeneratedContent({ title, description }: { title: string; description: string }) {
  const content = await generateProjectContent({ title, description });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader><CardTitle>Project Goal</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.projectGoal}</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader><CardTitle>Our Solution</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.ourSolution}</p>
        </CardContent>
      </Card>
       <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader><CardTitle>Technologies</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.technologies}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function MvsContent() {
    return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
          <CardHeader><CardTitle>Project Goal</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To launch a new fee-for-service publishing company, Mystic Vault Society (MVS), dedicated to empowering independent science fiction and fantasy authors. The core challenge was to build trust and overcome author skepticism of fee-for-service models by establishing a brand rooted in radical transparency, community, and genuine partnership.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10 lg:col-span-2">
          <CardHeader><CardTitle>Our Solution</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">We developed a comprehensive brand strategy and marketing plan for MVS and its debut novel, *Rise of the Veilbreaker*. Our work focused on establishing the "Veilbreaker" thesis—a core narrative about cutting through the fear and confusion of the indie publishing world. This included creating a detailed author persona analysis, a content-led marketing strategy with four key pillars, and a community-building funnel to guide authors from passive observers to loyal clients. The strategy culminated in the successful launch of the author's book and the establishment of MVS as a credible, transparent partner in the SFF community.</p>
          </CardContent>
        </Card>
      </div>
       <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader><CardTitle>Key Deliverables & Technologies</CardTitle></CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>**Brand & Marketing Strategy:** Developed a comprehensive go-to-market plan, including target audience personas, a content-led strategy, and a community engagement funnel.</li>
            <li>**Website Development:** Built the central online hub on WordPress with WooCommerce for direct-to-fan sales and content delivery.</li>
            <li>**Lead Generation:** Created persona-targeted lead magnets and an email newsletter strategy to build a community of authors.</li>
            <li>**Social Media Campaign:** Executed a multi-platform social media strategy (Instagram, Facebook, YouTube, Reddit) focused on authentic engagement and value-driven content.</li>
            <li>**Distribution & Logistics:** Set up a hybrid print-on-demand model using KDP Print and IngramSpark, and managed ISBN acquisition and e-book distribution via KDP Select.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function ContentSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-6 w-3/4 bg-muted rounded-md animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
            <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
            <div className="h-4 w-5/6 bg-muted rounded-md animate-pulse"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


export default function PortfolioProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const isMvs = project.slug === 'mystic-vault-society';

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
        <Card className="relative w-full h-96 rounded-lg overflow-hidden border shadow-lg">
           <Image
            src={project.imageUrl}
            alt={`Hero image for ${project.title}`}
            fill
            className="object-cover"
            data-ai-hint={project.imageHint}
          />
        </Card>
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
        <Suspense fallback={<ContentSkeleton />}>
          {isMvs ? <MvsContent /> : <GeneratedContent title={project.title} description={project.description} />}
        </Suspense>
        
        <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
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
