import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Darts from './pages/Darts';
import Cricket from './pages/Cricket';
import X01 from './pages/X01';

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/darts" element={<Darts />} />
      <Route path="/darts/cricket" element={<Cricket />} />
      <Route path="/darts/x01" element={<X01 />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}