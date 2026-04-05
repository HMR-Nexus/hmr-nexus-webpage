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
    <section className="py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header — left aligned */}
        <MotionSection className="mb-20 md:mb-28">
          <span className="nothing-label block mb-4">{t('teamSection.label')}</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-nd-text-display leading-[1.05]">
            {t('teamSection.title')}{' '}
            <span className="text-nd-text-secondary">{t('teamSection.titleHighlight')}</span>
          </h2>
          <p className="text-nd-text-secondary max-w-xl mt-4">
            {t('teamSection.description')}
          </p>
        </MotionSection>

        {/* Team — horizontal cards with big initials */}
        <motion.div
          className="grid md:grid-cols-3 gap-px bg-nd-border rounded-lg overflow-hidden"
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
                className="bg-nd-black p-8 md:p-10"
              >
                {/* Big initials — the "one moment of surprise" */}
                <div className="nothing-data text-6xl md:text-7xl mb-6 text-nd-text-display opacity-20">
                  {initials}
                </div>

                {/* Info */}
                <h3 className="text-lg font-medium text-nd-text-display mb-1">{name}</h3>
                <p className="nothing-label mb-3">
                  {t(`teamSection.members.${member.key}.role`)}
                </p>

                <div className="flex items-center gap-1.5 text-nd-text-disabled text-xs mb-6">
                  <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{t(`teamSection.members.${member.key}.location`)}</span>
                </div>

                {/* Bio */}
                <p className="text-nd-text-secondary text-sm mb-6 leading-relaxed">
                  {t(`teamSection.members.${member.key}.bio`)}
                </p>

                {/* Experience */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(t(`teamSection.members.${member.key}.experience`, { returnObjects: true })) ? t(`teamSection.members.${member.key}.experience`, { returnObjects: true }) as string[] : []).map((exp, i) => (
                    <span key={i} className="font-mono text-[10px] uppercase tracking-[0.06em] text-nd-text-disabled px-2 py-0.5 border border-nd-border rounded-sm">
                      {exp}
                    </span>
                  ))}
                </div>

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
