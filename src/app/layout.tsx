import type { Metadata } from 'next'
import './globals.css'
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from '@/lib/brand'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('http://localhost:3000')

const pageTitle = `${SITE_NAME} (${SITE_SHORT_NAME}) — Breaking news, politics, business, tech, sports & culture`

export const metadata: Metadata = {
  title: pageTitle,
  description: SITE_DESCRIPTION,
  metadataBase: siteUrl,
  applicationName: SITE_NAME,
  keywords: [
    'News Paper Stall',
    'news paper stall',
    'NPS',
    'NPS news',
    'breaking news',
    'daily news',
    'top stories',
    'world news',
    'business',
    'technology',
    'sports',
    'culture',
    'opinion',
  ],
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: '16x16 32x32 48x48 64x64' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: pageTitle,
    description: SITE_DESCRIPTION,
    url: '/',
    images: [
      {
        url: '/logo.png',
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: SITE_DESCRIPTION,
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Roboto+Serif:opsz,wdth,wght@8..144,50..150,400..900&display=swap"
        />
        <meta name="theme-color" content="#d81f26" />
      </head>
      <body>{children}</body>
    </html>
  )
}
