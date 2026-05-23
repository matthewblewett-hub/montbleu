import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatBot from './components/ui/ChatBot';

import Home from './pages/Home';
import Stay from './pages/Stay';
import Explore from './pages/Explore';
import ConnectExperience from './pages/ConnectExperience';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Relax from './pages/Relax';
import Dining from './pages/Dining';
import Maintenance from './pages/Maintenance';
import WinterPackage from './pages/WinterPackage';
import { useEffect } from 'react';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Toggle this variable to true to put the site in maintenance mode
const IS_MAINTENANCE_MODE = false;

function App() {
  if (IS_MAINTENANCE_MODE) {
    return (
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-sanctuary-blue bg-sanctuary-sand">
          <Navbar />
          <main className="flex flex-col items-center justify-center flex-grow py-20 px-6">
            <Routes>
              <Route path="/booking-terms" element={<Terms />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/relax" element={<Relax />} />
              <Route path="*" element={<Maintenance />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen font-sans text-sanctuary-blue bg-sanctuary-sand">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/connect-experience" element={<ConnectExperience />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/booking-terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/relax" element={<Relax />} />
            <Route path="/winter-package" element={<WinterPackage />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
