import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Chase Pelky',
  description: 'Articles on AI, software development, and building real products.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
