import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ──────────────────────────────────────────────────────────
   PLACEHOLDER: Replace all [bracketed] content with real
   doctor information before going live.
   ────────────────────────────────────────────────────────── */

/* Inline gold check-circle icon (24×24, 1.5px stroke) */
function CheckCircleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-bronze-light"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* Fade-in variant */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};

export default function Doctor() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="doctor" className="section-padding" ref={sectionRef}>
      {/* PLACEHOLDER: Replace all [bracketed] content with real doctor information */}

      {/* Section header */}
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <motion.h2
          className="text-heading font-serif"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
        >
          Meet Your Specialist
        </motion.h2>
      </header>

      {/* Two-column layout: photo + info */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* ── Photo column ── */}
        <motion.div
          className="flex justify-center"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.15}
        >
          <div className="overflow-hidden rounded-2xl border-2 border-bronze/20">
            <img
              src="/images/doctor-placeholder.png"
              alt="Lead dermatologist and aesthetic specialist at Contour Lounge"
              width={600}
              height={750}
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>

        {/* ── Info column ── */}
        <motion.div
          className="space-y-6"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.3}
        >
          {/* Name & specialization */}
          <div>
            <h3 className="font-serif text-2xl text-cream">
              [Doctor&apos;s Name]
            </h3>
            <p className="mt-1 text-lg text-bronze-light">
              [Specialization — e.g., Dermatology &amp; Aesthetic Medicine]
            </p>
          </div>

          {/* Experience badge */}
          <span className="inline-block rounded-full border border-bronze/30 bg-charcoal-lighter px-4 py-1.5 text-xs font-semibold tracking-wide text-bronze-light">
            [X]+ Years of Experience
          </span>

          {/* Credentials list */}
          <ul className="space-y-3" aria-label="Doctor credentials">
            {[
              '[University/Medical School]',
              '[Board Certification]',
              '[Professional Memberships]',
            ].map((credential) => (
              <li key={credential} className="flex items-center gap-3 text-cream/80">
                <CheckCircleIcon />
                <span className="text-sm">{credential}</span>
              </li>
            ))}
          </ul>

          {/* Bio */}
          <p className="leading-relaxed text-cream/70">
            [Doctor&apos;s bio — their philosophy on aesthetic medicine, approach
            to patient care, and specializations. Replace with real content.]
          </p>
        </motion.div>
      </div>
    </section>
  );
}
