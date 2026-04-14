'use client'

import styles from './About.module.css'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'

export const About = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <h2 className={styles.sectionTitle}>{t('aboutTitle')}</h2>
          <div className={styles.grid}>
            <div className={styles.textSide}>
              <div className={styles.text}>
                <p>{t('aboutP1')}</p>
                <p>{t('aboutP2')}</p>
              </div>
              
              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <span>{t('location')}</span>
                  <p>{t('locationVal')}</p>
                </div>
                <div className={styles.infoItem}>
                  <span>{t('education')}</span>
                  <p>A2 in MPC Specialist</p>
                </div>
                <div className={styles.infoItem}>
                  <span>{t('interests')}</span>
                  <p>{t('interestsVal')}</p>
                </div>
              </div>
            </div>

            <div className={styles.visualSide}>
              <div className={styles.illustrationCard}>
                <svg viewBox="0 0 200 200" className={styles.aboutSvg}>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.2 }} />
                      <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
                  <path d="M60 100 L90 130 L140 70" stroke="var(--accent)" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="40" y="40" width="20" height="20" rx="4" fill="var(--accent)" opacity="0.4" />
                  <rect x="140" y="140" width="20" height="20" rx="4" fill="var(--accent)" opacity="0.4" />
                </svg>
                <div className={styles.statsOverlay}>
                  <div className={styles.statBox}>
                    <h3>2024</h3>
                    <p>{t('graduate')}</p>
                  </div>
                  <div className={styles.statBox}>
                    <h3>3+</h3>
                    <p>{t('certs')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
