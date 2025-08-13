import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Darts from './pages/Darts';
import Cricket from './pages/Cricket';
import X01 from './pages/X01';
import AboutMe from './pages/AboutMe';
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/darts" element={<Darts />} />
        <Route path="/darts/cricket" element={<Cricket />} />
        <Route path="/darts/x01" element={<X01 />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}