import { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Chat from './components/Chat'

function App() {

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');

    const syncTheme = () => {
      document.documentElement.dataset.theme = media.matches ? 'light' : 'dark';
    };

    syncTheme();
    media.addEventListener('change', syncTheme);

    return () => media.removeEventListener('change', syncTheme);
  }, []);

  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route path='/chat' element={<Chat isOpen={isOpen} setIsOpen={setIsOpen} />} />
      </Routes>
    </>
  )
}

export default App