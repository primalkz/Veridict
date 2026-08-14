import '../App.css';
import { NavLink } from 'react-router-dom';

export default function Navbar () {
    return (
    <>
        <header>
            <nav>
                <NavLink to="/" id="logo">Veridict</NavLink>
            </nav>
            <nav>
              <NavLink to="/chat">Chat</NavLink>
              <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    </>
    )
}