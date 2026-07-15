import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────────────────────
   Service categories for the dropdown <optgroup>s
   ────────────────────────────────────────────────────────── */
const serviceCategories = [
  {
    label: 'Facial Skin Treatments',
    options: [
      'Chemical Peels',
      'HydraFacial',
      'Microdermabrasion',
      'Dermaplaning',
      'Microneedling',
      'LED Light Therapy',
      'Acne Treatment',
      'Acne Scar Treatment',
    ],
  },
  {
    label: 'Injectable Treatments',
    options: ['Botox', 'Dermal Fillers', 'Skin Boosters', 'PRP Therapy'],
  },
  {
    label: 'Laser Treatments',
    options: [
      'Laser Hair Removal',
      'Pigmentation Removal',
      'Skin Resurfacing',
      'Acne Scar Reduction',
      'Spider Veins',
      'Tattoo Removal',
    ],
  },
  {
    label: 'Skin Tightening & Anti-Aging',
    options: [
      'RF Skin Tightening',
      'Ultrasound Tightening',
      'Collagen Stimulation',
      'Wrinkle Reduction',
      'Neck & Facial Tightening',
    ],
  },
  {
    label: 'Body Contouring',
    options: [
      'Non-Surgical Fat Reduction',
      'Body Sculpting',
      'Cellulite Reduction',
      'Post-Weight-Loss Tightening',
    ],
  },
  {
    label: 'Hair Restoration',
    options: ['PRP for Hair Loss', 'Mesotherapy', 'Hair Growth Stimulation'],
  },
  {
    label: 'Pigmentation & Skin Concerns',
    options: ['Melasma', 'Sun Damage', 'Age Spots', 'Rosacea', 'Uneven Skin Tone'],
  },
  {
    label: 'Medical-Grade Skincare',
    options: [
      'Acne Prescriptions',
      'Anti-Aging',
      'Sunscreens',
      'Serums',
      'Custom Programs',
    ],
  },
];

/* ──────────────────────────────────────────────────────────
   Inline SVG icons (24×24, 1.5px stroke, currentColor)
   ────────────────────────────────────────────────────────── */
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

function MapPinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bronze-light" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
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

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bronze-light" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Spinner for the submit button */
function Spinner() {
  return (
    <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   Validation helpers
   ────────────────────────────────────────────────────────── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+92|0)?3\d{9}$/; // Pakistan mobile format

function validate(name, value) {
  switch (name) {
    case 'fullName':
      return value.trim() ? '' : 'Full name is required';
    case 'phone':
      if (!value.trim()) return 'Phone number is required';
      return phoneRegex.test(value.replace(/[\s-]/g, ''))
        ? ''
        : 'Enter a valid Pakistani phone number (e.g. 03XXXXXXXXX)';
    case 'email':
      if (!value.trim()) return 'Email is required';
      return emailRegex.test(value) ? '' : 'Enter a valid email address';
    case 'date':
      return value ? '' : 'Please select a preferred date';
    case 'service':
      return value ? '' : 'Please select a service';
    default:
      return '';
  }
}

/* ──────────────────────────────────────────────────────────
   BookingForm component
   ────────────────────────────────────────────────────────── */
export default function BookingForm() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Today's date string for the min attribute on date input
  const today = new Date().toISOString().split('T')[0];

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Re-validate if the field was previously touched
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = ['fullName', 'phone', 'email', 'date', 'service'];
    const newErrors = {};
    requiredFields.forEach((field) => {
      const err = validate(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    // Mark all fields as touched
    const allTouched = {};
    requiredFields.forEach((f) => (allTouched[f] = true));
    setTouched(allTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    // TODO: Wire up Formspree/EmailJS here
    // Replace the setTimeout mock with actual form submission:
    // Example with Formspree: fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: formData })
    // Example with EmailJS: emailjs.sendForm('service_id', 'template_id', form.current, 'public_key')
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({ fullName: '', phone: '', email: '', date: '', service: '', message: '' });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
  };

  /* ── Inline error component ── */
  const FieldError = ({ field }) =>
    touched[field] && errors[field] ? (
      <p className="mt-1 text-xs text-red-400" role="alert">{errors[field]}</p>
    ) : null;

  return (
    <section id="booking" className="section-padding" ref={sectionRef}>
      {/* Section header */}
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <motion.h2
          className="text-heading font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Book Your Appointment
        </motion.h2>
        <motion.p
          className="mt-4 text-cream/60"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Take the first step towards your aesthetic goals
        </motion.p>
      </header>

      {/* Two-column layout */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
        {/* ── Form column ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                className="glass-card flex flex-col items-center justify-center p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                {/* Animated green checkmark */}
                <motion.svg
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                  fill="none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
                >
                  <circle cx="36" cy="36" r="34" stroke="#4ADE80" strokeWidth="3" fill="none" />
                  <motion.polyline
                    points="22,36 32,46 50,28"
                    stroke="#4ADE80"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                </motion.svg>

                <h3 className="mt-6 font-serif text-xl text-cream">
                  Appointment Request Sent!
                </h3>
                <p className="mt-2 text-cream/70">
                  We&apos;ll contact you within 24 hours to confirm your booking.
                </p>

                <button
                  type="button"
                  className="btn-secondary mt-8"
                  onClick={resetForm}
                >
                  Book Another
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="sr-only">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input"
                  />
                  <FieldError field="fullName" />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="sr-only">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input"
                  />
                  <FieldError field="phone" />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input"
                  />
                  <FieldError field="email" />
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="date" className="sr-only">Preferred Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input"
                  />
                  <FieldError field="date" />
                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="service" className="sr-only">Service</label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input"
                  >
                    <option value="" disabled>Select a Service *</option>
                    {serviceCategories.map((cat) => (
                      <optgroup key={cat.label} label={cat.label}>
                        {cat.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <FieldError field="service" />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Message (optional)"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Sending…
                    </>
                  ) : (
                    'Book Appointment'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Info card column ── */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="glass-card space-y-6 p-8">
            <h3 className="font-serif text-xl text-cream">Get in Touch</h3>

            {/* PLACEHOLDER: Replace bracketed contact info with real details */}
            <ul className="space-y-5 text-sm text-cream/80" aria-label="Contact information">
              <li className="flex items-start gap-3">
                <PhoneIcon />
                <a href="tel:+923000000000" className="hover:text-bronze-light transition-colors duration-200">[+92-XXX-XXXXXXX]</a>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon />
                <a href="mailto:info@contourlounge.pk" className="hover:text-bronze-light transition-colors duration-200">[info@contourlounge.pk]</a>
              </li>
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
                <ClockIcon />
                <span>[Mon — Sat: 10:00 AM — 8:00 PM]</span>
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
            </ul>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
