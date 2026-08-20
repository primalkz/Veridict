import { useEffect, useState, type ElementType } from 'react'
import '../css/sidebar.css'
import { ClockCounterClockwise, ChatTeardropText } from "@phosphor-icons/react";
import { useNavigate, useParams } from 'react-router-dom';

type Props = { isOpen: boolean, setIsOpen: (value: boolean) => void };

type Convo = { id: string, title: string }

function loadHistory(): Convo[] {
  try {
    const raw = localStorage.getItem('conversation')
    const convos = raw ? JSON.parse(raw) : {}
    return Object.keys(convos)
      .reverse()
      .map(id => ({ id, title: convos[id]?.[0]?.content ?? 'No title' }))
  } catch {
    return []
  }
}

function History() {
  const { uuid } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const items = loadHistory()
  const filtered = items.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="sidebarHistory">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="find your chat"
        className="searchBox"
        aria-label="Search conversations"
      />
      {items.length === 0 ? (
        <p className="historyEmpty">no conversations yet</p>
      ) : filtered.length === 0 ? (
        <p className="historyEmpty">no matches</p>
      ) : (
        filtered.map(item => (
          <button
            key={item.id}
            className="historyItem"
            onClick={() => navigate(`/chat/${item.id}`)}
            title={item.title}
            aria-current={uuid === item.id ? 'page' : undefined}
          >
            {item.title}
          </button>
        ))
      )}
    </div>
  )
}

type MenuItem = {
  name: string
  desc: string
  icon: ElementType
  func: () => void
}

export default function Sidebar ({isOpen, setIsOpen}: Props) {
  const [showHistory, setShowHistory] = useState(false)
  const navigate = useNavigate()

  const menuItems: MenuItem[] = [
    {
      name: "New Chat",
      desc: "Start a new conversation",
      icon: ChatTeardropText,
      func: () => navigate("/chat/"),
    },
    {
      name: "History",
      desc: "View your previous conversations",
      icon: ClockCounterClockwise,
      func: () => setShowHistory(v => !v),
    },
  ]

  useEffect(() => {
    if (!isOpen) setShowHistory(false)
  }, [isOpen])

  const handleClick = (item: MenuItem) => {
    if (!isOpen) setIsOpen(true)
    item.func()
  }

  return (
    <main className={isOpen ? "sidebar sidebar--open" : "sidebar sidebar--closed"}>
      <nav className="sidebarNav">
        {menuItems.map(item => {
          const Icon = item.icon
          return (
            <button
              className="sidebarAction"
              onClick={() => handleClick(item)}
              key={item.name}
              title={item.desc}
              aria-label={item.name}
            >
              <Icon size={28}/>
              <span className='sidebar-item-name'>{item.name}</span>
            </button>
          )
        })}
      </nav>
      {showHistory && <History/>}
    </main>
  )
}