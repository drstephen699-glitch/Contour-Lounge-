import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Equipment from './components/Equipment';
import Doctor from './components/Doctor';
import Reviews from './components/Reviews';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

/**
 * Contour Lounge — Premier Aesthetic Clinic Landing Page
 * 
 * Root component assembling all page sections in order.
 * Smooth scroll navigation is handled via standard anchor links
 * with CSS scroll-behavior: smooth on the html element.
 */
function App() {
  return (
    <>
      {/* Sentinel element for navbar scroll detection */}
      <div id="nav-sentinel" style={{ position: 'absolute', top: 0, height: '1px', width: '1px' }} />
      
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Gold contour line section divider */}
        <div className="contour-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40 C240 20, 480 50, 720 30 C960 10, 1200 45, 1440 25" stroke="#B3874E" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M0 30 C360 50, 720 15, 1080 40 C1260 50, 1380 25, 1440 35" stroke="#D9AE78" strokeWidth="0.75" strokeOpacity="0.25" />
          </svg>
        </div>

        <Services />
        
        <div className="contour-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 35 C200 15, 400 45, 600 25 C800 5, 1000 40, 1200 20 C1320 10, 1400 30, 1440 25" stroke="#B3874E" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
        </div>

        <Process />

        <div className="contour-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 25 C180 45, 360 15, 540 35 C720 55, 900 20, 1080 40 C1260 55, 1380 30, 1440 35" stroke="#D9AE78" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M0 45 C300 25, 600 50, 900 30 C1100 15, 1300 40, 1440 30" stroke="#B3874E" strokeWidth="0.75" strokeOpacity="0.2" />
          </svg>
        </div>

        <Equipment />

        <div className="contour-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 30 C240 50, 480 20, 720 40 C960 55, 1200 25, 1440 35" stroke="#B3874E" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
        </div>

        <Doctor />

        <div className="contour-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40 C360 20, 720 50, 1080 25 C1260 15, 1380 35, 1440 30" stroke="#D9AE78" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
        </div>

        <Reviews />

        <div className="contour-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 35 C200 55, 500 15, 800 40 C1000 50, 1200 25, 1440 30" stroke="#B3874E" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M0 20 C400 40, 800 10, 1200 35 C1360 42, 1420 28, 1440 25" stroke="#D9AE78" strokeWidth="0.75" strokeOpacity="0.2" />
          </svg>
        </div>

        <BookingForm />
      </main>

      <Footer />
    </>
  );
}

export default App;
