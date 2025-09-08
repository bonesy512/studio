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
      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader><CardTitle>Project Goal</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.projectGoal}</p>
        </CardContent>
      </Card>
      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader><CardTitle>Our Solution</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.ourSolution}</p>
        </CardContent>
      </Card>
       <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
        <CardHeader><CardTitle>Technologies</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{content.technologies}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function LandhackerContent() {
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Redefining Land Investment with AI and Geospatial Intelligence</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Landhacker.AI is a sophisticated, mobile-first PropTech and Geographic Information System (GIS) platform designed to provide professional real estate investors, developers, and researchers with a decisive analytical edge in the land investment market. It integrates large-scale property parcel data with AI-driven valuation tools and a multi-channel direct marketing suite to streamline deal analysis, site selection, and due diligence, ultimately transforming high-risk decisions into data-backed opportunities.</p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
        <CardHeader><CardTitle>Key Features</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>**Interactive Property Map Interface**: Utilizes Mapbox GL JS for an interactive map experience with parcel visualization.</li>
            <li>**AI-Driven Analytics**: Integrates OpenAI for valuation, comparable sales prediction, and marketability scoring.</li>
            <li>**Comprehensive Property Data**: Access to owner info, legal descriptions, tax data, and property history from sources like ReGrid.</li>
            <li>**Skip Tracing & Multi-Property Tools**: Features for single and bulk parcel research and data export.</li>
            <li>**User Account System**: Secure user management with Firebase Authentication, saved properties, and subscription tracking.</li>
            <li>**One-Click Marketing Automation**: Suggests optimal buyer profiles and outreach methods.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Technical Architecture & Stack</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-semibold text-primary">Frontend</h4>
              <p className="text-sm text-muted-foreground">Mobile app built with React, TypeScript, Mapbox GL JS, Tailwind, and Zustand. Marketing site on Next.js 15.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-primary">Backend & Hosting</h4>
              <p className="text-sm text-muted-foreground">Cloud-hosted on AWS, with a FastAPI backend for API endpoints and GIS data processing.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-primary">Database</h4>
              <p className="text-sm text-muted-foreground">Large-scale database with 25 million+ records from ReGrid. Firebase Firestore for user data (GeoJSON for GIS).</p>
            </div>
             <div className="space-y-1">
              <h4 className="font-semibold text-primary">Key Integrations</h4>
              <p className="text-sm text-muted-foreground">Mapbox, ReGrid, OpenAI, Elevenlabs, Epixel, PayPal, and Resend.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Strategic Impact & Business Model</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Landhacker.AI employs a powerful hybrid monetization model that includes a Freemium tier, Pay-Per-Use (tokens) for high-value actions, and a Subscription (SaaS) model for power users. The platform also features a built-in iBuyer funnel to generate proprietary deal flow and an affiliate program to drive user acquisition. A complete overhaul of the brand's social media identity was a critical strategic initiative to align with a professional B2B SaaS persona and correct previous "algorithmic poisoning."</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader>
              <CardTitle>Comprehensive Marketing Strategy Rollout</CardTitle>
              <CardDescription>Rebranding for Professional Growth</CardDescription>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground">The Landhacker.AI marketing strategy is undergoing a comprehensive overhaul to rectify a significant misalignment between the platform's sophisticated, data-driven capabilities and its previous public-facing brand identity on Facebook. The new blueprint establishes Landhacker.AI as an authoritative, analytical, and forward-thinking B2B SaaS brand for professional real estate investors and developers.</p>
          </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader>
            <CardTitle>New Brand Identity</CardTitle>
            <CardDescription>Building Trust and Authority</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary">Mission and Messaging</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
                <li>**Mission:** "To empower land investment professionals with AI-driven geospatial intelligence, transforming high-risk decisions into data-backed opportunities".</li>
                <li>**Pillars:** De-risk Investments, Value with Confidence, Accelerate Workflow, Unlock Hidden Opportunities.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Voice and Tone</h4>
              <p className="text-sm text-muted-foreground mt-1">Authoritative, Analytical, and Forward-Thinking.</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Visual Lexicon</h4>
              <p className="text-sm text-muted-foreground mt-1">Clean, modern, and data-centric, with a professional color palette (Pine Green/Navy, Charcoal/Teal, Amber/Goldenrod) and typography (Montserrat/Poppins, Roboto/Lato).</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader>
            <CardTitle>Content Authority Engine</CardTitle>
            <CardDescription>A Multi-Pillar Strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                <li>**Market Intelligence & Data-Driven Insights:** Gated reports and infographics to build authority.</li>
                <li>**Product-in-Action & Use Case Mastery:** "Workflow Wednesday" videos and carousel case studies.</li>
                <li>**Educational Deep Dives & Methodologies:** "Land Valuation Masterclass" series and downloadable checklists.</li>
                <li>**Client Success Blueprints:** Testimonials and case studies to provide social proof.</li>
                <li>**Structured Cadence:** A consistent weekly publishing schedule across all pillars.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader>
            <CardTitle>Paid Media Accelerator</CardTitle>
            <CardDescription>A Full-Funnel Advertising Strategy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">A strategic paid media program on Facebook to drive immediate lead generation and scale audience growth through a full-funnel approach (Top, Middle, Bottom).</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                <li>**Advanced Targeting:** Utilizes high-value customer Lookalike Audiences, detailed job title/interest layering, and website custom audiences.</li>
                <li>**Optimized Creative:** Adheres to the new B2B brand identity with professional visuals and benefit-driven copy.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader>
            <CardTitle>Community and Engagement</CardTitle>
            <CardDescription>Building a Professional Network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">The strategy focuses on building an exclusive, high-value professional network on Facebook, transforming customers into brand advocates through targeted engagement and community activation tactics.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
        <CardHeader>
          <CardTitle>Implementation Roadmap & KPIs</CardTitle>
          <CardDescription>A 90-Day Transformation Plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-1">
              <h4 className="font-semibold text-primary">Phase 1: Foundation & Rebranding (Days 1-30)</h4>
              <p className="text-sm text-muted-foreground">Finalize messaging and visual identity, overhaul the Facebook page, and produce initial content.</p>
            </div>
             <div className="space-y-1">
              <h4 className="font-semibold text-primary">Phase 2: Content Engine Launch (Days 31-60)</h4>
              <p className="text-sm text-muted-foreground">Execute the full content calendar, manage the private group, and launch Top-of-Funnel paid campaigns.</p>
            </div>
             <div className="space-y-1">
              <h4 className="font-semibold text-primary">Phase 3: Paid Media Activation (Days 61-90)</h4>
              <p className="text-sm text-muted-foreground">Launch Middle and Bottom-of-Funnel campaigns, focusing on CPA and ROAS.</p>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Development Status & Achievements</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Marketing website is live, stable, and fully operational, built in-house saving significant cost.</li>
              <li>Backend is fully developed with highly optimized APIs and a successful data import of 16.5 million records.</li>
              <li>Mobile app has confirmed iPad compatibility, working chat, and has undergone UAT.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Future Directions</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Immediate priorities include completing the remaining data migration, resolving regression bugs, and finalizing email and affiliate marketing integrations. Longer-term plans focus on expanding measurement tools, activating content marketing, and pursuing full Progressive Web App (PWA) functionality to solidify Landhacker.AI's position as a market leader.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


function MvsContent() {
    return (
    <div className="space-y-8">
      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Empowering Independent SFF Authors with Radical Transparency</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Mystic Vault Society (MVS) is a fee-for-service publishing company founded with the core mission of promoting, supporting, and guiding science fiction and fantasy (SFF) authors. It aims to transform author skepticism toward fee-for-service models by embracing radical transparency and community empowerment, establishing itself as an indispensable, trusted partner for serious independent SFF authors.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Core Philosophy & Business Model</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">MVS operates on a model of **radical transparency**. Authors are the publishers, retaining 100% of their rights and royalties, with full creative control. Revenue comes directly from professional services provided, not from a percentage of book sales, a model clearly articulated to differentiate MVS from predatory vanity presses.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                <li>100% Author Rights & Royalties</li>
                <li>Full Creative Control</li>
                <li>Transparent Fee-for-Service</li>
                <li>Selective, Partnership-based Approach</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Services Offered</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">MVS provides a suite of a la carte professional services to guide authors through every stage of the publishing process.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                <li>**Expert Editorial Services:** Developmental, line, and proofreading.</li>
                <li>**Publishing & Distribution:** Cover design consultation, formatting, global distribution via IngramSpark.</li>
                <li>**Marketing & Author Platform:** Tailored launch plans, social media tactics, and professional author webpages.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
        <CardHeader><CardTitle>Strategic Marketing & Community Building</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Marketing is driven by a content-led strategy that provides immense value upfront. By organizing content into four key pillars (The Publishing Quest, Craft & World-Building, The Business of Writing, The Society Ledger), MVS attracts and educates its target audience. Community is built through targeted lead magnets, an exclusive email newsletter, and deep engagement on platforms like Instagram, Facebook (including a private "Outer Circle" group), YouTube, and Reddit.</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Operational Foundations</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>**Legal:** Formally established as an LLC in Texas for liability protection and credibility.</li>
              <li>**ISBNs:** MVS purchases and owns its ISBNs directly from Bowker to be the official publisher.</li>
              <li>**Distribution:** A hybrid print-on-demand model uses KDP for Amazon sales and IngramSpark for premium editions and wider distribution.</li>
              <li>**Technology:** The website is built on WordPress with WooCommerce for direct-to-fan sales and content delivery.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Launch Success: *Rise of the Veilbreaker*</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">The marketing and brand strategy culminated in the successful debut launch of the company's first author project, *Rise of the Veilbreaker*, on September 1st, 2025. The book is now available on major platforms like Amazon and Barnes & Noble, validating the MVS model and establishing its credibility within the SFF community.</p>
          </CardContent>
        </Card>
      </div>
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
        "Assault on the Aether Nexus (Level 8-10): Lead a joint strike force to destroy the Citadel of Whispering Iron, which houses a portal network and a superweapon."
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
      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
          <CardDescription>A heroic fantasy adventure for D&D 5e, taking characters from level 1 to 20 in the frozen world of Binsmuth.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The Veilbreakers Crusade is set in the harsh, frozen kingdom of Zel'Drea, a bastion against the encroaching chaos of the god Klydos. The campaign blends themes of environmental hardship, the horrors of war, political betrayal, and the struggle of faith against despair as players confront both external monstrous threats and internal treachery.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
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
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
          <CardHeader><CardTitle>Key Factions & Deities</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-1">
                <h4 className="font-semibold text-primary">Deities</h4>
                <p className="text-sm text-muted-foreground">**Aleara (Life/Balance)**, **Klydos (Chaos/Destruction)**, and **Donegal (Creation/Wagers)** shape the cosmic struggle.</p>
             </div>
             <div className="space-y-1">
                <h4 className="font-semibold text-primary">Major Factions</h4>
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

      <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
        <CardHeader>
            <CardTitle>Campaign Structure: A Four-Arc Saga</CardTitle>
            <CardDescription>The narrative unfolds across four distinct arcs with milestone-based progression.</CardDescription>
        </sCardHeader>
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
  );
}

function ContentSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-secondary/20 dark:border-white/10">
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
  const isLandhacker = project.slug === 'landhacker-ai';

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
        <Card className="relative w-full h-96 rounded-lg overflow-hidden border">
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
          {isLandhacker && <LandhackerContent />}
          {!isMvs && !isVeilbreakers && !isLandhacker && <GeneratedContent title={project.title} description={project.description} />}
        </Suspense>
        
        <Card className="bg-card/50 border border-black/10 backdrop-blur-lg dark:bg-card/75 dark:border-white/10">
            <CardHeader><CardTitle>Project Showcase</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">More images and details about the project will be displayed here soon.</p>
               <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Image coming soon</p>
                  </div>
                   <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Image coming soon</p>                  </div>
               </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
