// src/app/about/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Thomas Schustereit',
    role: 'Founder & Lead Technologist',
    bio: "Thomas is a visionary technologist with a passion for building dreams into functional digital realities. With a deep expertise in software architecture, AI integration, and full-stack development, he leads the studio's most ambitious technical projects, transforming complex challenges into elegant, scalable solutions.",
    linkedin: 'https://www.linkedin.com/in/your-profile',
    image: 'https://picsum.photos/400/400',
    imageHint: 'professional man',
  },
  {
    name: 'Lindsey Schustereit',
    role: 'Co-Founder & Creative Director',
    bio: "Lindsey is the creative force behind Schustereit & Co. Her background in brand strategy and visual design ensures that every project is not only beautiful but also deeply aligned with the client's vision and market goals. She believes that great design tells a story and builds lasting connections.",
    linkedin: 'https://www.linkedin.com/in/your-profile',
    image: 'https://picsum.photos/400/401',
    imageHint: 'woman with children',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">About Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We are partners in life and work, dedicated to crafting exceptional digital experiences. By blending cutting-edge technology with timeless design, we partner with clients to build their dreams into functional digital realities.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <Card key={member.name} className="flex flex-col items-center text-center">
            <CardHeader className="items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 mb-4">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  width={192}
                  height={192}
                  data-ai-hint={member.imageHint}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardTitle>{member.name}</CardTitle>
              <p className="text-primary">{member.role}</p>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p className="text-muted-foreground">{member.bio}</p>
              <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Linkedin className="w-6 h-6 hover:text-primary transition-colors" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
