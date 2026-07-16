const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8005'
const ENDPOINT = `${API_BASE_URL}/api/public/analytics/events`
const SESSION_KEY = 'chizlab_analytics_session_id'
const FLUSH_INTERVAL_MS = 4000
const MAX_QUEUE = 50

function getSessionId() {
  if (typeof window === 'undefined') return ''
  try {
    let id = window.localStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      window.localStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return 'no-storage'
  }
}

let queue = []
let flushTimer = null

function sendBatch(events, useBeacon) {
  const body = JSON.stringify({ events })
  if (useBeacon && navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon(ENDPOINT, blob)
    return
  }
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {})
}

function flush(useBeacon = false) {
  if (queue.length === 0) return
  const events = queue.splice(0, MAX_QUEUE)
  sendBatch(events, useBeacon)
}

function scheduleFlush() {
  if (flushTimer) return
  flushTimer = setTimeout(() => {
    flushTimer = null
    flush()
  }, FLUSH_INTERVAL_MS)
}

function enqueue(event) {
  if (typeof window === 'undefined') return
  queue.push(event)
  if (queue.length >= MAX_QUEUE) {
    flush()
  } else {
    scheduleFlush()
  }
}

export function trackPageview(path) {
  enqueue({ type: 'pageview', path, sessionId: getSessionId() })
}

export function trackClick(label, path) {
  if (!label) return
  enqueue({ type: 'click', path, label: label.slice(0, 300), sessionId: getSessionId() })
}

export function initAnalyticsFlushOnHide() {
  if (typeof window === 'undefined') return
  const onHide = () => flush(true)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') onHide()
  })
  window.addEventListener('pagehide', onHide)
}
