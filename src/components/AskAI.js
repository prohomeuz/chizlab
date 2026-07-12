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
  { name: 'Claude', href: `https://claude.ai/new?q=${q}`, Icon: ClaudeIcon },
  { name: 'Gemini', href: `https://gemini.google.com/app?q=${q}`, Icon: GeminiIcon },
  { name: 'ChatGPT', href: `https://chatgpt.com/?q=${q}`, Icon: OpenAIIcon },
  { name: 'Grok', href: `https://grok.com/?q=${q}`, Icon: GrokIcon },
  { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${q}`, Icon: PerplexityIcon },
]

// === ICONS === (official brand marks, monochrome via currentColor)
function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7702-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7462-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  )
}

function ClaudeIcon() {
  // Radiating sunburst mark.
  const N = 12
  const rays = Array.from({ length: N }, (_, i) => {
    const a = (i * Math.PI * 2) / N - Math.PI / 2
    const inner = 1.6
    const outer = i % 3 === 0 ? 10 : i % 3 === 1 ? 6.5 : 8
    return (
      <line
        key={i}
        x1={+(12 + Math.cos(a) * inner).toFixed(2)}
        y1={+(12 + Math.sin(a) * inner).toFixed(2)}
        x2={+(12 + Math.cos(a) * outer).toFixed(2)}
        y2={+(12 + Math.sin(a) * outer).toFixed(2)}
      />
    )
  })
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      {rays}
    </svg>
  )
}

function GeminiIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12" />
    </svg>
  )
}

function PerplexityIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.213v6.213H9.785v-6.213L2.75 24V17.62H0V7.272h2.715V0l7.037 6.213V0h2.5v6.213L19.785 0Z" />
    </svg>
  )
}

function GrokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
      <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.666-2.31-6.816.071-9.2 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 0 0-1.829-1A8.975 8.975 0 0 0 5.984 4.83c-2.533 2.536-3.33 6.436-1.905 9.795 1.065 2.507-.616 4.28-2.31 6.065-.601.635-1.203 1.27-1.769 1.964l7.623-5.931" />
    </svg>
  )
}

// === UI ===
function AskAI() {
  return (
    <div className="flex flex-col gap-4 items-start">
      <span className="font-ppe text-[20px] text-bg tracking-[0.06em] select-none bp-sm:text-[18px] bp-xs:text-[17px]">
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
