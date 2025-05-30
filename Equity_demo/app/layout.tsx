import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Equity App Sync',
  description: 'Created by Dev Joshi',
  generator: 'Holbox.ai',
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
