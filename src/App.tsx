import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/chat' element={<h1>Chat</h1>} />
      </Routes>
    </>
  )
}

export default App