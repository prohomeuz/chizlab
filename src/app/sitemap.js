import { slugify } from '@/lib/slug'

const SITE_URL = 'https://chizlab.uz'

export default function sitemap() {
  const now = new Date()
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE_URL}/materiallar/${slugify('Chizmachilik')}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/materiallar/${slugify('Dizayn')}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
