import { useState } from 'react';
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Chat from './components/Chat'

function App() {

  const [isOpen, setIsOpen] = useState(true);

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