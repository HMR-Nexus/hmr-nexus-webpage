import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send, Shield, Lock } from 'lucide-react';
import { useForm } from '@formspree/react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';
import {
  FORMSPREE_CONFIG,
  validateEmail,
  checkSpamPatterns,
  sanitizeInput
} from '../config/formspree';

interface ContactProps {
  preselectedType?: string;
}

const HONEYPOT_FIELD = 'website';

export function Contact({ preselectedType }: ContactProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [honeypot, setHoneypot] = useState('');
  const [localErrors, setLocalErrors] = useState<Record<string, boolean>>({});

  const [formspreeState, handleFormspreeSubmit] = useForm(FORMSPREE_CONFIG.formId);

  const projectTypes = [
    { value: 'ne3', label: t('contact.form.types.ne3') },
    { value: 'ne4', label: t('contact.form.types.ne4') },
    { value: 'software', label: t('contact.form.types.software') },
    { value: 'bot', label: t('contact.form.types.bot') },
    { value: 'saas', label: t('contact.form.types.saas') },
    { value: 'other', label: t('contact.form.types.other') },
  ];

  const validateForm = (formData: FormData) => {
    const errors: Record<string, boolean> = {};
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      projectType: formData.get('projectType') as string,
      message: formData.get('message') as string,
    };

    if (!data.firstName.trim() || data.firstName.length < 2) errors.firstName = true;
    if (!data.lastName.trim() || data.lastName.length < 2) errors.lastName = true;
    if (!data.email.trim() || !validateEmail(data.email)) errors.email = true;
    if (!data.projectType) errors.projectType = true;
    if (!data.message.trim() || data.message.length < 10) errors.message = true;

    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalErrors({});

    if (honeypot) return;

    const formData = new FormData(e.currentTarget);
    const { isValid, errors } = validateForm(formData);
    if (!isValid) {
      setLocalErrors(errors);
      return;
    }

    const form = e.currentTarget;
    const textFields = ['firstName', 'lastName', 'message'] as const;
    for (const field of textFields) {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null;
      if (input) input.value = sanitizeInput(input.value);
    }

    await handleFormspreeSubmit(e);
  };

  /* Nothing input base classes */
  const inputBase = 'w-full bg-transparent border-b border-nd-border-visible text-nd-text-display font-sans text-sm py-2.5 px-0 outline-none placeholder:text-nd-text-disabled transition-colors duration-200 focus:border-nd-text-primary';
  const inputError = 'border-nd-accent';

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="mb-10">
          <span className="nothing-label block mb-3">{t('contact.label')}</span>
          <h2 className="text-3xl md:text-4xl font-light text-nd-text-display mb-3">
            {t('contact.title')}{' '}
            <span className="text-nd-text-secondary">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-nd-text-secondary max-w-xl">
            {t('contact.subtitle')}
          </p>
        </MotionSection>

        {/* Contact Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-px bg-nd-border rounded-lg overflow-hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Contact Info */}
          <motion.div variants={cardEntrance} className="bg-nd-surface p-6 md:p-8">
            <h3 className="text-lg font-medium text-nd-text-display mb-2">{t('contact.info.title')}</h3>
            <p className="text-nd-text-secondary text-sm mb-6">{t('contact.info.description')}</p>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-nd-text-disabled mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="nothing-label mb-1">{t('contact.info.address.title')}</h4>
                  <p className="text-nd-text-secondary text-sm">
                    {t('contact.info.address.line1')}<br />
                    {t('contact.info.address.line2')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-nd-text-disabled mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="nothing-label mb-1">{t('contact.info.phone.title')}</h4>
                  <p className="text-nd-text-secondary text-sm">+49 176 31524448</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-nd-text-disabled mt-0.5" strokeWidth={1.5} />
                <div>
                  <h4 className="nothing-label mb-1">{t('contact.info.email.title')}</h4>
                  <p className="text-nd-text-secondary text-sm">info@hmr-nexus.com</p>
                </div>
              </div>
            </div>

            {/* Security — Nothing inline labels */}
            <div className="mt-6 pt-4 border-t border-nd-border space-y-1.5">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-nd-text-disabled" strokeWidth={1.5} />
                <span className="nothing-label">SSL ENCRYPTION</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-nd-text-disabled" strokeWidth={1.5} />
                <span className="nothing-label">ANTI-SPAM PROTECTION</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form — Nothing underline inputs */}
          <motion.div variants={cardEntrance} className="bg-nd-surface p-6 md:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <div className="hidden">
                <input
                  type="text"
                  name={HONEYPOT_FIELD}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name Row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="nothing-label block mb-2">{t('contact.form.firstName')} *</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Max…"
                    required
                    minLength={2}
                    maxLength={50}
                    className={`${inputBase} ${localErrors.firstName ? inputError : ''}`}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="nothing-label block mb-2">{t('contact.form.lastName')} *</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Mustermann…"
                    required
                    minLength={2}
                    maxLength={50}
                    className={`${inputBase} ${localErrors.lastName ? inputError : ''}`}
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="nothing-label block mb-2">{t('contact.form.email')} *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="max@firma.de…"
                    required
                    maxLength={100}
                    className={`${inputBase} ${localErrors.email ? inputError : ''}`}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="nothing-label block mb-2">{t('contact.form.phone')}</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+49…"
                    maxLength={20}
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="nothing-label block mb-2">{t('contact.form.projectType')} *</label>
                <select
                  id="projectType"
                  name="projectType"
                  defaultValue={preselectedType || ''}
                  required
                  className={`${inputBase} bg-transparent cursor-pointer appearance-none ${localErrors.projectType ? inputError : ''}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                    backgroundSize: '16px',
                  }}
                >
                  <option value="" className="bg-nd-surface">{t('contact.form.selectType')}</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value} className="bg-nd-surface">{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="nothing-label block mb-2">{t('contact.form.message')} *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder={`${t('contact.form.message')}…`}
                  required
                  minLength={10}
                  maxLength={1000}
                  onChange={(e) => {
                    if (checkSpamPatterns(e.target.value)) {
                      e.target.style.borderColor = 'var(--nd-accent)';
                    }
                  }}
                  className={`${inputBase} resize-y min-h-[80px] border border-nd-border-visible rounded-sm px-3 py-2.5 ${localErrors.message ? inputError : ''}`}
                />
              </div>

              {/* Status Messages — Nothing inline text, no toasts */}
              <div aria-live="polite">
                {formspreeState.succeeded && (
                  <p className="font-mono text-xs text-nd-success">[SENT] {t('contact.form.success')}</p>
                )}
                {formspreeState.errors && (
                  <p className="font-mono text-xs text-nd-accent">[ERROR] {t('contact.form.error')}</p>
                )}
              </div>

              {/* Submit Button — Nothing primary pill */}
              <button
                type="submit"
                disabled={formspreeState.submitting || !!honeypot}
                className="inline-flex items-center justify-center gap-2 bg-nd-text-display text-nd-black px-6 py-3 rounded-full font-mono text-[13px] uppercase tracking-[0.06em] hover:bg-nd-text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {formspreeState.submitting ? (
                  <span>{t('contact.form.sending')}...</span>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
