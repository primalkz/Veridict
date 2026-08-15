import '../App.css';
import { NavLink } from 'react-router-dom';
import SidebarToggle from './SidebarToggle'

export default function Navbar ({isOpen, setIsOpen}) {
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
            </nav>
        </header>
    </>
    )
}