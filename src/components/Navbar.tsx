import '../App.css';
import { NavLink } from 'react-router-dom';
import SidebarToggle from './SidebarToggle'
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export default function Navbar ({isOpen, setIsOpen}) {

    type Theme = "dark" | "light";

    let systemTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark" : "light";    

    const [theme, setTheme] = useState<Theme>(systemTheme);
    
    const toggleTheme = (): void => {
        console.log(theme);
        if(theme === "dark") {
            setTheme("light");
            document.documentElement.dataset.theme = "light";
        } else {
            setTheme("dark");
            document.documentElement.dataset.theme = "dark";
        }
    }

    return (
    <>
        <header>
            <nav>
                <NavLink to="/" id="logo">Veridict</NavLink>
                <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen}/>
            </nav>
            <nav>
              <NavLink to="/chat">Chat</NavLink>
              <NavLink to="/about">About</NavLink>
                <button className='themeToggle' onClick={() => toggleTheme()}>
                { theme == "dark" ? 
                    <SunIcon size={22}/> : <MoonIcon size={22}/>
                }
                </button>
            </nav>
        </header>
    </>
    )
}