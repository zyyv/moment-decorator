// Simple deep clone utility with graceful fallback
// 1. Try native structuredClone
// 2. Fallback to JSON (will drop functions / Dates become strings) but acceptable for current data shape
// 3. Final fallback: shallow copy
export function deepClone<T>(val: T): T {
  // 1. Native structuredClone if available
  try {
    if (typeof globalThis.structuredClone === 'function')
      return globalThis.structuredClone(val)
  }
  catch {}

  // 2. JSON fallback with Date revive
  try {
    const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    return JSON.parse(JSON.stringify(val), (_k, v) => {
      if (typeof v === 'string' && ISO_DATE_RE.test(v)) {
        const t = Date.parse(v)
        if (!Number.isNaN(t))
          return new Date(t)
      }
      return v
    })
  }
  catch {}

  // 3. Very last shallow fallbacks
  if (Array.isArray(val))
    return [...val] as any
  if (val && typeof val === 'object')
    return { ...(val as any) }
  return val
}
