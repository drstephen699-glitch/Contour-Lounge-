import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  STEP DATA                                                         */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    number: 1,
    title: 'Consultation',
    description:
      'Meet your specialist for a one-on-one discussion about your concerns, goals, and medical history.',
  },
  {
    number: 2,
    title: 'Assessment',
    description:
      'A thorough skin analysis using advanced diagnostic tools to understand your unique needs.',
  },
  {
    number: 3,
    title: 'Personalized Plan',
    description:
      'Receive a tailored treatment plan designed specifically for your skin type and aesthetic goals.',
  },
  {
    number: 4,
    title: 'The Procedure',
    description:
      'Expert treatment in our comfortable, state-of-the-art clinic with the latest technology.',
  },
  {
    number: 5,
    title: 'Aftercare',
    description:
      'Detailed post-treatment guidance and follow-up appointments to ensure lasting results.',
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  PROCESS COMPONENT                                                 */
/* ------------------------------------------------------------------ */
export default function Process() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="process" className="section-padding" ref={sectionRef}>
      {/* ---- Section header ---- */}
      <header className="mx-auto mb-16 max-w-2xl text-center">
        <h2 className="font-serif text-heading text-cream">Your Visit</h2>
        <p className="mt-3 text-cream/60">
          A seamless journey from consultation to aftercare
        </p>
      </header>

      {/* ---- Timeline ---- */}
      <motion.div
        className="
          relative mx-auto max-w-5xl
          flex flex-col gap-12
          lg:flex-row lg:gap-0 lg:justify-between
        "
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* ---- Horizontal connecting line (desktop only) ---- */}
        <div
          className="
            pointer-events-none absolute hidden
            lg:block lg:left-6 lg:right-6 lg:top-6
            lg:h-0.5 lg:bg-bronze/30
          "
          aria-hidden="true"
        />

        {STEPS.map((step, i) => {
          const isLast = i === STEPS.length - 1;

          return (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="
                relative flex gap-5
                lg:flex-col lg:items-center lg:text-center lg:flex-1 lg:gap-4
              "
            >
              {/* ---- Vertical connecting line (mobile only, not after last) ---- */}
              {!isLast && (
                <div
                  className="
                    absolute left-[23px] top-12 h-[calc(100%+0.5rem)]
                    w-0.5 bg-bronze/30
                    lg:hidden
                  "
                  aria-hidden="true"
                />
              )}

              {/* ---- Gold number circle ---- */}
              <div
                className="
                  relative z-10 flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-full bg-gradient-gold font-bold text-charcoal text-lg
                  shadow-lg shadow-bronze/20
                "
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* ---- Step text ---- */}
              <div className="pt-0.5 lg:pt-0">
                <h3 className="font-serif text-lg text-cream">{step.title}</h3>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-cream/70 lg:mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
