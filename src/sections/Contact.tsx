import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@formspree/react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';
import {
  FORMSPREE_CONFIG,
  validateEmail,
  checkSpamPatterns,
  sanitizeInput,
} from '../config/formspree';

interface ContactProps {
  preselectedType?: string;
}

const HONEYPOT_FIELD = 'website';

/**
 * NEXUS Contact — 05 · Direct. Technical. Calm.
 * No glow, no gradients. A brief, not a funnel.
 */
export function Contact({ preselectedType }: ContactProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [honeypot, setHoneypot] = useState('');
  const [localErrors, setLocalErrors] = useState<Record<string, boolean>>({});

  const [formspreeState, handleFormspreeSubmit] = useForm(FORMSPREE_CONFIG.formId);

  useEffect(() => {
    const projectTypeSelect = formRef.current?.elements.namedItem('projectType') as HTMLSelectElement | null;
    if (projectTypeSelect && preselectedType) {
      projectTypeSelect.value = preselectedType;
    }
  }, [preselectedType]);

  const projectTypes = [
    { value: 'ne3',      label: t('contact.form.types.ne3') },
    { value: 'ne4',      label: t('contact.form.types.ne4') },
    { value: 'software', label: t('contact.form.types.software') },
    { value: 'bot',      label: t('contact.form.types.bot') },
    { value: 'saas',     label: t('contact.form.types.saas') },
    { value: 'other',    label: t('contact.form.types.other') },
  ];

  const validateForm = (formData: FormData) => {
    const errors: Record<string, boolean> = {};
    const data = {
      firstName: formData.get('firstName') as string,
      lastName:  formData.get('lastName') as string,
      email:     formData.get('email') as string,
      projectType: formData.get('projectType') as string,
      message:   formData.get('message') as string,
    };
    if (!data.firstName?.trim() || data.firstName.length < 2) errors.firstName = true;
    if (!data.lastName?.trim() || data.lastName.length < 2)  errors.lastName = true;
    if (!data.email?.trim() || !validateEmail(data.email))   errors.email = true;
    if (!data.projectType)                                    errors.projectType = true;
    if (!data.message?.trim() || data.message.length < 10)   errors.message = true;
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalErrors({});
    if (honeypot) return;

    const formData = new FormData(e.currentTarget);
    const { isValid, errors } = validateForm(formData);
    if (!isValid) { setLocalErrors(errors); return; }

    const form = e.currentTarget;
    for (const field of ['firstName', 'lastName', 'message'] as const) {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null;
      if (input) input.value = sanitizeInput(input.value);
    }

    await handleFormspreeSubmit(e);
  };

  const inputBase =
    'w-full bg-transparent border-b border-[color:var(--rule-strong)] text-paper font-sans text-[15px] py-3 px-0 outline-none placeholder:text-paper/35 transition-colors duration-200 focus:border-[color:var(--accent)]';
  const inputError = '!border-[color:var(--signal-error,#FF4D2E)]';
  const fieldError = (field: string) => `${field}-error`;
  const errorMessage = (label: string) => `${label}: ${t('contact.form.error')}`;

  return (
    <section id="contact" className="bg-ink text-paper py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">05 · {t('contact.label')}</div>
            </div>
            <div>
              <h2>
                {t('contact.title')}<br/>
                <span className="text-paper/50">{t('contact.titleHighlight')}</span>
              </h2>
            </div>
          </div>
        </MotionSection>

        <motion.div
          className="grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left column: address card */}
          <motion.div variants={cardEntrance}>
            <div className="mono-tag text-paper/45 mb-6">05.1 · BRIEFING</div>
            <p className="text-paper/80 text-[16px] leading-[1.55] mb-10">
              {t('contact.info.description')}
            </p>

            <div className="space-y-6 rule-top pt-6">
              <div>
                <div className="mono-tag text-paper/45 mb-1.5">{t('contact.info.address.title')}</div>
                <p className="text-paper/85 text-[15px] leading-[1.5]">
                  {t('contact.info.address.line1')}<br />
                  {t('contact.info.address.line2')}
                </p>
              </div>

              <div>
                <div className="mono-tag text-paper/45 mb-1.5">{t('contact.info.phone.title')}</div>
                <a href="tel:+4917631524448" className="text-paper/85 hover:text-[color:var(--accent)] text-[15px] transition-colors">
                  +49 176 31524448
                </a>
              </div>

              <div>
                <div className="mono-tag text-paper/45 mb-1.5">{t('contact.info.email.title')}</div>
                <a href="mailto:info@hmr-nexus.com" className="text-paper/85 hover:text-[color:var(--accent)] text-[15px] transition-colors">
                  info@hmr-nexus.com
                </a>
              </div>

              <div className="rule-top pt-5">
                <div className="mono-tag text-paper/45 mb-1.5">STATUS</div>
                <div className="flex items-center gap-2 text-paper/85 text-[14px]">
                  <span className="dot-accent animate-pulse-laser" />
                  Accepting briefings · Q2 2026
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column: form */}
          <motion.div variants={cardEntrance}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
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

              {/* Names */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="firstName" className="mono-tag text-paper/50 block mb-2">
                    {t('contact.form.firstName')} *
                  </label>
                  <input
                    id="firstName" type="text" name="firstName" autoComplete="given-name"
                    placeholder="Max" required minLength={2} maxLength={50}
                    aria-invalid={localErrors.firstName || undefined}
                    aria-describedby={localErrors.firstName ? fieldError('firstName') : undefined}
                    className={`${inputBase} ${localErrors.firstName ? inputError : ''}`}
                  />
                  {localErrors.firstName && (
                    <p id={fieldError('firstName')} className="sr-only">
                      {errorMessage(t('contact.form.firstName'))}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="mono-tag text-paper/50 block mb-2">
                    {t('contact.form.lastName')} *
                  </label>
                  <input
                    id="lastName" type="text" name="lastName" autoComplete="family-name"
                    placeholder="Mustermann" required minLength={2} maxLength={50}
                    aria-invalid={localErrors.lastName || undefined}
                    aria-describedby={localErrors.lastName ? fieldError('lastName') : undefined}
                    className={`${inputBase} ${localErrors.lastName ? inputError : ''}`}
                  />
                  {localErrors.lastName && (
                    <p id={fieldError('lastName')} className="sr-only">
                      {errorMessage(t('contact.form.lastName'))}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="email" className="mono-tag text-paper/50 block mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    id="email" type="email" name="email" autoComplete="email" spellCheck={false}
                    placeholder="max@firma.de" required maxLength={100}
                    aria-invalid={localErrors.email || undefined}
                    aria-describedby={localErrors.email ? fieldError('email') : undefined}
                    className={`${inputBase} ${localErrors.email ? inputError : ''}`}
                  />
                  {localErrors.email && (
                    <p id={fieldError('email')} className="sr-only">
                      {errorMessage(t('contact.form.email'))}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="mono-tag text-paper/50 block mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    id="phone" type="tel" name="phone" autoComplete="tel"
                    placeholder="+49" maxLength={20} className={inputBase}
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="mono-tag text-paper/50 block mb-2">
                  {t('contact.form.projectType')} *
                </label>
                <select
                  id="projectType" name="projectType" defaultValue={preselectedType || ''} required
                  aria-invalid={localErrors.projectType || undefined}
                  aria-describedby={localErrors.projectType ? fieldError('projectType') : undefined}
                  className={`${inputBase} bg-transparent cursor-pointer appearance-none ${localErrors.projectType ? inputError : ''}`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239A9A94'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                    backgroundSize: '16px',
                  }}
                >
                  <option value="" className="bg-ink">{t('contact.form.selectType')}</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value} className="bg-ink">
                      {type.label}
                    </option>
                  ))}
                </select>
                {localErrors.projectType && (
                  <p id={fieldError('projectType')} className="sr-only">
                    {errorMessage(t('contact.form.projectType'))}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mono-tag text-paper/50 block mb-2">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  placeholder={`${t('contact.form.message')}…`}
                  required minLength={10} maxLength={1000}
                  aria-invalid={localErrors.message || undefined}
                  aria-describedby={localErrors.message ? fieldError('message') : undefined}
                  onChange={(e) => {
                    if (checkSpamPatterns(e.target.value)) {
                      e.target.style.borderColor = '#FF4D2E';
                    }
                  }}
                  className={`w-full bg-transparent text-paper font-sans text-[15px] py-3 px-3 outline-none placeholder:text-paper/35 transition-colors duration-200 focus:border-[color:var(--accent)] resize-y min-h-[120px] ${localErrors.message ? inputError : ''}`}
                  style={{ border: '1px solid var(--rule-strong)' }}
                />
                {localErrors.message && (
                  <p id={fieldError('message')} className="sr-only">
                    {errorMessage(t('contact.form.message'))}
                  </p>
                )}
              </div>

              {/* Status Messages — inline, mono */}
              <div aria-live="polite" className="min-h-[20px]">
                {formspreeState.succeeded && (
                  <p className="mono-tag text-[color:var(--accent)]">
                    [SENT] {t('contact.form.success')}
                  </p>
                )}
                {formspreeState.errors && (
                  <p className="mono-tag text-[#FF4D2E]">
                    [ERROR] {t('contact.form.error')}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formspreeState.submitting || !!honeypot}
                className="inline-flex items-center gap-3 px-6 py-4 mono-tag bg-laser text-ink hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                <span className="dot-accent" style={{ background: 'var(--ink)' }} />
                {formspreeState.submitting
                  ? <span>{t('contact.form.sending')}...</span>
                  : <>
                      {t('contact.form.submit')}  →
                    </>
                }
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
