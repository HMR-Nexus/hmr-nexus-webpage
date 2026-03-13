import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Shield, Lock } from 'lucide-react';
import { useForm } from '@formspree/react';
import { motion, AnimatePresence } from 'framer-motion';
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

    if (honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const { isValid, errors } = validateForm(formData);
    if (!isValid) {
      setLocalErrors(errors);
      return;
    }

    // Sanitize text fields before submission
    const form = e.currentTarget;
    const textFields = ['firstName', 'lastName', 'message'] as const;
    for (const field of textFields) {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null;
      if (input) input.value = sanitizeInput(input.value);
    }

    await handleFormspreeSubmit(e);
  };

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d8bff] uppercase tracking-widest mb-3">
            <span className="w-2 h-2 bg-[#3d8bff] rounded-full" />
            {t('contact.label')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('contact.title')}{' '}
            <span className="text-[#3d8bff]">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </MotionSection>

        {/* Contact Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Contact Info */}
          <motion.div variants={cardEntrance} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-2">{t('contact.info.title')}</h3>
            <p className="text-[#94a3b8] text-sm mb-6">{t('contact.info.description')}</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#0066ff]/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#00d4ff]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{t('contact.info.address.title')}</h4>
                  <p className="text-[#94a3b8] text-xs">
                    {t('contact.info.address.line1')}<br />
                    {t('contact.info.address.line2')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#0066ff]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#00d4ff]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{t('contact.info.phone.title')}</h4>
                  <p className="text-[#94a3b8] text-xs">+49 176 31524448</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#0066ff]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#00d4ff]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{t('contact.info.email.title')}</h4>
                  <p className="text-[#94a3b8] text-xs">info@hmr-nexus.com</p>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-6 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-[#64748b] text-xs">
                <Shield className="w-4 h-4 text-[#00d4ff]" aria-hidden="true" />
                <span>SSL encryption</span>
              </div>
              <div className="flex items-center gap-2 text-[#64748b] text-xs mt-1">
                <Lock className="w-4 h-4 text-[#a855f7]" aria-hidden="true" />
                <span>Anti-spam protection</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={cardEntrance} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-xs text-[#94a3b8] mb-1.5">{t('contact.form.firstName')} *</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Max…"
                    required
                    minLength={2}
                    maxLength={50}
                    className={`w-full bg-white/[0.03] border ${localErrors.firstName ? 'border-red-500' : 'border-white/[0.08]'} rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus-visible:border-[#0066ff]`}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs text-[#94a3b8] mb-1.5">{t('contact.form.lastName')} *</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Mustermann…"
                    required
                    minLength={2}
                    maxLength={50}
                    className={`w-full bg-white/[0.03] border ${localErrors.lastName ? 'border-red-500' : 'border-white/[0.08]'} rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus-visible:border-[#0066ff]`}
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className="block text-xs text-[#94a3b8] mb-1.5">{t('contact.form.email')} *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="max@firma.de…"
                    required
                    maxLength={100}
                    className={`w-full bg-white/[0.03] border ${localErrors.email ? 'border-red-500' : 'border-white/[0.08]'} rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus-visible:border-[#0066ff]`}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs text-[#94a3b8] mb-1.5">{t('contact.form.phone')}</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+49…"
                    maxLength={20}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus-visible:border-[#0066ff]"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-xs text-[#94a3b8] mb-1.5">{t('contact.form.projectType')} *</label>
                <select
                  id="projectType"
                  name="projectType"
                  defaultValue={preselectedType || ''}
                  required
                  className={`w-full bg-white/[0.03] border ${localErrors.projectType ? 'border-red-500' : 'border-white/[0.08]'} rounded-lg px-3 py-2.5 text-sm text-white bg-[#0a1220] outline-none focus-visible:border-[#0066ff] appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '16px',
                  }}
                >
                  <option value="" className="bg-[#0a1220]">{t('contact.form.selectType')}</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value} className="bg-[#0a1220]">{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs text-[#94a3b8] mb-1.5">{t('contact.form.message')} *</label>
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
                      e.target.style.borderColor = '#ef4444';
                    }
                  }}
                  className={`w-full bg-white/[0.03] border ${localErrors.message ? 'border-red-500' : 'border-white/[0.08]'} rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#475569] outline-none focus-visible:border-[#0066ff] resize-y min-h-[80px]`}
                />
              </div>

              {/* Status Messages */}
              <div aria-live="polite">
                <AnimatePresence>
                  {formspreeState.succeeded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      role="status"
                      className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/30 rounded-lg px-3 py-2"
                    >
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      <span className="text-xs">{t('contact.form.success')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {formspreeState.errors && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      role="alert"
                      className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg px-3 py-2"
                    >
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      <span className="text-xs">{t('contact.form.error')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formspreeState.submitting || !!honeypot}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066ff] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[#0052cc] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {formspreeState.submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
