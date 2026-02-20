const CACHE_KEY = 'pokeidle_save'

export const saveGame = (state: unknown) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(state))
}

export const loadGame = () => {
  const raw = localStorage.getItem(CACHE_KEY)
  return raw ? JSON.parse(raw) : null
}

export const clearGame = () => {
  localStorage.removeItem(CACHE_KEY)
}
