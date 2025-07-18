import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RC Fitness',
  description: 'RC Fitness: Unleash your inner beast at our elite training facility. State-of-the-art equipment, expert trainers, and a vibrant community await you.',
  generator: 'RC Fitness',
  openGraph: {
    title: 'RC Fitness',
    description: 'Unleash your inner beast at RC Fitness. State-of-the-art gym, expert trainers, and a vibrant community.',
    images: ['/logo.png'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
