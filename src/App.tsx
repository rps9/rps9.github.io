import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Darts from './pages/Darts';
import Cricket from './pages/Cricket';
import X01 from './pages/X01';
import AboutMe from './pages/AboutMe';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import OwnerControls from './pages/OwnerControls'
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
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/owner-controls" element={<OwnerControls />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}