import type { Metadata } from 'next'
import './globals.css'
import '@/resources/icons/material-icons/material-icons.css'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Succession Arena',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-cn">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [tag: string]: any
    }
  }
}
