export function handleTheme() {
  return () => {
    const theme = (() => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme')
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      } else return 'light'
    })()

    const lightButton = document.getElementById('theme-light')
    const darkButton = document.getElementById('theme-dark')

    if (theme === 'light') {
      if (!darkButton.hasAttribute('hidden')) {
        darkButton.toggleAttribute('hidden')
        lightButton.toggleAttribute('hidden')
      }
      document.documentElement.classList.remove('dark')
    } else {
      if (!lightButton.hasAttribute('hidden')) {
        darkButton.toggleAttribute('hidden')
        lightButton.toggleAttribute('hidden')
      }
      document.documentElement.classList.add('dark')
    }
    localStorage.setItem('theme', theme)

    // Evento Click al botón theme
    darkButton.addEventListener('click', () => {
      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        darkButton.toggleAttribute('hidden')
        lightButton.toggleAttribute('hidden')
      }
    })
    lightButton.addEventListener('click', () => {
      if (localStorage.getItem('theme') !== 'dark') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        darkButton.toggleAttribute('hidden')
        lightButton.toggleAttribute('hidden')
      }
    })

    const eventFunction = () => {
      if (localStorage.theme) localStorage.removeItem('theme')
    }
    window.addEventListener('pagehide', eventFunction)
  }
}
