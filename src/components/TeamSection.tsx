import { useTranslation } from 'react-i18next';
import { Linkedin, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface TeamMember {
  key: string;
  gradient: string;
}

export function TeamSection() {
  const { t } = useTranslation();

  const team: TeamMember[] = [
    { key: 'ceo', gradient: 'from-[#0066ff] to-[#00d4ff]' },
    { key: 'coo', gradient: 'from-[#a855f7] to-[#c084fc]' },
    { key: 'cto', gradient: 'from-[#3d8bff] to-[#0066ff]' },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d8bff] uppercase tracking-widest mb-3">
            <span className="w-2 h-2 bg-[#3d8bff] rounded-full" />
            {t('teamSection.label')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('teamSection.title')}{' '}
            <span className="text-[#3d8bff]">{t('teamSection.titleHighlight')}</span>
          </h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            {t('teamSection.description')}
          </p>
        </MotionSection>

        {/* Team Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto"
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
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-colors"
              >
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4`}>
                    <span className="text-xl font-bold text-white">{initials}</span>
                  </div>
                </motion.div>

                {/* Info */}
                <h3 className="text-lg font-bold mb-1">{name}</h3>
                <p className="text-[#c084fc] text-sm font-medium mb-2">
                  {t(`teamSection.members.${member.key}.role`)}
                </p>

                <div className="flex items-center gap-1 text-[#64748b] text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{t(`teamSection.members.${member.key}.location`)}</span>
                </div>

                {/* Bio */}
                <p className="text-[#94a3b8] text-sm mb-4 leading-relaxed">
                  {t(`teamSection.members.${member.key}.bio`)}
                </p>

                {/* Experience */}
                <ul className="space-y-1.5 mb-4">
                  {(Array.isArray(t(`teamSection.members.${member.key}.experience`, { returnObjects: true })) ? t(`teamSection.members.${member.key}.experience`, { returnObjects: true }) as string[] : []).map((exp, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#94a3b8] text-sm">
                      <span className="w-1 h-1 bg-[#00d4ff] rounded-full" />
                      {exp}
                    </li>
                  ))}
                </ul>

                {/* LinkedIn */}
                <span
                  className="inline-flex items-center gap-2 text-[#3d8bff]/50 text-sm cursor-default"
                  aria-label={`${name} LinkedIn — coming soon`}
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
