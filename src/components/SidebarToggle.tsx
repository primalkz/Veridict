import '../css/sidebar.css';
import { SidebarIcon, SidebarSimpleIcon } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function SidebarToggle ({isOpen, setIsOpen}: Props) {
  const location = useLocation()
  if (!location.pathname.startsWith('/chat')) return null

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="menu"
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={isOpen}
    >
      {isOpen ? <SidebarIcon size={22} /> : <SidebarSimpleIcon size={22} />}
    </button>
  )
}
