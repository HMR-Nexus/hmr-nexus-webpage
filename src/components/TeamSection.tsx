import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface TeamMember {
  key: 'ceo' | 'cto';
}

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
          className="grid lg:grid-cols-2"
          style={{ border: '1px solid var(--rule)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {team.map((member, idx) => {
            const focus = t(`teamSection.members.${member.key}.focus`, { returnObjects: true }) as string[];

            return (
              <motion.div
                key={member.key}
                variants={cardEntrance}
                className="p-8 md:p-10 flex flex-col min-h-[430px]"
                style={{ borderLeft: idx === 0 ? 'none' : '1px solid var(--rule)' }}
              >
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <div className="mono-tag text-paper/45 mb-3">05.{idx + 1} · {t(`teamSection.members.${member.key}.label`)}</div>
                    <h3 className="font-display text-paper" style={{ fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 0.92, letterSpacing: '-0.035em', fontWeight: 400 }}>
                      {t(`teamSection.members.${member.key}.name`)}
                    </h3>
                  </div>
                  <div className="mono-tag text-paper/50 text-right whitespace-nowrap">
                    {t(`teamSection.members.${member.key}.location`)}
                  </div>
                </div>

                <div className="rule-top pt-6">
                  <div className="mono-tag text-[color:var(--accent)] mb-3">{t(`teamSection.members.${member.key}.role`)}</div>
                  <p className="text-paper/75 text-[15px] leading-[1.65] max-w-[62ch]">
                    {t(`teamSection.members.${member.key}.bio`)}
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <div className="mono-tag text-paper/40 mb-3">{t('teamSection.focusLabel')}</div>
                  <div className="grid gap-2">
                    {Array.isArray(focus) && focus.map((item) => (
                      <div key={item} className="flex items-start gap-3 border border-paper/10 px-3 py-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 bg-[color:var(--accent)]" />
                        <span className="text-paper/75 text-[13px] leading-[1.45]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
