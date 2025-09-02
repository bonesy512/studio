// src/app/portfolio/[slug]/page.tsx
import { projects } from '@/lib/portfolio-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { generateProjectContent } from '@/ai/flows/ai-portfolio-generation';
import { Suspense } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

function VeilbreakersContent() {
  const campaignArcs = [
    {
      title: "Arc 1: The Frozen Front (Levels 1-5)",
      goal: "Survival, combat against new monstrous threats, and discovering the shocking truth behind the new enemies.",
      adventures: [
        "Lost in the Fog (Level 1-2): Characters are thrust into a battle on the Thin Strip of Plain, separated from allies by a supernatural fog, and encounter Chaos Thralls and a regenerating Frost Troll.",
        "The Giant's Slides (Level 2-3): Sabotage frost giant deployment slides in the Frostbite Mountains.",
        "The Source of Corruption (Level 4-5): Assault Fort Kalos, a Grey Wizard laboratory creating Chaos Thralls, uncovering Duke Grimhorn's treachery."
      ]
    },
    {
      title: "Arc 2: Shadows and Secrets (Levels 6-10)",
      goal: "Espionage, navigating Zel'Drean political landscape, uncovering Grimhorn's betrayal, forging alliances, and delving into Aether mysteries.",
      adventures: [
        "The Sacred Grove's Silence (Level 6-7): Investigate a spiritual sickness in Aleara's Sacred Grove, confirming the Duke's complicity.",
        "The Alien Captive (Level 7-8): Infiltrate a Grimhorn lodge to rescue a captured Valkrunian, revealing they are refugees and ancient enemies of the Grey Wizards.",
        "Assault on the Aether Nexus (Level 8-10): Lead a joint strike force to destroy the Citadel of Whispering Iron, which houses a portal network and superweapon."
      ]
    },
    {
      title: "Arc 3: The Betrayal of Binsmuth (Levels 11-15)",
      goal: "Political scheming erupts into open civil war, with Grimhorn making a move for the throne while Klydos's armies exploit the chaos.",
      adventures: [
        "The Duke's Gambit (Level 11-12): Gather definitive proof of Duke Grimhorn's treason during a political summit, surviving an assassination attempt.",
        "The Siege of Godsdown (Level 13-14): Defend the holy city of Godsdown from Grimhorn's army, leading to a heroic sacrifice.",
        "Confronting Treachery (Level 14-15): Publicly try Duke Grimhorn for high treason, leading to his coup attempt and a final confrontation."
      ]
    },
    {
      title: "Arc 4: Rise of the Veilbreaker (Levels 16-20)",
      goal: "The Grey Wizards shatter the barrier between worlds. Heroes lead an alliance into the heart of the Aether storm for a final, epic confrontation with a god.",
      adventures: [
        "Into Nemordia (Level 16-17): Lead the united army into the Aether-scarred lands of Nemordia to stop the ritual at its source.",
        "The Ritual of the Aether (Level 17-19): Breach the Threshold, a violent tear in reality, to eliminate the two Grey Wizard Archons conducting the final ritual.",
        "The Lord of Tempests (Level 19-20): Face the Avatar of Klydos in a multi-stage boss battle, where the wielder of Nightshard makes a final, world-altering choice."
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
          <CardDescription>A heroic fantasy adventure for D&D 5e, taking characters from level 1 to 20 in the frozen world of Binsmuth.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The Veilbreakers Crusade is set in the harsh, frozen kingdom of Zel'Drea, a bastion against the encroaching chaos of the god Klydos. The campaign blends themes of environmental hardship, the horrors of war, political betrayal, and the struggle of faith against despair as players confront both external monstrous threats and internal treachery.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
          <CardHeader><CardTitle>Core Conflict & Themes</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">The central conflict is the escalating war between Zel'Drea and Klydos, the Lord of Tempests. Aided by the fanatical Grey Wizards of Sambor, Klydos unleashes twisted Chaos Thralls and a supernatural cold. Internally, the kingdom is fractured by the betrayal of Duke Kendrick Grimhorn, who seeks to usurp the throne.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>**Environmental Hardship:** Survival is a constant challenge against the biting cold.</li>
              <li>**Horrors of War:** A struggle against unnatural, asymmetrical creatures.</li>
              <li>**Corruption of Power:** The Aether and the sentient sword Nightshard tempt heroes with power at a moral cost.</li>
              <li>**Political Intrigue:** Navigating a treacherous court of spies and assassins.</li>
              <li>**Faith vs. Despair:** Maintaining hope in a dying world.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
          <CardHeader><CardTitle>Key Factions & Deities</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-1">
                <h4 className="font-semibold">Deities</h4>
                <p className="text-sm text-muted-foreground">**Aleara (Life/Balance)**, **Klydos (Chaos/Destruction)**, and **Donegal (Creation/Wagers)** shape the cosmic struggle.</p>
             </div>
             <div className="space-y-1">
                <h4 className="font-semibold">Major Factions</h4>
                 <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                    <li>**The Orders of Aleara:** Holy knights, clerics, and druids opposing Klydos.</li>
                    <li>**The Grey Wizards of Sambor:** A cabal harnessing chaotic Aether magic.</li>
                    <li>**The Forces of Klydos:** A monstrous army of giants, trolls, and alien Valkrunians.</li>
                    <li>**Duchy Grimhorn:** The treacherous house led by the ambitious Duke Kendrick Grimhorn.</li>
                 </ul>
             </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader>
            <CardTitle>Campaign Structure: A Four-Arc Saga</CardTitle>
            <CardDescription>The narrative unfolds across four distinct arcs with milestone-based progression.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {campaignArcs.map((arc, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{arc.title}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="font-semibold text-primary">{arc.goal}</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                    {arc.adventures.map((adventure, advIndex) => (
                      <li key={advIndex}>{adventure}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

function ContentSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="shadow-lg bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
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
  const isVeilbreakers = project.slug === 'the-veilbreakers-crusade';

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
          {isMvs && <MvsContent />}
          {isVeilbreakers && <VeilbreakersContent />}
          {!isMvs && !isVeilbreakers && <GeneratedContent title={project.title} description={project.description} />}
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

    