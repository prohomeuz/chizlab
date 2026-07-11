const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8005'

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Origin: process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'http://localhost:3000' },
    next: { revalidate: 60 },
  })

  if (!res.ok) return null
  return res.json()
}

export function getCategories() {
  return apiGet('/api/public/categories')
}

export function getMaterials({ categoryId, limit = 20, offset = 0, search } = {}) {
  const params = new URLSearchParams()
  if (categoryId) params.set('categoryId', categoryId)
  if (search) params.set('search', search)
  params.set('limit', String(limit))
  params.set('offset', String(offset))
  return apiGet(`/api/public/materials?${params.toString()}`)
}

export function getMaterial(id) {
  return apiGet(`/api/public/materials/${id}`)
}
