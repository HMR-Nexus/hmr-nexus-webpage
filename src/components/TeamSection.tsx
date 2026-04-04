import { useTranslation } from 'react-i18next';
import { Linkedin, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface TeamMember {
  key: string;
}

export function TeamSection() {
  const { t } = useTranslation();

  const team: TeamMember[] = [
    { key: 'ceo' },
    { key: 'coo' },
    { key: 'cto' },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="text-center mb-10">
          <span className="nothing-label block mb-3">{t('teamSection.label')}</span>
          <h2 className="text-3xl md:text-4xl font-light text-nd-text-display mb-3">
            {t('teamSection.title')}{' '}
            <span className="text-nd-text-secondary">{t('teamSection.titleHighlight')}</span>
          </h2>
          <p className="text-nd-text-secondary max-w-xl mx-auto">
            {t('teamSection.description')}
          </p>
        </MotionSection>

        {/* Team Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-px bg-nd-border max-w-4xl mx-auto rounded-lg overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {team.map((member) => {
            const name = t(`teamSection.members.${member.key}.name`);
            const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);

            return (
              <motion.div
                key={member.key}
                variants={cardEntrance}
                className="bg-nd-surface p-6"
              >
                {/* Avatar — Nothing: monochrome square with initials */}
                <div className="w-14 h-14 rounded-sm bg-nd-surface-raised border border-nd-border-visible flex items-center justify-center mb-4">
                  <span className="font-mono text-lg text-nd-text-display">{initials}</span>
                </div>

                {/* Info */}
                <h3 className="text-base font-medium text-nd-text-display mb-1">{name}</h3>
                <p className="nothing-label mb-2">
                  {t(`teamSection.members.${member.key}.role`)}
                </p>

                <div className="flex items-center gap-1.5 text-nd-text-disabled text-xs mb-4">
                  <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{t(`teamSection.members.${member.key}.location`)}</span>
                </div>

                {/* Bio */}
                <p className="text-nd-text-secondary text-sm mb-4 leading-relaxed">
                  {t(`teamSection.members.${member.key}.bio`)}
                </p>

                {/* Experience */}
                <ul className="space-y-1.5 mb-4">
                  {(Array.isArray(t(`teamSection.members.${member.key}.experience`, { returnObjects: true })) ? t(`teamSection.members.${member.key}.experience`, { returnObjects: true }) as string[] : []).map((exp, i) => (
                    <li key={i} className="flex items-center gap-2 text-nd-text-secondary text-sm">
                      <span className="w-1 h-1 bg-nd-text-disabled rounded-full" />
                      {exp}
                    </li>
                  ))}
                </ul>

                {/* LinkedIn */}
                <span
                  className="inline-flex items-center gap-1.5 nothing-label text-nd-text-disabled cursor-default"
                  aria-label={`${name} LinkedIn — coming soon`}
                >
                  <Linkedin className="w-3.5 h-3.5" strokeWidth={1.5} />
                  LINKEDIN
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
