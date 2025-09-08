// src/app/about/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">About Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We are partners in life and work, dedicated to crafting exceptional digital experiences. By blending cutting-edge technology with timeless design, we partner with clients to build their dreams into functional digital realities.
        </p>
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">Thomas & Lindsey Schustereit</CardTitle>
          <CardDescription>Co-Founders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden border-4 border-primary/20">
            <Image
              src="/4E4A4365.jpeg"
              alt="Family photo of Thomas and Lindsey"
              fill
              className="object-cover"
              data-ai-hint="family landscape"
            />
          </div>
          <div className="space-y-4 text-muted-foreground text-center justify-center px-12">
              <p>
                As partners in both life and work, we founded Schustereit & Co. on a shared passion for building dreams into digital realities. Thomas, our lead technologist, brings a deep expertise in software architecture and AI integration, transforming complex challenges into elegant, scalable solutions. Lindsey, our creative director, shapes the narrative, ensuring every project is not only beautiful but also deeply aligned with the client's vision and market goals.
              </p>
              <p>
                Together, we bridge the gap between cutting-edge technology and timeless design. Our collaborative approach ensures that every project benefits from both strategic technical oversight and a compelling creative vision, resulting in digital experiences that are as functional and robust as they are engaging and memorable.
              </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground rounded-full p-3 z-10 transition-transform group-hover:scale-110">
              <PawPrint className="w-6 h-6" />
          </div>
          <CardHeader>
              <CardTitle>Meet Noodle</CardTitle>
              <CardDescription>Official Mascot & Chief Morale Officer</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/50 shrink-0">
                  <Image
                      src="/IMG_6820.jpeg"
                      alt="A picture of Noodle, the Great Pyrenees puppy"
                      width={256}
                      height={256}
                      data-ai-hint="great pyrenees puppy"
                      className="object-cover w-full h-full transition-transform group-hover:scale-110"
                  />
              </div>
              <div className="text-center md:text-left space-y-2">
                  <p className="text-lg text-muted-foreground">
                      Noodle, our fluffy Great Pyrenees, is the heart of Schustereit & Co. While her official duties include ensuring team morale stays high and providing timely nap reminders, her true talent lies in her ability to untangle even the toughest creative knots with a well-timed head tilt. She's our constant reminder that sometimes the best solutions are found when you step away from the keyboard and enjoy a good belly rub.
                  </p>
              </div>
          </CardContent>
      </Card>

    </div>
  );
}
