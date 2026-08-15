import { useEffect, useState, type ElementType } from 'react'
import '../css/sidebar.css'
import { ClockCounterClockwise, ChatTeardropText, MagnifyingGlass } from "@phosphor-icons/react";

type Props = { isOpen: boolean, setIsOpen: (value: boolean) => void };

const History = () => {
    type History = {
        id: string;
        title: string;
    }
    const historyItems: History[] = [
        { id: "1", title: "Build an AI chat interface" },
        { id: "2", title: "Fix React hydration error" },
        { id: "3", title: "Create a dark mode theme" },
        { id: "4", title: "Explain TypeScript generics" },
        { id: "5", title: "Build a streaming LLM response" },
        { id: "6", title: "Improve API error handling" },
        { id: "7", title: "Create a responsive sidebar" },
        { id: "8", title: "How does RAG work?" },
        { id: "9", title: "Write a PostgreSQL query" },
        { id: "10", title: "Compare GPT and Claude" },
        { id: "11", title: "Build a markdown renderer" },
        { id: "12", title: "Optimize React performance" },
    ]

    return (
        <>
            {
            historyItems.map(item => {
                return (
                <li key={item.id} title={item.title}>{item.title}</li>
            )})
            }
        </>       
    )
}

export default function Sidebar ({isOpen, setIsOpen}: Props) {
    
    const [history, selectHistory] = useState(false);
    const toggleHistory = () => {
        !history && setIsOpen(true);
        selectHistory(!history);
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
        },
        {
            name: "Search",
            desc: "Search through your conversations",
            icon: MagnifyingGlass,
        },
        {
            name: "History",
            desc: "View your previous conversations",
            icon: ClockCounterClockwise,
            func: toggleHistory,
        },
    ];

    useEffect(() => {
        !isOpen && selectHistory(false);
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
                    { history &&
                        <History/>
                    }
                </ul>
            </section>
        </main>
    )
}