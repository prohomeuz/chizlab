'use client'

import React from 'react'

// === DATA ===
// The prompt that gets pre-filled in each AI's composer. The user can just press Enter.
const PROMPT =
  "chizlab.uz loyihasi haqida batafsil ma'lumot bergin. Qanday loyiha, vazifasi nima, kimlar qurgan?"

const q = encodeURIComponent(PROMPT)

// Each entry links to the AI's chat with the prompt in the query string. Providers that
// support a `?q=` (or `/search?q=`) param drop it straight into their input box.
const AIS = [
  { name: 'ChatGPT', href: `https://chatgpt.com/?q=${q}`, Icon: OpenAIIcon },
  { name: 'Claude', href: `https://claude.ai/new?q=${q}`, Icon: ClaudeIcon },
  { name: 'Gemini', href: `https://gemini.google.com/app?q=${q}`, Icon: GeminiIcon },
  { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${q}`, Icon: PerplexityIcon },
  { name: 'Grok', href: `https://grok.com/?q=${q}`, Icon: GrokIcon },
]

// === ICONS === (monochrome, inherit currentColor)
function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.06 6.06 0 0 0 4.98 4.19a5.99 5.99 0 0 0-3.99 2.9 6.05 6.05 0 0 0 .74 7.09 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.98 5.98 0 0 0 13.26 22a6.05 6.05 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.05 6.05 0 0 0-.75-7.08zM13.26 20.6a4.5 4.5 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 0 0 .4-.68V9.3l2.02 1.17a.07.07 0 0 1 .04.06v5.58a4.5 4.5 0 0 1-4.5 4.5zM3.6 16.47a4.47 4.47 0 0 1-.54-3.01l.14.09 4.78 2.76c.24.14.54.14.78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.83 20.1a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.5 4.5 0 0 1 2.35-1.98v5.68c0 .28.15.54.4.68l5.82 3.36-2.02 1.17a.07.07 0 0 1-.07 0L4 13.68A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.86l-5.84-3.38 2.02-1.16a.07.07 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.11V12.4a.78.78 0 0 0-.4-.64zm2.01-3.03l-.14-.09-4.77-2.76a.78.78 0 0 0-.79 0L9.42 9.24V6.9a.07.07 0 0 1 .03-.06l4.83-2.78a4.5 4.5 0 0 1 6.68 4.66zM8.32 12.85 6.3 11.69a.08.08 0 0 1-.04-.07V6.05a4.5 4.5 0 0 1 7.38-3.45l-.14.08L8.72 5.44a.78.78 0 0 0-.4.68zm1.1-2.36L12 8.99l2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
    </svg>
  )
}

function ClaudeIcon() {
  // Anthropic-style radiating burst.
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI * 2) / 16
    const inner = 2.2
    const outer = i % 2 === 0 ? 9.5 : 6.5
    return (
      <line
        key={i}
        x1={12 + Math.cos(a) * inner}
        y1={12 + Math.sin(a) * inner}
        x2={12 + Math.cos(a) * outer}
        y2={12 + Math.sin(a) * outer}
      />
    )
  })
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      {rays}
    </svg>
  )
}

function GeminiIcon() {
  // Four-pointed spark.
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M12 2c0 5.52-4.48 10-10 10 5.52 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" />
    </svg>
  )
}

function PerplexityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5 5.5 8v8L12 20.5 18.5 16V8L12 3.5z" />
      <path d="M12 3.5v17M5.5 8 12 12l6.5-4" />
    </svg>
  )
}

function GrokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 19 16.5 6.5M10 19l8-10M9.5 12V5.5H16" />
    </svg>
  )
}

// === UI ===
function AskAI() {
  return (
    <div className="flex flex-col gap-4 bp-xs:items-center mobile:items-center">
      <span className="font-sf text-[18px] text-bg select-none bp-sm:text-[17px] bp-xs:text-[16px] bp-xs:text-center mobile:text-center">
        Chizlab haqida AIdan soʻrang
      </span>
      <div className="flex items-center gap-3 bp-sm:gap-2.5 bp-xs:gap-2.5 mobile:gap-2.5">
        {AIS.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${name}da soʻrash`}
            aria-label={`${name}da Chizlab haqida soʻrash`}
            data-cursor-hover=""
            className="w-12 h-12 rounded-xl bg-bg/10 hover:bg-bg/20 flex items-center justify-center text-bg transition-colors
              bp-sm:w-11 bp-sm:h-11 bp-xs:w-10 bp-xs:h-10 mobile:w-10 mobile:h-10"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  )
}

export default React.memo(AskAI)
