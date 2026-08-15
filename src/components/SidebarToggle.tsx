import '../css/sidebar.css';
import { SidebarIcon, SidebarSimpleIcon } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';

export default function SidebarToggle ({isOpen, setIsOpen}) {
    const location = useLocation();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        { location.pathname === "/chat" && 
        <button onClick={toggleSidebar} className="menu" aria-label="Open menu">
            {!isOpen ? 
            (<SidebarSimpleIcon size={22} />)
            :
            (<SidebarIcon size={22} />)
            }
        </button>
        }
        </>
    )
}