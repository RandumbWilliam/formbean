export function usePreferences() {
  const getPreference = <T>(key: string, defaultValue: T): T => {
    if (import.meta.client) {
      const stored = localStorage.getItem(`preferences.${key}`)
      if (stored !== null) {
        try {
          return JSON.parse(stored)
        }
        catch {
          return defaultValue
        }
      }
    }
    return defaultValue
  }

  const setPreference = <T>(key: string, value: T) => {
    if (import.meta.client) {
      localStorage.setItem(`preferences.${key}`, JSON.stringify(value))
    }
  }

  return {
    getPreference,
    setPreference,
  }
}
