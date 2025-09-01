// src/app/book/page.tsx
'use client';

import { useEffect } from 'react';

export default function BookPage() {
  useEffect(() => {
    // This is a workaround to ensure the Calendly script re-initializes on page navigation
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      const allScripts = document.getElementsByTagName('script');
      for (let i = 0; i < allScripts.length; i++) {
        if (allScripts[i].src.includes('calendly.com')) {
          allScripts[i].remove();
        }
      }
      const calendlyBadge = document.querySelector('.calendly-badge-content');
      if (calendlyBadge) {
        calendlyBadge.parentElement?.remove();
      }
    };
  }, []);
  return (
    <div className="space-y-12">
       <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Book a Discovery Session</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Schedule a 60-minute session to discuss your project.
        </p>
      </section>
      <div
        className="calendly-inline-widget w-full"
        data-url="https://calendly.com/bonesy/60min"
        style={{ minWidth: '320px', height: '700px' }}
      ></div>
    </div>
  );
}
