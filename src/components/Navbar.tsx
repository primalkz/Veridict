import '../App.css';
import { NavLink } from 'react-router-dom';
import SidebarToggle from './SidebarToggle'
import { MoonIcon, SunIcon } from '@phosphor-icons/react';

type Theme = 'dark' | 'light'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  theme: Theme
  toggleTheme: () => void
}

export default function Navbar ({isOpen, setIsOpen, theme, toggleTheme}: Props) {
  return (
    <header>
      <nav>
        <NavLink to="/" id="logo">Veridict</NavLink>
        <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen}/>
      </nav>
      <nav>
        <NavLink to="/chat">Chat</NavLink>
        <NavLink to="/about">About</NavLink>
        <button
          className='themeToggle'
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <SunIcon size={22}/> : <MoonIcon size={22}/>}
        </button>
      </nav>
    </header>
  )
}