export function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[’'`]/g, '')
    .replace(/\s+/g, '-')
}

export function findCategoryBySlug(categories, slug) {
  return categories?.find((cat) => slugify(cat.name) === slug) ?? null
}
