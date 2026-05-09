import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface TeamMember {
  key: string;
}

/**
 * NEXUS Team — Field-tested. Editorial portraits with mono metadata.
 */
export function TeamSection() {
  const { t } = useTranslation();

  const team: TeamMember[] = [
    { key: 'ceo' },
    { key: 'cto' },
  ];

  return (
    <section className="bg-ink text-paper py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">05 · {t('teamSection.label')}</div>
            </div>
            <div>
              <h2>
                {t('teamSection.title')}<br/>
                <span className="text-paper/50">{t('teamSection.titleHighlight')}</span>
              </h2>
              <p style={{ marginTop: 24 }}>{t('teamSection.description')}</p>
            </div>
          </div>
        </MotionSection>

        <motion.div
          className="grid md:grid-cols-2"
          style={{ border: '1px solid var(--rule)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {team.map((member, idx) => {
            const name = t(`teamSection.members.${member.key}.name`);
            const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);
            const experience = Array.isArray(t(`teamSection.members.${member.key}.experience`, { returnObjects: true }))
              ? t(`teamSection.members.${member.key}.experience`, { returnObjects: true }) as string[]
              : [];

            return (
              <motion.div
                key={member.key}
                variants={cardEntrance}
                className="p-8 md:p-10 flex flex-col"
                style={{ borderLeft: idx === 0 ? 'none' : '1px solid var(--rule)' }}
              >
                <div className="mono-tag text-paper/45 mb-6">
                  05.{idx + 1} · {t(`teamSection.members.${member.key}.role`)}
                </div>

                {/* Initials as display type — huge, quiet */}
                <div
                  className="font-display text-[color:var(--accent)]"
                  style={{ fontSize: 'clamp(72px, 8vw, 120px)', lineHeight: 0.85, letterSpacing: '-0.055em', fontWeight: 300 }}
                >
                  {initials}
                </div>

                <div className="mt-6 rule-top pt-5">
                  <h3
                    className="font-display text-paper mb-1"
                    style={{ fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 500 }}
                  >
                    {name}
                  </h3>
                  <div className="mono-tag text-paper/55">
                    {t(`teamSection.members.${member.key}.location`)}
                  </div>
                </div>

                <p className="text-paper/70 text-[14px] leading-[1.55] mt-5 mb-6">
                  {t(`teamSection.members.${member.key}.bio`)}
                </p>

                {experience.length > 0 && (
                  <div className="rule-top pt-5 mt-auto">
                    <div className="mono-tag text-paper/40 mb-3">EXPERIENCE</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {experience.map((exp, i) => (
                        <span key={i} className="mono-tag text-paper/75">{exp}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
