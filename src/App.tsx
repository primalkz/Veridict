import { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Chat from './components/Chat'

type Theme = 'dark' | 'light'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (localStorage.getItem('theme')) return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setTheme(media.matches ? 'dark' : 'light')
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggle } = useTheme()

  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} theme={theme} toggleTheme={toggle} />
      <Routes>
        <Route path="/chat" element={<Chat isOpen={isOpen} setIsOpen={setIsOpen} />} />
        <Route path="/chat/:uuid" element={<Chat isOpen={isOpen} setIsOpen={setIsOpen} />} />
      </Routes>
    </>
  )
}