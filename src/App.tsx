import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Stay from './pages/Stay';
import Explore from './pages/Explore';
import Connect from './pages/Connect';
import Experiences from './pages/Experiences';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Maintenance from './pages/Maintenance';
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
const IS_MAINTENANCE_MODE = true;

function App() {
  if (IS_MAINTENANCE_MODE) {
    return (
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-sanctuary-blue bg-sanctuary-sand">
          <Navbar />
          <main className="flex flex-col items-center justify-center flex-grow py-20 px-6">
            <Maintenance />
          </main>
          <Footer />
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
            <Route path="/connect" element={<Connect />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Booking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
