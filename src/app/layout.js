import CustomCursor from '@/components/CustomCursor'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' })

export const metadata = {
  metadataBase: new URL('https://chizlab.uz'),
  title: 'Chizlab — Bilim va kreativlik bir joyda',
  description: 'Bilim va kreativlik bir joyda. Oʻzbekistondagi ilk chizmachilik platformasi.',
  keywords: [
    'chizmachilik',
    'dizayn',
    'Chizlab',
    'Oʻzbekiston',
    'chizma',
    'drawing',
    'design',
    'AutoCAD',
    'ijodkorlik',
  ],
  openGraph: {
    title: 'Chizlab — bilim va kreativlik bir joyda',
    description: 'Chizmachilik va dizayn materiallari makoni.',
    url: 'https://chizlab.uz',
    siteName: 'Chizlab',
    images: [
      {
        url: '/meta.svg',
        width: 1200,
        height: 630,
        alt: 'Chizlab — bilim va kreativlik bir joyda',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chizlab — bilim va kreativlik bir joyda',
    description: 'Chizmachilik va dizayn materiallari makoni.',
    images: ['/meta.svg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://chizlab.uz' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={`${inter.variable} h-full antialiased`} style={{ cursor: 'none' }}>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
