import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import GradualBlur from '@/components/GradualBlur/GradualBlur';
import ButtonTiltEffect from '@/components/providers/ButtonTiltEffect';

const siteUrl = 'https://sundhar88.vercel.app';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sundhar M — Product Designer',
    template: '%s — Sundhar M',
  },
  description:
    'Product Designer based in Chennai, IN. Specialising in Design Systems, Product Revamps, and creating experiences that are less, but better.',
  keywords: ['Product Designer', 'Design Systems', 'UX Design', 'Chennai', 'Sundhar M', 'Portfolio'],
  authors: [{ name: 'Sundhar M' }],
  creator: 'Sundhar M',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Sundhar M — Product Designer',
    description:
      'Product Designer based in Chennai, IN. Less, but better.',
    siteName: 'Sundhar M Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sundhar M — Product Designer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sundhar M — Product Designer',
    description: 'Product Designer based in Chennai, IN. Less, but better.',
    images: ['/og-image.png'],
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
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon-512.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
          <ButtonTiltEffect />
          <GradualBlur
            target="page"
            position="bottom"
            height="4rem"
            strength={3}
            divCount={8}
            curve="ease-out"
            exponential={true}
            zIndex={1000}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
