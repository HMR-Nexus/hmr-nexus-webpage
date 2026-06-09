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
  const { i18n, t } = useTranslation();
  const lang = i18n.resolvedLanguage ?? i18n.language;

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
          aria-label={page === 'imprint' ? t('nexus.home.footer.legal.imprint') : page === 'privacy' ? t('nexus.home.footer.legal.privacy') : t('nexus.home.footer.legal.terms')}
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
              aria-label={t('nexus.legal.close')}
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
              {t('nexus.legal.lastUpdated')}
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
        Riethkamp 1E<br />
        29229 Celle, Deutschland
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: +49 176 31524448<br />
        E-Mail: info@hmr-nexus.com
      </p>
      <h2>Vertretungsberechtigte Person</h2>
      <p>Geschäftsführerin: Isabelle Horstmann</p>
      <h2>Registereintrag</h2>
      <p>
        Handelsregister: Amtsgericht Lüneburg{/* TODO: Amtsgericht Lüneburg — verify this is correct for GmbH seated in Celle (Niedersachsen) before publishing */}<br />
        Registernummer: HRB &lt;PENDIENTE_JARL&gt;{/* TODO: número HRB real */}
      </p>
      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
        DE &lt;PENDIENTE_JARL&gt;{/* TODO: USt-IdNr real */}
      </p>
      <h2>Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV</h2>
      <p>
        HMR Nexus Engineering GmbH<br />
        Riethkamp 1E<br />
        29229 Celle, Deutschland
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
        Riethkamp 1E<br />
        29229 Celle, Germany
      </p>
      <h2>Contact</h2>
      <p>
        Phone: +49 176 31524448<br />
        Email: info@hmr-nexus.com
      </p>
      <h2>Authorized Representative</h2>
      <p>Managing Director: Isabelle Horstmann</p>
      <h2>Commercial Register</h2>
      <p>
        Register Court: Amtsgericht Lüneburg{/* TODO: Amtsgericht Lüneburg — verify this is correct for GmbH seated in Celle (Niedersachsen) before publishing */}<br />
        Register Number: HRB &lt;PENDIENTE_JARL&gt;{/* TODO: número HRB real */}
      </p>
      <h2>VAT ID</h2>
      <p>
        VAT Identification Number pursuant to § 27a of the German VAT Act:<br />
        DE &lt;PENDIENTE_JARL&gt;{/* TODO: USt-IdNr real */}
      </p>
      <h2>Responsible for Content pursuant to § 55 Abs. 2 RStV</h2>
      <p>
        HMR Nexus Engineering GmbH<br />
        Riethkamp 1E<br />
        29229 Celle, Germany
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

  // Default: English
  return (
    <div>
      <h1>Legal Notice</h1>
      <h2>Information pursuant to § 5 TMG</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Riethkamp 1E<br />
        29229 Celle, Germany
      </p>
      <h2>Contact</h2>
      <p>
        Phone: +49 176 31524448<br />
        Email: info@hmr-nexus.com
      </p>
      <h2>Authorized Representative</h2>
      <p>Managing Director: Isabelle Horstmann</p>
      <h2>Commercial Register</h2>
      <p>
        Register Court: Amtsgericht Lüneburg{/* TODO: Amtsgericht Lüneburg — verify this is correct for GmbH seated in Celle (Niedersachsen) before publishing */}<br />
        Register Number: HRB &lt;PENDIENTE_JARL&gt;{/* TODO: número HRB real */}
      </p>
      <h2>VAT ID</h2>
      <p>
        VAT Identification Number pursuant to § 27a of the German VAT Act:<br />
        DE &lt;PENDIENTE_JARL&gt;{/* TODO: USt-IdNr real */}
      </p>
      <h2>Responsible for Content pursuant to § 55 Abs. 2 RStV</h2>
      <p>
        HMR Nexus Engineering GmbH<br />
        Riethkamp 1E<br />
        29229 Celle, Germany
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
}

/* ═══════════════════════════════════════════════════════════════════════
   DATENSCHUTZ / PRIVACY POLICY
   ═══════════════════════════════════════════════════════════════════════ */

function PrivacyContent({ lang }: { lang: string }) {
  if (lang === 'de') return (
    <div>
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Riethkamp 1E<br />
        29229 Celle, Deutschland<br />
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
      <p>Diese Website wird bei Netlify, Inc. gehostet.</p>
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
        Riethkamp 1E<br />
        29229 Celle, Germany<br />
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
      <p>This website is hosted by Netlify, Inc.</p>
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

  // Default: English
  return (
    <div>
      <h1>Privacy Policy</h1>

      <h2>1. Data Controller</h2>
      <p>
        <strong>HMR Nexus Engineering GmbH</strong><br />
        Riethkamp 1E<br />
        29229 Celle, Germany<br />
        Email: info@hmr-nexus.com<br />
        Phone: +49 176 31524448
      </p>

      <h2>2. Data Collection</h2>
      <h3>2.1 Contact Form</h3>
      <p>When you use our contact form, the following data is processed:</p>
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
      <p>This website is hosted by Netlify, Inc.</p>
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
      <p>For inquiries, please contact: <strong>info@hmr-nexus.com</strong></p>

      <h2>6. Right to Complain</h2>
      <p>
        You have the right to lodge a complaint with a data protection supervisory authority
        regarding the processing of your personal data.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AGB / TERMS
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

  // Default: English
  return (
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
}
