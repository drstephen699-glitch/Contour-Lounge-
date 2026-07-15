import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ──────────────────────────────────────────────────────────
   PLACEHOLDER: Replace with real client testimonials
   ────────────────────────────────────────────────────────── */
const reviews = [
  {
    name: 'Ayesha M.',
    treatment: 'HydraFacial',
    review:
      `The most relaxing facial experience I've ever had. My skin was glowing for days after. The staff made me feel so comfortable and the clinic atmosphere is absolutely stunning.`,
  },
  {
    name: 'Sara K.',
    treatment: 'Laser Hair Removal',
    review:
      `After years of trying different hair removal methods, I finally found the solution. The laser treatments here are virtually painless and the results have been incredible.`,
  },
  {
    name: 'Fatima R.',
    treatment: 'Dermal Fillers',
    review:
      `I was nervous about fillers but the doctor explained everything so thoroughly. The results look completely natural — exactly what I wanted. Highly recommend Contour Lounge.`,
  },
  {
    name: 'Hina A.',
    treatment: 'Chemical Peel',
    review:
      `My skin has never looked better. The personalized skincare plan they created for me has transformed my complexion. Worth every visit.`,
  },
];

/* Five gold stars rendered inline */
function StarRating() {
  return (
    <div className="flex gap-1 text-bronze-light" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-lg" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

/* Animation variants */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.12 },
  }),
};

export default function Reviews() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="reviews" className="section-padding" ref={sectionRef}>
      {/* PLACEHOLDER: Replace with real client testimonials */}

      {/* Section header */}
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <motion.h2
          className="text-heading font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          What Our Clients Say
        </motion.h2>
      </header>

      {/* ─── Mobile: horizontal snap-scroll carousel ─── */}
      {/* ─── Desktop (md+): 2×2 grid ─── */}
      <div
        className="
          flex gap-6 overflow-x-auto snap-x snap-mandatory
          pb-4 scrollbar-none
          md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0
          mx-auto max-w-5xl
        "
      >
        {reviews.map((review, i) => (
          <motion.article
            key={review.name}
            className="
              glass-card p-6
              snap-center min-w-[85vw] shrink-0
              md:min-w-0 md:shrink
            "
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={i}
          >
            <StarRating />

            <blockquote className="mt-4 text-sm italic text-cream/80">
              &ldquo;{review.review}&rdquo;
            </blockquote>

            <div className="mt-4">
              <p className="font-semibold text-cream">{review.name}</p>
              <p className="text-xs text-bronze/70">{review.treatment}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
