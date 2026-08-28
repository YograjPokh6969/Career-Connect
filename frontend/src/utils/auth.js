export const USER_KEY = 'cc_user'
export const TOKEN_KEY = 'cc_token'

export function setUser(user) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (e) {
    console.error('setUser error', e)
  }
}

export function setAuth(user, token) {
  setUser(user)
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch (e) {
    console.error('setAuth error', e)
  }
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (e) {
    return null
  }
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}

export function logout() {
  try {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  } catch (e) {
    console.error('logout error', e)
  }
}

export function isAuthenticated() {
  return !!getUser()
}

export function hasRole(role) {
  const u = getUser()
  if (!u || !u.role) return false
  return u.role === role
}
