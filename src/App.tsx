import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Darts from './pages/Darts'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/darts" element={<Darts />} />
    </Routes>
  )
}