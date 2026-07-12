const SITE_URL = 'https://chizlab.uz'

// Allow every crawler — including AI/answer-engine bots (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended, …) — so they can read and cite Chizlab. Point them to the sitemap.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
