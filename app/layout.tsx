import type { Metadata } from 'next'
import { Inter, Poppins, Fira_Code } from 'next/font/google'
import './globals.css'
import { DEVELOPER_INFO } from '@/lib/constants'

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${DEVELOPER_INFO.name} - ${DEVELOPER_INFO.title}`,
    template: `%s | ${DEVELOPER_INFO.name}`,
  },
  description: DEVELOPER_INFO.bio,
  keywords: [
    'Chase Pelky',
    'Software Developer',
    'AI Developer',
    'Frontend Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'TensorFlow',
    'Machine Learning',
    'Full Stack Developer',
  ],
  authors: [{ name: DEVELOPER_INFO.name, url: DEVELOPER_INFO.email }],
  creator: DEVELOPER_INFO.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chasepelky.dev', // Update with actual domain
    title: `${DEVELOPER_INFO.name} - ${DEVELOPER_INFO.title}`,
    description: DEVELOPER_INFO.bio,
    siteName: `${DEVELOPER_INFO.name} Portfolio`,
    images: [
      {
        url: '/images/og-image.png', // Create this later
        width: 1200,
        height: 630,
        alt: `${DEVELOPER_INFO.name} - ${DEVELOPER_INFO.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${DEVELOPER_INFO.name} - ${DEVELOPER_INFO.title}`,
    description: DEVELOPER_INFO.bio,
    images: ['/images/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code', // Add when available
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${firaCode.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  )
} 