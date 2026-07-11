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

// Runs immediately as the HTML is parsed — before the app bundle downloads — so the loader
// shows REAL progress (0→~90%) that tracks how much of the page has actually loaded, instead of
// a fixed timer. JS finishes it to 100% once the app is interactive (see useHeroAnimation).
const LOADER_PROGRESS = `
(function () {
  try {
    var root = document.documentElement;
    function paint(v) {
      v = v < 0 ? 0 : v > 100 ? 100 : v;
      root.style.setProperty('--loader-pct', Math.round(v));
      root.style.setProperty('--loader-angle', v * 3.6 + 'deg');
    }
    paint(0);
    var shown = 0, target = 0, t0 = Date.now();
    function loop() {
      if (window.__loaderTakeover) return;   // app bundle took over -> stop
      shown += (target - shown) * 0.08;
      paint(shown);
      requestAnimationFrame(loop);
    }
    try {
      new PerformanceObserver(function (l) {
        target = Math.min(90, target + l.getEntries().length * 2); // nudge on each resource that finishes
      }).observe({ type: 'resource', buffered: true });
    } catch (e) {}
    var iv = setInterval(function () {           // steady creep so it always moves, easing toward 90%
      var el = (Date.now() - t0) / 1000;
      target = Math.max(target, Math.min(90, 90 * (1 - Math.exp(-el / 4))));
      if (window.__loaderTakeover) clearInterval(iv);
    }, 100);
    requestAnimationFrame(loop);
  } catch (e) {}
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={`${inter.variable} h-full antialiased`} style={{ cursor: 'none' }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_PROGRESS }} />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
