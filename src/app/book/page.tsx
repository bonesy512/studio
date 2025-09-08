// src/app/book/page.tsx
'use client';

import Script from 'next/script';

export default function BookPage() {
  return (
    <div className="space-y-12">
       <Script
        src="httpss://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Book a Discovery Session</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Schedule a 60-minute session to discuss your project.
        </p>
      </section>
      <div
        className="calendly-inline-widget w-full"
        data-url="https://calendly.com/schustereit/60min"
        style={{ minWidth: '320px', height: '700px' }}
      ></div>
    </div>
  );
}
