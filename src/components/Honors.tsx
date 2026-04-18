'use client'

import { Award, Flag, Medal, ShieldCheck, ExternalLink } from 'lucide-react'
import styles from './Honors.module.css'
import { ScrollReveal } from './ScrollReveal'
import { useLanguage } from '@/context/LanguageContext'

export const Honors = () => {
  const { t } = useLanguage()

  const honors = [
    {
      title: t('honorOneTitle'),
      description: t('honorOneDesc'),
      icon: <Award size={26} />,
      link: '/certificates/itorero.pdf',
    },
    {
      title: t('honorTwoTitle'),
      description: t('honorTwoDesc'),
      icon: <Flag size={26} />,
      link: '/certificates/beyond-success.pdf',
    },
    {
      title: t('honorThreeTitle'),
      description: t('honorThreeDesc'),
      icon: <ShieldCheck size={26} />,
      link: '/certificates/digital-skills.pdf',
    },
    {
      title: t('honorFourTitle'),
      description: t('honorFourDesc'),
      icon: <Medal size={26} />,
      link: '/certificates/english-proficiency.pdf',
    },
  ]

  return (
    <section className={styles.honors}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>{t('honorsTitle')}</h2>
            <p className={styles.subtitle}>{t('honorsSubtitle')}</p>
          </div>
        </ScrollReveal>

        <div className={styles.timeline}>
          {honors.map((honor, index) => (
            <ScrollReveal key={honor.title} delay={index * 0.12} direction={index % 2 === 0 ? 'right' : 'left'}>
              <article className={styles.item}>
                <div className={styles.marker}>
                  <div className={styles.icon}>{honor.icon}</div>
                </div>
                <div className={styles.content}>
                  <span className={styles.eyebrow}>{t('recognitionLabel')}</span>
                  <h3 className={styles.title}>{honor.title}</h3>
                  <p className={styles.description}>{honor.description}</p>
                  {honor.link && (
                    <a 
                      href={honor.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.certificateLink}
                    >
                      {t('viewCertificate')} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
