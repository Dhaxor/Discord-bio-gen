import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord Bio Generator | Create Unique Bio Templates',
  description: 'Generate unique Discord bio templates with our AI-powered tool. Create engaging bio templates for Discord quickly and easily.',
  keywords: 'discord bio template, discord bio templates, bio template discord, bio templates discord, discord profile generator',
  openGraph: {
    title: 'Discord Bio Generator | Create Unique Bio Templates',
    description: 'Generate unique Discord bio templates with our AI-powered tool. Create engaging bio templates for Discord quickly and easily.',
    siteName: 'Discord Bio Generator',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        {children}
        <Toaster />
      </body>
    </html>
  )
}