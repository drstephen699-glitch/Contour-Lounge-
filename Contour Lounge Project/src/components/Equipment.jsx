import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/* ──────────────────────────────────────────────────────────
   Equipment data
   ────────────────────────────────────────────────────────── */
const equipmentData = [
  {
    name: 'Advanced Laser System',
    description:
      'Precision laser technology for hair removal, pigmentation correction, and skin resurfacing',
    image: '/images/equipment-laser.png',
    alt: 'Advanced laser treatment machine for hair removal and skin resurfacing',
  },
  {
    name: 'RF Skin Tightener',
    description:
      'Radiofrequency and ultrasound device for non-invasive skin tightening and collagen stimulation',
    image: '/images/equipment-rf.png',
    alt: 'Radiofrequency skin tightening device for anti-aging treatments',
  },
  {
    name: 'HydraFacial System',
    description:
      'Multi-step facial treatment combining cleansing, exfoliation, extraction, and hydration',
    image: '/images/equipment-hydrafacial.png',
    alt: 'HydraFacial machine for deep cleansing and hydration facial treatments',
  },
  {
    name: 'LED Therapy Panel',
    description:
      'Medical-grade LED light therapy for acne treatment, skin rejuvenation, and wound healing',
    image: '/images/equipment-led.png',
    alt: 'LED light therapy panel for skin rejuvenation and acne treatment',
  },
  {
    name: 'Microneedling Device',
    description:
      'Precision micro-needling pen for collagen induction, scar treatment, and skin texture improvement',
    image: '/images/equipment-microneedling.png',
    alt: 'Professional microneedling pen for collagen induction therapy',
  },
];

/* ──────────────────────────────────────────────────────────
   Individual equipment card with 3D tilt interaction
   ────────────────────────────────────────────────────────── */
function EquipmentCard({ item, index, prefersReducedMotion }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  // Current transform state for desktop tilt
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  // Mouse position for the gold glow overlay (0-100 % relative)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  // Whether the cursor is currently over the card
  const [isHovering, setIsHovering] = useState(false);

  /* ── Desktop: Mouse-move tilt via requestAnimationFrame ── */
  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion) return;
      const card = cardRef.current;
      if (!card) return;

      // Cancel any pending frame to keep 1 rAF per paint
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalise offset to -1 … 1 range
        const offsetX = (e.clientX - centerX) / (rect.width / 2);
        const offsetY = (e.clientY - centerY) / (rect.height / 2);

        // Max ±10 degrees; note rotateX uses -Y offset for natural movement
        setTilt({
          rotateX: -(offsetY * 10),
          rotateY: offsetX * 10,
        });

        // Gold glow follows cursor (percentage-based)
        setGlowPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      });
    },
    [prefersReducedMotion],
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlowPos({ x: 50, y: 50 });
    setIsHovering(false);
  }, []);

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Mobile entrance animation variants ── */
  const mobileVariants = {
    hidden: {
      rotateY: -12,
      rotateX: 5,
      scale: 0.95,
      opacity: 0,
    },
    visible: {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 14,
        delay: index * 0.1,
      },
    },
  };

  /* Flat fade-in for users who prefer reduced motion */
  const reducedVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, delay: index * 0.08 },
    },
  };

  const variants = prefersReducedMotion ? reducedVariants : mobileVariants;

  return (
    <div style={{ perspective: '1000px' }} ref={cardRef}>
      <motion.div
        className="glass-card overflow-hidden gpu-accelerated relative"
        style={{
          transformStyle: 'preserve-3d',
          // Desktop tilt – applied via inline style so it layers with Framer
          transform: isHovering
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
            : undefined,
          transition: isHovering ? 'none' : 'transform 0.5s ease-out',
        }}
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gold accent line at top */}
        <div className="h-0.5 bg-gradient-gold" aria-hidden="true" />

        {/* Gold radial glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 0.18 : 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(179,135,78,0.35) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Equipment image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Card content */}
        <div className="p-6">
          <h3 className="font-serif text-lg text-cream">{item.name}</h3>
          <p className="mt-2 text-sm text-cream/60">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Equipment section
   ────────────────────────────────────────────────────────── */
export default function Equipment() {
  // Detect prefers-reduced-motion once on mount
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <section id="equipment" className="section-padding">
      {/* Section header */}
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-heading font-serif">Our Equipment</h2>
        <p className="mt-4 text-cream/60">
          State-of-the-art technology for exceptional results
        </p>
      </header>

      {/* Responsive grid: 1 col → 2 col → 3 col (last 2 centered) */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {equipmentData.map((item, i) => (
          <div
            key={item.name}
            className={
              /* Centre the last two cards on the 3-col layout */
              i === 3
                ? 'lg:col-start-1 lg:col-end-2 lg:justify-self-end'
                : i === 4
                  ? 'lg:col-start-2 lg:col-end-3 lg:justify-self-start'
                  : ''
            }
          >
            <EquipmentCard
              item={item}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
