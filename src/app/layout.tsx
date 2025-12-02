import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Schustereit & Co | A Marketing & Advertising Agency',
  description: 'Schustereit & Co. is a full-service marketing and advertising agency built on a foundation of integrity, strategic foresight, and hands-on operational excellence.',
  keywords: ['Marketing Agency', 'Advertising Agency', 'Brand Strategy', 'Schustereit & Co', 'Digital Marketing', 'Business Development'],
  authors: [{ name: 'Schustereit & Co.', url: 'https://www.schustereitandco.com' }],
  creator: 'Schustereit & Co.',
  publisher: 'Schustereit & Co.',
  openGraph: {
    title: 'Schustereit & Co | A Marketing & Advertising Agency',
    description: 'A full-service marketing and advertising agency built on a foundation of integrity, strategic foresight, and hands-on operational excellence.',
    url: 'https://www.schustereitandco.com',
    siteName: 'Schustereit & Co',
    images: [
      {
        url: 'https://www.schustereitandco.com/4E4A4380.jpeg', // Should be an absolute URL
        width: 1200,
        height: 630,
        alt: 'Schustereit & Co. Logo and Tagline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schustereit & Co | A Marketing & Advertising Agency',
    description: 'A full-service marketing and advertising agency built on a foundation of integrity, strategic foresight, and hands-on operational excellence.',
    images: ['https://www.schustereitandco.com/4E4A4380.jpeg'], // Should be an absolute URL
    creator: '@SchustereitCo',
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
      <body className="bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
