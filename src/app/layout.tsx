import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'The Salt & Light Studio | Austin, TX Web Design & AI Consultancy',
  description: 'A high-end design, technology, and AI consultancy in Austin, Texas for ambitious brands. We build what\'s next.',
  keywords: ['Web Design Austin', 'AI Consulting Austin', 'Technology Consultancy Texas', 'The Salt & Light Studio', 'Next.js Development', 'Brand Identity', 'Christian Business'],
  authors: [{ name: 'The Salt & Light Studio', url: 'https://saltandlight.studio' }],
  creator: 'The Salt & Light Studio',
  publisher: 'The Salt & Light Studio',
  openGraph: {
    title: 'The Salt & Light Studio | Austin, TX Web Design & AI Consultancy',
    description: 'A high-end design, technology, and AI consultancy in Austin, Texas for ambitious brands. We build what\'s next.',
    url: 'https://saltandlight.studio',
    siteName: 'The Salt & Light Studio',
    images: [
      {
        url: 'https://www.saltandlight.studio/og-image.jpg', // Should be an absolute URL
        width: 1200,
        height: 630,
        alt: 'The Salt & Light Studio Logo and Tagline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Salt & Light Studio | Austin, TX Web Design & AI Consultancy',
    description: 'A high-end design, technology, and AI consultancy in Austin, Texas for ambitious brands. We build what\'s next.',
    images: ['https://www.saltandlight.studio/twitter-og-image.jpg'], // Should be an absolute URL
    creator: '@SaltLightStudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased relative">
        <div className="glow-effect top-[-20%] right-[-20%] h-2/3 w-2/3 bg-primary"></div>
        <div className="glow-effect bottom-[-20%] left-[-20%] h-2/3 w-2/3 bg-accent"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow max-w-screen-2xl mx-auto py-12 px-4 md:px-6 w-full">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
