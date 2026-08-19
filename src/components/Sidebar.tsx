import { useEffect, useState, type ElementType } from 'react'
import '../css/sidebar.css'
import { ClockCounterClockwise, ChatTeardropText, MagnifyingGlass } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';

type Props = { isOpen: boolean, setIsOpen: (value: boolean) => void };

const History = () => {
    const oldconvos = localStorage.getItem('conversation');
    const convos = JSON.parse(oldconvos);
    type History = {
        id: string;
        title: string;
    }

    const historyItems: History[] = [];

    const keys = Object.keys(convos);
    for(let i = keys.length - 1; i >= 0; i--){
        const item = {
            id: keys[i],
            title:  convos[keys[i]][0]?.content ?? 'No Title'
        }

        historyItems.push(item);
    }

    const navigate = useNavigate();

    const openChat = (key: string) => {
        navigate(`/chat/${key}`);
    }

    return (
        <>
            {
            historyItems.map(item => {
                return (
                <li className='historyItem' onClick={() => openChat(item.id)} key={item.id} title={item.title}>{item.title}</li>
            )})
            }
        </>       
    )
}

export default function Sidebar ({isOpen, setIsOpen}: Props) {
    
    const [history, selectHistory] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate();
    const toggleHistory = () => {
        !history && setIsOpen(true);
        selectHistory(!history);
    }   
    const newChat = () => {
        navigate("/chat/");
    }
    
    type Menu = {
        name: string;
        desc: string;
        icon: ElementType;
        func?: () => void;
    }
    const menuItems: Menu[] = [
        {
            name: "New Chat",
            desc: "Start a new conversation",
            icon: ChatTeardropText,
            func: newChat,
        },
        {
            name: "Search",
            desc: "Search through your conversations",
            icon: MagnifyingGlass,
            func: () => { setSearchActive(!searchActive); !searchActive && setIsOpen(true);}
        },
        {
            name: "History",
            desc: "View your previous conversations",
            icon: ClockCounterClockwise,
            func: toggleHistory,
        },
    ];

    const search = (query : string) => {
        selectHistory(true);
        const items = document.querySelectorAll('.historyItem');
        const result = Array.from(items).forEach(item => {
            const matches = item.textContent.toLowerCase().includes(query.toLowerCase());
            (item as HTMLElement).style.display = matches ? '' : 'none';
        }
        );
    }

    useEffect(() => {
        !isOpen && selectHistory(false);
        !isOpen && setSearchActive(false);
    }, [isOpen])

    return (
        <main className={isOpen ? "sidebar sidebar--open" : "sidebar sidebar--closed"}>
            <section>
                <ul>
                    {
                    menuItems.map(item => {
                        const Icon = item.icon;
                        const Func = item.func;
                        return (
                        <li onClick={Func} key={item.name} title={item.desc}>
                        <Icon size={28}/> 
                        <span className='sidebar-item-name'>{item.name}</span>
                        </li>
                    )})
                    }
                    { searchActive &&
                    (<input type="text" onChange={(e) => {search(e.target.value)}} placeholder='Find your chat' className='searchBox'/>)
                    }
                    { history &&
                        <History/>
                    }
                </ul>
            </section>
        </main>
    )
}