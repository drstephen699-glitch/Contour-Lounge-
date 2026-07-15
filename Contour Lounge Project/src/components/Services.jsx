import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  SERVICE DATA                                                      */
/* ------------------------------------------------------------------ */
const SERVICES = [
  {
    id: 'facial',
    name: 'Facial Skin Treatments',
    treatments: [
      'Chemical peels',
      'HydraFacial / deep cleansing facials',
      'Microdermabrasion',
      'Dermaplaning',
      'Microneedling',
      'LED light therapy',
      'Acne treatment',
      'Acne scar treatment',
    ],
  },
  {
    id: 'injectables',
    name: 'Injectable Treatments',
    treatments: [
      'Botulinum toxin (Botox) for wrinkles',
      'Dermal fillers (lips / cheeks / jawline / under-eye)',
      'Skin boosters for hydration',
      'PRP therapy ("vampire facial")',
    ],
  },
  {
    id: 'laser',
    name: 'Laser Treatments',
    treatments: [
      'Laser hair removal',
      'Pigmentation removal',
      'Skin resurfacing',
      'Acne scar reduction',
      'Spider veins / visible blood vessels',
      'Tattoo removal',
    ],
  },
  {
    id: 'tightening',
    name: 'Skin Tightening & Anti-Aging',
    treatments: [
      'Radiofrequency (RF) skin tightening',
      'Ultrasound skin tightening',
      'Collagen stimulation treatments',
      'Wrinkle reduction',
      'Neck and facial tightening',
    ],
  },
  {
    id: 'body',
    name: 'Body Contouring',
    treatments: [
      'Non-surgical fat reduction (cryolipolysis)',
      'Body sculpting',
      'Cellulite reduction',
      'Skin tightening after weight loss',
    ],
  },
  {
    id: 'hair',
    name: 'Hair Restoration',
    treatments: [
      'PRP for hair loss',
      'Mesotherapy for hair',
      'Hair growth stimulation treatments',
    ],
  },
  {
    id: 'pigmentation',
    name: 'Pigmentation & Skin Concerns',
    treatments: [
      'Melasma treatment',
      'Sun damage treatment',
      'Age spot removal',
      'Rosacea management',
      'Uneven skin tone treatment',
    ],
  },
  {
    id: 'skincare',
    name: 'Medical-Grade Skincare',
    treatments: [
      'Prescription-strength acne treatments',
      'Anti-aging skincare',
      'Sunscreens',
      'Serums and moisturizers',
      'Customized skincare programs',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  INLINE SVG ICONS (one per category)                               */
/* ------------------------------------------------------------------ */
const ICONS = {
  facial: (
    /* Sparkle */
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
    </svg>
  ),
  injectables: (
    /* Syringe */
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3L21 7M20 8L8.5 19.5L4 20L4.5 15.5L16 4L20 8Z" />
      <path d="M7 13L11 17" />
      <path d="M2 22L4 20" />
    </svg>
  ),
  laser: (
    /* Beam / Zap */
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  tightening: (
    /* Clock / timer */
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  body: (
    /* Body silhouette */
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="4" r="2" />
      <path d="M16 8H8C8 8 7 10 7 13C7 14 8 14 8 14L10 12V22H14V12L16 14C16 14 17 14 17 13C17 10 16 8 16 8Z" />
    </svg>
  ),
  hair: (
    /* Hair / strands */
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22" />
      <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" />
      <path d="M12 2V22" />
    </svg>
  ),
  pigmentation: (
    /* Palette */
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" />
      <circle cx="8" cy="14" r="1.5" fill="currentColor" />
      <path d="M14 14C14 14 16 16 18 14C20 12 18 10 18 10" />
    </svg>
  ),
  skincare: (
    /* Flask */
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 2H15M10 2V8L4 20H20L14 8V2" />
      <path d="M7 16H17" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                */
/* ------------------------------------------------------------------ */
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const expandVariant = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

/* ------------------------------------------------------------------ */
/*  SERVICES COMPONENT                                                */
/* ------------------------------------------------------------------ */
export default function Services() {
  const [expandedId, setExpandedId] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="section-padding"
      ref={sectionRef}
    >
      {/* ---- Section header ---- */}
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-serif text-heading text-cream">Our Services</h2>
        <p className="mt-3 text-cream/60">
          Comprehensive aesthetic treatments tailored to your goals
        </p>
      </header>

      {/* ---- Grid of accordion cards ---- */}
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {SERVICES.map((service, i) => {
          const isOpen = expandedId === service.id;

          return (
            <motion.article
              key={service.id}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="glass-card overflow-hidden p-6"
            >
              {/* Card header — clickable toggle */}
              <button
                type="button"
                onClick={() => toggle(service.id)}
                className="flex w-full items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze/50 rounded-lg"
                aria-expanded={isOpen}
                aria-controls={`panel-${service.id}`}
              >
                {/* Icon */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bronze/10 text-bronze-light">
                  {ICONS[service.id]}
                </span>

                {/* Title + count */}
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-cream">{service.name}</h3>
                  <span className="mt-0.5 inline-block text-xs text-bronze-light">
                    {service.treatments.length} treatments
                  </span>
                </div>

                {/* Chevron */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 text-cream/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Expandable treatment list */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`panel-${service.id}`}
                    role="region"
                    variants={expandVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2 border-t border-bronze/10 pt-4">
                      {service.treatments.map((t) => (
                        <li
                          key={t}
                          className="flex items-start gap-2 text-sm text-cream/70"
                        >
                          {/* Gold bullet dot */}
                          <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
