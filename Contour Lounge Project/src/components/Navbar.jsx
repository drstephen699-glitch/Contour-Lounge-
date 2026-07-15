import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  NAV LINK DATA                                                     */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Equipment', href: '#equipment' },
  { label: 'Doctor', href: '#doctor' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Book', href: '#booking' },
];

/* ------------------------------------------------------------------ */
/*  NAVBAR COMPONENT                                                  */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const sentinelRef = useRef(null);

  /* ---- Scroll sentinel (IntersectionObserver, NOT scroll listener) ---- */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel scrolls out of view → navbar is "scrolled"
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /* ---- Active section tracking via IntersectionObserver ---- */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ---- Lock body scroll when drawer is open ---- */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      {/* Sentinel div — sits at top of page, 1px tall */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="absolute top-0 left-0 h-[100px] w-full pointer-events-none"
      />

      <nav
        className={`
          sticky top-0 z-50 w-full transition-all duration-300
          ${isScrolled
            ? 'bg-charcoal/95 backdrop-blur-md border-b border-bronze/20'
            : 'bg-transparent border-b border-transparent'
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:px-16">
          {/* ---- Logo ---- */}
          <a
            href="#hero"
            className="font-serif text-xl tracking-wider text-cream transition-opacity duration-200 hover:opacity-80 md:text-2xl"
          >
            Contour Lounge
          </a>

          {/* ---- Desktop links ---- */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`
                    relative text-sm font-medium tracking-wide transition-colors duration-200
                    ${activeSection === href.slice(1) ? 'text-bronze-light' : 'text-cream/70 hover:text-cream'}
                  `}
                >
                  {label}
                  {/* Active underline indicator */}
                  {activeSection === href.slice(1) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-bronze-light"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* ---- Desktop CTA ---- */}
          <a href="#booking" className="btn-primary hidden md:inline-flex">
            Book Appointment
          </a>

          {/* ---- Mobile hamburger ---- */}
          <button
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-expanded={drawerOpen}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          >
            {/* Three bars → animated X */}
            <span
              className={`
                block h-[2px] w-6 rounded-full bg-cream transition-all duration-300 origin-center
                ${drawerOpen ? 'translate-y-[7px] rotate-45' : ''}
              `}
            />
            <span
              className={`
                block h-[2px] w-6 rounded-full bg-cream transition-all duration-300
                ${drawerOpen ? 'scale-x-0 opacity-0' : ''}
              `}
            />
            <span
              className={`
                block h-[2px] w-6 rounded-full bg-cream transition-all duration-300 origin-center
                ${drawerOpen ? '-translate-y-[7px] -rotate-45' : ''}
              `}
            />
          </button>
        </div>

        {/* ---- Mobile drawer ---- */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              {/* Dark overlay */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 bg-charcoal/80 backdrop-blur-sm md:hidden"
                onClick={closeDrawer}
                aria-hidden="true"
              />

              {/* Slide-in panel */}
              <motion.aside
                key="drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed right-0 top-0 z-40 flex h-full w-72 flex-col bg-charcoal-light pt-24 shadow-2xl md:hidden"
                role="dialog"
                aria-label="Mobile navigation"
              >
                <ul className="flex flex-col gap-2 px-6">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <a
                        href={href}
                        onClick={closeDrawer}
                        className={`
                          block rounded-lg px-4 py-3 text-base font-medium tracking-wide transition-colors duration-200
                          ${activeSection === href.slice(1)
                            ? 'bg-bronze/10 text-bronze-light'
                            : 'text-cream/70 hover:bg-charcoal-lighter hover:text-cream'
                          }
                        `}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Mobile CTA */}
                <div className="mt-auto px-6 pb-10">
                  <a
                    href="#booking"
                    onClick={closeDrawer}
                    className="btn-primary w-full text-center"
                  >
                    Book Appointment
                  </a>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
