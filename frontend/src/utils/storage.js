// Simple localStorage helpers for resume and applications
export function setResumeFor(email, resumeMeta) {
  try {
    localStorage.setItem(`cc_resume_${email}`, JSON.stringify(resumeMeta))
  } catch (e) { console.error(e) }
}

export function getResumeFor(email) {
  try {
    const raw = localStorage.getItem(`cc_resume_${email}`)
    return raw ? JSON.parse(raw) : null
  } catch (e) { return null }
}

export function removeResumeFor(email) {
  try { localStorage.removeItem(`cc_resume_${email}`) } catch (e) { console.error(e) }
}
