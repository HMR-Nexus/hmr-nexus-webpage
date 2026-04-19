// Configuración de Formspree
// Reemplazar con tu Form ID de Formspree
// Obtener en: https://formspree.io/forms

export const FORMSPREE_CONFIG = {
  // Form ID de Formspree (reemplazar con el tuyo)
  formId: 'mkokzwjb',
  
  // URL del formulario
  formUrl: 'https://formspree.io/f/mkokzwjb',
  
  // Configuración de seguridad
  security: {
    // Habilitar honeypot (protección anti-bot)
    honeypotEnabled: true,
    honeypotField: 'website',
    
    // Validación de campos
    validation: {
      minNameLength: 2,
      maxNameLength: 50,
      maxEmailLength: 100,
      minMessageLength: 10,
      maxMessageLength: 1000,
    },
    
    // Patrones de spam a detectar
    spamPatterns: [
      /http[s]?:\/\//i,
      /www\./i,
      / viagra | cialis | casino /i,
      /<script>/i,
      /on\w+=/i,
    ],
  },
  
  // Configuración de notificaciones
  notifications: {
    // Email donde llegarán las notificaciones
    adminEmail: 'info@hmr-nexus.com',
    
    // Auto-responder al usuario
    autoResponder: {
      enabled: true,
      subject: {
        es: 'Hemos recibido tu mensaje - HMR Nexus',
        en: 'We have received your message - HMR Nexus',
        de: 'Wir haben Ihre Nachricht erhalten - HMR Nexus',
      },
    },
  },
};

// Validación de email
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Sanitización de inputs (anti-XSS)
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Verificar si el texto contiene patrones de spam
export const checkSpamPatterns = (text: string): boolean => {
  return FORMSPREE_CONFIG.security.spamPatterns.some(pattern => 
    pattern.test(text)
  );
};

// Validar formulario completo
export const validateForm = (
  formData: FormData
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const projectType = formData.get('projectType') as string;
  
  // Validar nombre
  if (!firstName || firstName.length < FORMSPREE_CONFIG.security.validation.minNameLength) {
    errors.firstName = 'Nombre muy corto';
  }
  if (firstName && firstName.length > FORMSPREE_CONFIG.security.validation.maxNameLength) {
    errors.firstName = 'Nombre muy largo';
  }
  
  // Validar apellido
  if (!lastName || lastName.length < FORMSPREE_CONFIG.security.validation.minNameLength) {
    errors.lastName = 'Apellido muy corto';
  }
  
  // Validar email
  if (!email || !validateEmail(email)) {
    errors.email = 'Email inválido';
  }
  if (email && email.length > FORMSPREE_CONFIG.security.validation.maxEmailLength) {
    errors.email = 'Email muy largo';
  }
  
  // Validar tipo de proyecto
  if (!projectType) {
    errors.projectType = 'Selecciona un tipo de proyecto';
  }
  
  // Validar mensaje
  if (!message || message.length < FORMSPREE_CONFIG.security.validation.minMessageLength) {
    errors.message = 'Mensaje muy corto (mínimo 10 caracteres)';
  }
  if (message && message.length > FORMSPREE_CONFIG.security.validation.maxMessageLength) {
    errors.message = 'Mensaje muy largo (máximo 1000 caracteres)';
  }
  if (message && checkSpamPatterns(message)) {
    errors.message = 'El mensaje contiene contenido no permitido';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
