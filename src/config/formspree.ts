// Formspree configuration
// Form ID obtained from: https://formspree.io/forms

export const FORMSPREE_CONFIG = {
  // Formspree form ID
  formId: 'mkokzwjb',

  // Form endpoint URL
  formUrl: 'https://formspree.io/f/mkokzwjb',

  // Security configuration
  security: {
    // Enable honeypot field (anti-bot protection)
    honeypotEnabled: true,
    honeypotField: 'website',

    // Field validation limits
    validation: {
      minNameLength: 2,
      maxNameLength: 50,
      maxEmailLength: 100,
      minMessageLength: 10,
      maxMessageLength: 1000,
    },

    // Spam patterns to detect
    spamPatterns: [
      /http[s]?:\/\//i,
      /www\./i,
      / viagra | cialis | casino /i,
      /<script>/i,
      /on\w+=/i,
    ],
  },

  // Notification configuration
  notifications: {
    // Admin email for incoming notifications
    adminEmail: 'info@hmr-nexus.com',

    // Auto-responder to sender
    autoResponder: {
      enabled: true,
      subject: {
        en: 'We have received your message - HMR Nexus',
        de: 'Wir haben Ihre Nachricht erhalten - HMR Nexus',
      },
    },
  },
};

// Email format validation
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Input sanitization (anti-XSS)
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Check whether text contains spam patterns
export const checkSpamPatterns = (text: string): boolean => {
  return FORMSPREE_CONFIG.security.spamPatterns.some(pattern =>
    pattern.test(text)
  );
};
