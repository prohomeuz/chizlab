import CustomCursor from '@/components/CustomCursor'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' })

const SITE_URL = 'https://chizlab.uz'

const DESCRIPTION =
  'Chizlab — Oʻzbekistondagi ilk chizmachilik va dizayn platformasi. Chizmachilikdan raqamli ' +
  'dizayngacha barcha manbalar bir joyda: kerakli manbani 1 daqiqada toping, mustaqil oʻrganing, ' +
  'sunʼiy intellekt yordamida gʻoyani chizmaga aylantiring va ijodkorlar bilan oʻsing.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Chizlab — Chizmachilik va dizayn platformasi',
    template: '%s — Chizlab',
  },
  description: DESCRIPTION,
  applicationName: 'Chizlab',
  category: 'education',
  keywords: [
    'Chizlab',
    'chizlab.uz',
    'chizmachilik',
    'muhandislik grafikasi',
    'chizmachilik platformasi',
    'dizayn',
    'raqamli dizayn',
    'grafik dizayn',
    'AutoCAD',
    'chizma',
    'oʻquv materiallari',
    'darslik',
    'Oʻzbekiston',
    'ijodkorlik',
    'AI dizayn',
  ],
  authors: [{ name: 'Chizlab' }],
  creator: 'Chizlab',
  publisher: 'Chizlab',
  openGraph: {
    title: 'Chizlab — Chizmachilik va dizayn platformasi',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Chizlab',
    images: [
      {
        url: '/chizlab-meta.jpg',
        width: 1280,
        height: 720,
        alt: 'Chizlab — chizmachilik va dizayn platformasi',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chizlab — Chizmachilik va dizayn platformasi',
    description: DESCRIPTION,
    images: ['/chizlab-meta.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: SITE_URL },
}

// Structured data (schema.org) — the machine-readable summary that search engines and AI
// assistants read to understand what Chizlab is, its purpose and who built it.
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'EducationalOrganization'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Chizlab',
      alternateName: 'chizlab.uz',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      image: `${SITE_URL}/chizlab-meta.jpg`,
      email: 'info@chizlab.uz',
      slogan: 'Chizmachilikdan raqamli dizayngacha — barcha manbalar bir joyda',
      description:
        'Chizlab (chizlab.uz) — Oʻzbekistondagi ilk chizmachilik va dizayn taʼlim platformasi. ' +
        'Platforma chizmachilik, muhandislik grafikasi va raqamli dizayn boʻyicha oʻquv ' +
        'materiallari, darsliklar, maqolalar va manbalarni bir joyda jamlaydi. Foydalanuvchilar ' +
        'kerakli manbani 1 daqiqada topishi, mustaqil oʻrganishi, sunʼiy intellekt yordamida ' +
        'gʻoyani chizmaga aylantirishi va ijodkorlar hamjamiyati bilan oʻsishi mumkin.',
      foundingLocation: { '@type': 'Place', name: 'Oʻzbekiston' },
      areaServed: { '@type': 'Country', name: 'Oʻzbekiston' },
      knowsAbout: [
        'Chizmachilik',
        'Muhandislik grafikasi',
        'Dizayn',
        'Raqamli dizayn',
        'Grafik dizayn',
        'AutoCAD',
        'Oʻquv materiallari',
      ],
      founder: [
        {
          '@type': 'Person',
          name: 'Moʻtabarxon Turdaliyeva',
          jobTitle: 'Gʻoya muallifi va dizayner',
        },
        {
          '@type': 'Person',
          name: 'Mirzo Ulugʻbek Xudoyberdiyev',
          jobTitle: 'Bosh dasturchi',
        },
        { '@type': 'Person', name: 'Islom Ismoilov', jobTitle: 'Art direktor' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Chizlab',
      description: DESCRIPTION,
      inLanguage: 'uz-UZ',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
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
    <html lang="uz" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        <script dangerouslySetInnerHTML={{ __html: LOADER_PROGRESS }} />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
