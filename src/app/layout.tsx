import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Schustereit Studios | Austin, TX Web Design & AI Consultancy',
  description: 'A high-end design, technology, and AI consultancy in Austin, Texas for ambitious brands. We build what\'s next.',
  keywords: ['Web Design Austin', 'AI Consulting Austin', 'Technology Consultancy Texas', 'Schustereit Studios', 'Next.js Development', 'Brand Identity'],
  authors: [{ name: 'Schustereit Studios', url: 'https://schustereitstudios.design' }],
  creator: 'Schustereit Studios',
  publisher: 'Schustereit Studios',
  openGraph: {
    title: 'Schustereit Studios | Austin, TX Web Design & AI Consultancy',
    description: 'A high-end design, technology, and AI consultancy in Austin, Texas for ambitious brands. We build what\'s next.',
    url: 'https://schustereitstudios.design',
    siteName: 'Schustereit Studios',
    images: [
      {
        url: 'https://www.schustereitstudios.design/og-image.jpg', // Should be an absolute URL
        width: 1200,
        height: 630,
        alt: 'Schustereit Studios Logo and Tagline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schustereit Studios | Austin, TX Web Design & AI Consultancy',
    description: 'A high-end design, technology, and AI consultancy in Austin, Texas for ambitious brands. We build what\'s next.',
    images: ['https://www.schustereitstudios.design/twitter-og-image.jpg'], // Should be an absolute URL
    creator: '@Schustereit',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased relative">
        <div className="glow-effect top-[-20%] right-[-20%] h-2/3 w-2/3 bg-primary"></div>
        <div className="glow-effect bottom-[-20%] left-[-20%] h-2/3 w-2/3 bg-accent"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
