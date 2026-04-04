import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type LegalPage = 'imprint' | 'privacy' | 'terms' | null;

interface LegalOverlayProps {
  page: LegalPage;
  onClose: () => void;
}

export function LegalOverlay({ page, onClose }: LegalOverlayProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // Lock body scroll when open
  useEffect(() => {
    if (page) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [page]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={page === 'imprint' ? 'Legal Notice' : page === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/90 overflow-y-auto overscroll-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="relative w-full max-w-3xl mx-4 my-12 bg-nd-surface border border-nd-border-visible rounded-lg p-6 sm:p-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-nd-text-disabled hover:text-nd-text-display transition-colors duration-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="legal-content prose prose-invert prose-sm max-w-none
              [&_h1]:text-2xl [&_h1]:font-light [&_h1]:text-nd-text-display [&_h1]:mb-6
              [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-nd-text-display [&_h2]:mt-8 [&_h2]:mb-3
              [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-nd-text-secondary [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:text-nd-text-secondary [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3
              [&_ul]:text-nd-text-secondary [&_ul]:text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1
              [&_li]:text-nd-text-secondary
              [&_a]:text-nd-interactive [&_a]:underline
              [&_strong]:text-nd-text-display
            ">
              {page === 'imprint' && <ImprintContent lang={lang} />}
              {page === 'privacy' && <PrivacyContent lang={lang} />}
              {page === 'terms' && <TermsContent lang={lang} />}
            </div>

            <p className="mt-8 pt-4 border-t border-nd-border nothing-label">
              {lang === 'es' ? 'Última actualización: Febrero 2026'
                : lang === 'en' ? 'Last updated: February 2026'
                : 'Zuletzt aktualisiert: Februar 2026'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   IMPRESSUM / AVISO LEGAL / IMPRINT
   ═══════════════════════════════════════════════════════════════════════ */

function ImprintContent({ lang }: { lang: string }) {
  if (lang === 'de') return (
    <div>
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Celle, Deutschland<br />
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: +49 176 31524448<br />
        E-Mail: info@hmr-nexus.com
      </p>
      <h2>Vertretungsberechtigt</h2>
      <p>Geschäftsführer: [Name des Geschäftsführers]</p>
      <h2>Registereintrag</h2>
      <p>
        Handelsregister: Amtsgericht Lüneburg<br />
        Registernummer: HRB [Nummer]
      </p>
      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
        DE [Nummer]
      </p>
      <h2>Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV</h2>
      <p>
        HMR Nexus Engineering GmbH<br />
        Celle, Deutschland
      </p>
      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
        Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet,
        an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
        zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>
    </div>
  );

  if (lang === 'en') return (
    <div>
      <h1>Legal Notice</h1>
      <h2>Information pursuant to § 5 TMG</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Celle, Germany<br />
      </p>
      <h2>Contact</h2>
      <p>
        Phone: +49 176 31524448<br />
        Email: info@hmr-nexus.com
      </p>
      <h2>Authorized Representative</h2>
      <p>Managing Director: [Managing Director Name]</p>
      <h2>Commercial Register</h2>
      <p>
        Register Court: Amtsgericht Lüneburg<br />
        Register Number: HRB [Number]
      </p>
      <h2>VAT ID</h2>
      <p>
        VAT Identification Number pursuant to § 27a of the German VAT Act:<br />
        DE [Number]
      </p>
      <h2>Responsible for Content pursuant to § 55 Abs. 2 RStV</h2>
      <p>
        HMR Nexus Engineering GmbH<br />
        Celle, Germany
      </p>
      <h2>EU Dispute Resolution</h2>
      <p>
        The European Commission provides an online dispute resolution (ODR) platform.
        Our email address can be found above. We are neither obligated nor willing to
        participate in dispute resolution proceedings before a consumer arbitration board.
      </p>
      <h2>Liability for Content</h2>
      <p>
        As a service provider, we are responsible for our own content on these pages in accordance
        with general legislation pursuant to § 7 (1) TMG. According to §§ 8–10 TMG, however, we as
        a service provider are not obligated to monitor transmitted or stored third-party information
        or to investigate circumstances that indicate illegal activity.
      </p>
      <h2>Liability for Links</h2>
      <p>
        Our website contains links to external third-party websites over whose content we have no influence.
        Therefore, we cannot accept any liability for this external content. The respective provider or
        operator of the linked pages is always responsible for their content.
      </p>
    </div>
  );

  // Spanish (default)
  return (
    <div>
      <h1>Aviso Legal</h1>
      <h2>Información según § 5 TMG</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Celle, Alemania<br />
      </p>
      <h2>Contacto</h2>
      <p>
        Teléfono: +49 176 31524448<br />
        Correo electrónico: info@hmr-nexus.com
      </p>
      <h2>Representante Autorizado</h2>
      <p>Director General: [Nombre del Director General]</p>
      <h2>Registro Mercantil</h2>
      <p>
        Tribunal de Registro: Amtsgericht Lüneburg<br />
        Número de Registro: HRB [Número]
      </p>
      <h2>Identificación Fiscal</h2>
      <p>
        Número de identificación de IVA según § 27a de la Ley del IVA alemana:<br />
        DE [Número]
      </p>
      <h2>Responsable del Contenido según § 55 Abs. 2 RStV</h2>
      <p>
        HMR Nexus Engineering GmbH<br />
        Celle, Alemania
      </p>
      <h2>Resolución de Disputas de la UE</h2>
      <p>
        La Comisión Europea proporciona una plataforma para la resolución de disputas en línea (ODR).
        Nuestra dirección de correo electrónico se encuentra arriba. No estamos obligados ni dispuestos
        a participar en procedimientos de resolución de disputas ante una junta de arbitraje de consumidores.
      </p>
      <h2>Responsabilidad por el Contenido</h2>
      <p>
        Como proveedor de servicios, somos responsables de nuestro propio contenido en estas páginas de
        acuerdo con la legislación general conforme al § 7 (1) TMG. Sin embargo, según los §§ 8–10 TMG,
        no estamos obligados a supervisar la información de terceros transmitida o almacenada ni a
        investigar circunstancias que indiquen actividad ilegal.
      </p>
      <h2>Responsabilidad por Enlaces</h2>
      <p>
        Nuestro sitio web contiene enlaces a sitios web externos de terceros sobre cuyo contenido no tenemos
        influencia. Por lo tanto, no podemos asumir ninguna responsabilidad por dicho contenido externo.
        El proveedor u operador respectivo de las páginas enlazadas es siempre responsable de su contenido.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   DATENSCHUTZ / POLÍTICA DE PRIVACIDAD / PRIVACY POLICY
   ═══════════════════════════════════════════════════════════════════════ */

function PrivacyContent({ lang }: { lang: string }) {
  if (lang === 'de') return (
    <div>
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Celle, Deutschland<br />
        E-Mail: info@hmr-nexus.com<br />
        Telefon: +49 176 31524448
      </p>

      <h2>2. Erhobene Daten</h2>
      <h3>2.1 Kontaktformular</h3>
      <p>
        Wenn Sie unser Kontaktformular nutzen, werden folgende Daten verarbeitet:
      </p>
      <ul>
        <li>Vor- und Nachname</li>
        <li>E-Mail-Adresse</li>
        <li>Telefonnummer (optional)</li>
        <li>Unternehmen (optional)</li>
        <li>Nachricht</li>
      </ul>
      <p>
        Die Daten werden über den Dienst <strong>Formspree</strong> (Formspree, Inc., USA) verarbeitet.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an der Beantwortung von Anfragen).
      </p>

      <h3>2.2 Server-Logdateien</h3>
      <p>
        Der Hosting-Anbieter erhebt automatisch Informationen in sogenannten Server-Logdateien,
        die Ihr Browser automatisch übermittelt (IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL,
        Uhrzeit der Serveranfrage). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
      </p>

      <h2>3. Cookies</h2>
      <p>
        Diese Website verwendet ausschließlich technisch notwendige Cookies zur Speicherung der
        Spracheinstellung. Es werden keine Tracking- oder Marketing-Cookies eingesetzt.
      </p>

      <h2>4. Drittanbieter-Dienste</h2>
      <h3>4.1 Hosting</h3>
      <p>Diese Website wird bei Hostinger International Ltd. gehostet.</p>
      <h3>4.2 Google Fonts</h3>
      <p>
        Diese Seite nutzt Google Fonts zur einheitlichen Darstellung von Schriftarten.
        Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftarten in Ihren
        Browsercache. Dabei wird eine Verbindung zu Servern von Google hergestellt.
      </p>
      <h3>4.3 Formspree</h3>
      <p>
        Für die Verarbeitung des Kontaktformulars nutzen wir Formspree, Inc.
        Die Daten werden auf Servern in den USA verarbeitet.
      </p>

      <h2>5. Ihre Rechte</h2>
      <p>Sie haben das Recht auf:</p>
      <ul>
        <li><strong>Auskunft</strong> über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
        <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
        <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
        <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Bei Anliegen wenden Sie sich bitte an: <strong>info@hmr-nexus.com</strong>
      </p>

      <h2>6. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
        Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
      </p>
    </div>
  );

  if (lang === 'en') return (
    <div>
      <h1>Privacy Policy</h1>

      <h2>1. Data Controller</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Celle, Germany<br />
        Email: info@hmr-nexus.com<br />
        Phone: +49 176 31524448
      </p>

      <h2>2. Data Collection</h2>
      <h3>2.1 Contact Form</h3>
      <p>
        When you use our contact form, the following data is processed:
      </p>
      <ul>
        <li>First and last name</li>
        <li>Email address</li>
        <li>Phone number (optional)</li>
        <li>Company (optional)</li>
        <li>Message</li>
      </ul>
      <p>
        Data is processed through <strong>Formspree</strong> (Formspree, Inc., USA).
        Legal basis: Art. 6(1)(b) GDPR (pre-contractual measures) and Art. 6(1)(f) GDPR
        (legitimate interest in responding to inquiries).
      </p>

      <h3>2.2 Server Log Files</h3>
      <p>
        The hosting provider automatically collects information in server log files that your browser
        transmits (IP address, browser type, operating system, referrer URL, time of server request).
        This data is not combined with other data sources.
      </p>

      <h2>3. Cookies</h2>
      <p>
        This website only uses technically necessary cookies to store your language preference.
        No tracking or marketing cookies are used.
      </p>

      <h2>4. Third-Party Services</h2>
      <h3>4.1 Hosting</h3>
      <p>This website is hosted by Hostinger International Ltd.</p>
      <h3>4.2 Google Fonts</h3>
      <p>
        This site uses Google Fonts for uniform font display.
        When you access a page, your browser loads the required fonts into its cache,
        establishing a connection to Google servers.
      </p>
      <h3>4.3 Formspree</h3>
      <p>
        We use Formspree, Inc. to process the contact form.
        Data is processed on servers in the USA.
      </p>

      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> your stored personal data (Art. 15 GDPR)</li>
        <li><strong>Rectification</strong> of inaccurate data (Art. 16 GDPR)</li>
        <li><strong>Erasure</strong> of your data (Art. 17 GDPR)</li>
        <li><strong>Restriction</strong> of processing (Art. 18 GDPR)</li>
        <li><strong>Data portability</strong> (Art. 20 GDPR)</li>
        <li><strong>Object</strong> to processing (Art. 21 GDPR)</li>
      </ul>
      <p>
        For inquiries, please contact: <strong>info@hmr-nexus.com</strong>
      </p>

      <h2>6. Right to Complain</h2>
      <p>
        You have the right to lodge a complaint with a data protection supervisory authority
        regarding the processing of your personal data.
      </p>
    </div>
  );

  // Spanish (default)
  return (
    <div>
      <h1>Política de Privacidad</h1>

      <h2>1. Responsable del Tratamiento</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Celle, Alemania<br />
        Correo electrónico: info@hmr-nexus.com<br />
        Teléfono: +49 176 31524448
      </p>

      <h2>2. Datos Recopilados</h2>
      <h3>2.1 Formulario de Contacto</h3>
      <p>
        Cuando utiliza nuestro formulario de contacto, se procesan los siguientes datos:
      </p>
      <ul>
        <li>Nombre y apellido</li>
        <li>Dirección de correo electrónico</li>
        <li>Número de teléfono (opcional)</li>
        <li>Empresa (opcional)</li>
        <li>Mensaje</li>
      </ul>
      <p>
        Los datos se procesan a través de <strong>Formspree</strong> (Formspree, Inc., EE.UU.).
        Base legal: Art. 6(1)(b) RGPD (medidas precontractuales) y Art. 6(1)(f) RGPD
        (interés legítimo en responder consultas).
      </p>

      <h3>2.2 Archivos de Registro del Servidor</h3>
      <p>
        El proveedor de hosting recopila automáticamente información en los archivos de registro del servidor
        que su navegador transmite (dirección IP, tipo de navegador, sistema operativo, URL de referencia,
        hora de la solicitud). Estos datos no se combinan con otras fuentes de datos.
      </p>

      <h2>3. Cookies</h2>
      <p>
        Este sitio web solo utiliza cookies técnicamente necesarias para almacenar la preferencia de idioma.
        No se utilizan cookies de seguimiento ni de marketing.
      </p>

      <h2>4. Servicios de Terceros</h2>
      <h3>4.1 Hosting</h3>
      <p>Este sitio web está alojado en Hostinger International Ltd.</p>
      <h3>4.2 Google Fonts</h3>
      <p>
        Este sitio utiliza Google Fonts para una visualización uniforme de fuentes tipográficas.
        Al acceder a una página, su navegador carga las fuentes necesarias en su caché,
        estableciendo una conexión con los servidores de Google.
      </p>
      <h3>4.3 Formspree</h3>
      <p>
        Utilizamos Formspree, Inc. para procesar el formulario de contacto.
        Los datos se procesan en servidores en los EE.UU.
      </p>

      <h2>5. Sus Derechos</h2>
      <p>Usted tiene derecho a:</p>
      <ul>
        <li><strong>Acceso</strong> a sus datos personales almacenados (Art. 15 RGPD)</li>
        <li><strong>Rectificación</strong> de datos inexactos (Art. 16 RGPD)</li>
        <li><strong>Supresión</strong> de sus datos (Art. 17 RGPD)</li>
        <li><strong>Limitación</strong> del tratamiento (Art. 18 RGPD)</li>
        <li><strong>Portabilidad</strong> de datos (Art. 20 RGPD)</li>
        <li><strong>Oposición</strong> al tratamiento (Art. 21 RGPD)</li>
      </ul>
      <p>
        Para consultas, por favor contacte a: <strong>info@hmr-nexus.com</strong>
      </p>

      <h2>6. Derecho de Reclamación</h2>
      <p>
        Usted tiene derecho a presentar una reclamación ante una autoridad de supervisión
        de protección de datos sobre el tratamiento de sus datos personales.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AGB / TÉRMINOS / TERMS
   ═══════════════════════════════════════════════════════════════════════ */

function TermsContent({ lang }: { lang: string }) {
  if (lang === 'de') return (
    <div>
      <h1>Allgemeine Geschäftsbedingungen</h1>

      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Website von
        HMR Nexus Engineering GmbH sowie für alle Geschäftsbeziehungen zwischen der
        HMR Nexus Engineering GmbH und ihren Kunden.
      </p>

      <h2>2. Leistungsbeschreibung</h2>
      <p>
        HMR Nexus Engineering GmbH bietet Dienstleistungen in den Bereichen
        Glasfaser-Infrastruktur (NE3/NE4), Telekommunikationsplanung und
        individuelle Softwareentwicklung an. Der genaue Umfang der Leistungen
        wird im jeweiligen Einzelvertrag festgelegt.
      </p>

      <h2>3. Vertragsschluss</h2>
      <p>
        Die Darstellung unserer Leistungen auf der Website stellt kein rechtsverbindliches
        Angebot dar. Ein Vertrag kommt erst durch schriftliche Auftragsbestätigung oder
        Unterzeichnung eines Einzelvertrages zustande.
      </p>

      <h2>4. Geistiges Eigentum</h2>
      <p>
        Alle Inhalte dieser Website (Texte, Grafiken, Logos, Software) sind geistiges Eigentum
        der HMR Nexus Engineering GmbH und urheberrechtlich geschützt. Eine Vervielfältigung
        oder Verwendung bedarf der vorherigen schriftlichen Zustimmung.
      </p>

      <h2>5. Haftungsbeschränkung</h2>
      <p>
        HMR Nexus Engineering GmbH haftet nur für Schäden, die auf vorsätzlichem oder
        grob fahrlässigem Verhalten beruhen. Die Haftung für leichte Fahrlässigkeit ist
        ausgeschlossen, soweit keine wesentlichen Vertragspflichten betroffen sind.
        Die Haftung ist auf den vorhersehbaren, vertragstypischen Schaden begrenzt.
      </p>

      <h2>6. Vertraulichkeit</h2>
      <p>
        Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen
        vertraulichen Informationen geheim zu halten und nicht an Dritte weiterzugeben.
      </p>

      <h2>7. Anwendbares Recht und Gerichtsstand</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle
        Streitigkeiten ist Celle, Deutschland, soweit gesetzlich zulässig.
      </p>

      <h2>8. Salvatorische Klausel</h2>
      <p>
        Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit
        der übrigen Bestimmungen davon unberührt. Die unwirksame Bestimmung wird durch eine
        wirksame ersetzt, die dem wirtschaftlichen Zweck am nächsten kommt.
      </p>
    </div>
  );

  if (lang === 'en') return (
    <div>
      <h1>Terms and Conditions</h1>

      <h2>1. Scope</h2>
      <p>
        These Terms and Conditions apply to the use of the website of HMR Nexus Engineering GmbH
        as well as all business relationships between HMR Nexus Engineering GmbH and its clients.
      </p>

      <h2>2. Description of Services</h2>
      <p>
        HMR Nexus Engineering GmbH provides services in fiber optic infrastructure (NE3/NE4),
        telecommunications planning, and custom software development. The specific scope of
        services is defined in the respective individual contract.
      </p>

      <h2>3. Contract Formation</h2>
      <p>
        The presentation of our services on the website does not constitute a legally binding offer.
        A contract is only concluded upon written order confirmation or signing of an individual contract.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All content on this website (texts, graphics, logos, software) is the intellectual property
        of HMR Nexus Engineering GmbH and is protected by copyright law. Reproduction or use
        requires prior written consent.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        HMR Nexus Engineering GmbH is only liable for damages based on intentional or grossly
        negligent conduct. Liability for slight negligence is excluded unless essential contractual
        obligations are affected. Liability is limited to foreseeable, contract-typical damages.
      </p>

      <h2>6. Confidentiality</h2>
      <p>
        Both parties agree to keep all confidential information received during the collaboration
        secret and not to disclose it to third parties.
      </p>

      <h2>7. Applicable Law and Jurisdiction</h2>
      <p>
        The laws of the Federal Republic of Germany apply. The place of jurisdiction for all
        disputes is Celle, Germany, to the extent permitted by law.
      </p>

      <h2>8. Severability Clause</h2>
      <p>
        Should any provision of these terms be or become invalid, the validity of the remaining
        provisions shall not be affected. The invalid provision shall be replaced by a valid one
        that comes closest to the economic purpose.
      </p>
    </div>
  );

  // Spanish (default)
  return (
    <div>
      <h1>Términos y Condiciones</h1>

      <h2>1. Alcance</h2>
      <p>
        Estos Términos y Condiciones se aplican al uso del sitio web de HMR Nexus Engineering GmbH
        así como a todas las relaciones comerciales entre HMR Nexus Engineering GmbH y sus clientes.
      </p>

      <h2>2. Descripción de Servicios</h2>
      <p>
        HMR Nexus Engineering GmbH ofrece servicios en infraestructura de fibra óptica (NE3/NE4),
        planificación de telecomunicaciones y desarrollo de software a medida. El alcance específico
        de los servicios se define en el contrato individual correspondiente.
      </p>

      <h2>3. Formación del Contrato</h2>
      <p>
        La presentación de nuestros servicios en el sitio web no constituye una oferta legalmente
        vinculante. Un contrato solo se celebra mediante confirmación escrita del pedido o firma
        de un contrato individual.
      </p>

      <h2>4. Propiedad Intelectual</h2>
      <p>
        Todo el contenido de este sitio web (textos, gráficos, logotipos, software) es propiedad
        intelectual de HMR Nexus Engineering GmbH y está protegido por la ley de derechos de autor.
        Su reproducción o uso requiere consentimiento previo por escrito.
      </p>

      <h2>5. Limitación de Responsabilidad</h2>
      <p>
        HMR Nexus Engineering GmbH solo es responsable de los daños basados en conducta
        intencional o gravemente negligente. La responsabilidad por negligencia leve queda
        excluida a menos que se vean afectadas obligaciones contractuales esenciales.
        La responsabilidad se limita a los daños previsibles y típicos del contrato.
      </p>

      <h2>6. Confidencialidad</h2>
      <p>
        Ambas partes se comprometen a mantener en secreto toda la información confidencial
        recibida durante la colaboración y a no divulgarla a terceros.
      </p>

      <h2>7. Ley Aplicable y Jurisdicción</h2>
      <p>
        Se aplican las leyes de la República Federal de Alemania. El lugar de jurisdicción para
        todas las disputas es Celle, Alemania, en la medida permitida por la ley.
      </p>

      <h2>8. Cláusula de Salvaguardia</h2>
      <p>
        Si alguna disposición de estos términos fuera o llegara a ser inválida, la validez de las
        disposiciones restantes no se verá afectada. La disposición inválida será reemplazada por
        una válida que se acerque más al propósito económico.
      </p>
    </div>
  );
}
