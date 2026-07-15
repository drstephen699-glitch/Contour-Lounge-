import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                */
/* ------------------------------------------------------------------ */

/** Stagger container for child items */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

/** Individual item: fade-in + slide-up (GPU-only: transform + opacity) */
const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** SVG contour path draw animation */
const drawPath = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2.2, delay, ease: 'easeOut' },
  },
});

/* ------------------------------------------------------------------ */
/*  MAP PIN INLINE SVG ICON                                           */
/* ------------------------------------------------------------------ */
function MapPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO COMPONENT                                                    */
/* ------------------------------------------------------------------ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* ---- Background image ---- */}
      <img
        src="/images/hero-bg.png"
        alt="Contour Lounge aesthetic clinic interior with warm ambient lighting and premium treatment area"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ---- Dark gradient overlay ---- */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-transparent"
        aria-hidden="true"
      />

      {/* ---- Extra bottom vignette for text readability ---- */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* ---- Decorative contour-line SVG ---- */}
      <motion.svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        className="absolute bottom-8 right-4 hidden opacity-60 md:block lg:bottom-16 lg:right-16"
        aria-hidden="true"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M20,280 C80,240 120,180 200,170 C280,160 320,200 380,150"
          stroke="#B3874E"
          strokeWidth="1"
          strokeOpacity="0.5"
          variants={drawPath(0)}
        />
        <motion.path
          d="M10,260 C90,200 140,140 220,130 C300,120 340,170 390,110"
          stroke="#B3874E"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          variants={drawPath(0.4)}
        />
        <motion.path
          d="M30,240 C100,180 160,120 240,100 C320,80 350,140 380,70"
          stroke="#D9AE78"
          strokeWidth="1"
          strokeOpacity="0.25"
          variants={drawPath(0.8)}
        />
        <motion.path
          d="M50,220 C110,160 170,100 250,80 C330,60 360,110 390,40"
          stroke="#D9AE78"
          strokeWidth="1.5"
          strokeOpacity="0.18"
          variants={drawPath(1.2)}
        />
      </motion.svg>

      {/* ---- Content ---- */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 md:px-8 lg:px-16"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          className="font-serif text-display max-w-3xl"
          variants={fadeSlideUp}
        >
          <span className="text-cream">Premier </span>
          <span className="text-gradient-gold">Aesthetic</span>
          <span className="text-cream"> Clinic</span>
          <br />
          <span className="text-cream">in DHA Phase 3, Lahore</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg"
          variants={fadeSlideUp}
        >
          Where science meets artistry. Personalized skin treatments in a
          boutique lounge setting — not a clinical waiting room.
        </motion.p>

        {/* Address chip - Interactive Google Maps link */}
        <motion.a
          href="https://maps.google.com/?q=Contour+Lounge+Sector+Y+DHA+Phase+3+Lahore"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-bronze/30 bg-charcoal-light/30 backdrop-blur-sm px-4 py-2 text-sm text-bronze-light hover:border-bronze/60 hover:bg-bronze/5 transition-all duration-300"
          variants={fadeSlideUp}
        >
          <MapPinIcon />
          <span>DHA Phase 3, Sector Y, Lahore</span>
        </motion.a>

        {/* CTAs - Stacked full-width on mobile, side-by-side on desktop */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none sm:w-auto"
          variants={fadeSlideUp}
        >
          <a href="#booking" className="btn-primary w-full sm:w-auto">
            Book Appointment
          </a>
          <a href="#services" className="btn-secondary w-full sm:w-auto">
            See All Treatments
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
