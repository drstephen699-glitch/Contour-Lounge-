import { useState, useEffect, useCallback } from 'react';

/* ──────────────────────────────────────────────────────────
   Inline SVG icons (24×24, 1.5px stroke, currentColor)
   ────────────────────────────────────────────────────────── */
function ArrowUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bronze-light" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bronze-light" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bronze-light" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,7 12,13 2,7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bronze-light" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bronze-light" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   Quick-links data for smooth scrolling
   ────────────────────────────────────────────────────────── */
const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Equipment', href: '#equipment' },
  { label: 'Doctor', href: '#doctor' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Book', href: '#booking' },
];

/* ──────────────────────────────────────────────────────────
   Back-to-top floating button
   ────────────────────────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center
        rounded-full bg-bronze text-charcoal shadow-lg
        transition-all duration-300
        hover:bg-bronze-light hover:scale-110
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
      `}
    >
      <ArrowUpIcon />
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   Footer component
   ────────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <>
      <footer className="border-t border-bronze/10 bg-charcoal-light">
        {/* Gold line divider */}
        <div className="gold-line" aria-hidden="true" />

        <div className="section-padding pb-10 pt-14">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* ── Brand column ── */}
            <div>
              <h2 className="font-serif text-xl text-cream">Contour Lounge</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                Where science meets beauty. Premium aesthetic treatments in a
                serene, luxurious environment — designed to help you look and
                feel your absolute best.
              </p>
            </div>

            {/* ── Quick Links column ── */}
            <nav aria-label="Footer navigation">
              <h3 className="font-serif text-lg text-cream">Quick Links</h3>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-cream/60 transition-colors duration-200 hover:text-bronze-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Contact column ── */}
            {/* PLACEHOLDER: Replace bracketed contact info with real details */}
            <div>
              <h3 className="font-serif text-lg text-cream">Contact</h3>
              <ul className="mt-4 space-y-4 text-sm text-cream/60" aria-label="Contact details">
                <li className="flex items-start gap-3">
                  <MapPinIcon />
                  <a 
                    href="https://maps.google.com/?q=Contour+Lounge+Sector+Y+DHA+Phase+3+Lahore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-bronze-light transition-colors duration-200"
                  >
                    DHA Phase 3, Sector Y, Lahore
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <PhoneIcon />
                  <a href="tel:+923000000000" className="hover:text-bronze-light transition-colors duration-200">[+92-XXX-XXXXXXX]</a>
                </li>
                <li className="flex items-start gap-3">
                  <MailIcon />
                  <a href="mailto:info@contourlounge.pk" className="hover:text-bronze-light transition-colors duration-200">[info@contourlounge.pk]</a>
                </li>
                <li className="flex items-start gap-3">
                  <InstagramIcon />
                  <a 
                    href="https://instagram.com/contourlounge" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-bronze-light transition-colors duration-200"
                  >
                    [@contourlounge]
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon />
                  <span>[Mon — Sat: 10:00 AM — 8:00 PM]</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-bronze/10 px-5 py-5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-cream/40">
              &copy; 2024 Contour Lounge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating back-to-top button */}
      <BackToTop />
    </>
  );
}
