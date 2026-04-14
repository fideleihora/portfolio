'use client'

import styles from './Timeline.module.css'
import { GraduationCap, School } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'

export const Timeline = () => {
  const { t } = useLanguage()

  const experiences = [
    {
      year: '2022 - 2024',
      title: 'A2 in Mathematics, Physics & Computer Science',
      institution: 'Ecole de science Byimana',
      description: 'Advanced studies in scientific principles and computing. Developed strong analytical foundation.',
      icon: <GraduationCap size={28} />,
      image: (
        <svg viewBox="0 0 200 150" className={styles.itemSvg}>
          <rect x="20" y="20" width="160" height="110" rx="10" fill="var(--accent)" opacity="0.1" />
          <path d="M50 75 L80 105 L150 45" stroke="var(--accent)" strokeWidth="6" fill="none" opacity="0.5" />
          <circle cx="150" cy="110" r="15" fill="var(--accent)" opacity="0.2" />
        </svg>
      )
    },
    {
      year: '2018 - 2021',
      title: 'Ordinary Level',
      institution: 'Groupe Scolaire Rambura boys',
      description: 'Foundational secondary education with focus on science subjects.',
      icon: <School size={28} />,
      image: (
        <svg viewBox="0 0 200 150" className={styles.itemSvg}>
          <rect x="20" y="20" width="160" height="110" rx="10" fill="currentColor" opacity="0.05" />
          <rect x="60" y="50" width="80" height="50" fill="currentColor" opacity="0.1" />
          <path d="M100 30 L140 50 L60 50 Z" fill="var(--accent)" opacity="0.3" />
        </svg>
      )
    },
  ]

  return (
    <section id="timeline" className={styles.timeline}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <h2 className={styles.sectionTitle}>{t('eduJourney')}</h2>
        </ScrollReveal>
        
        <div className={styles.list}>
          {experiences.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 0.2} direction={index % 2 === 0 ? 'right' : 'left'}>
              <div className={styles.item}>
                <div className={styles.visualColumn}>
                  <div className={styles.imageCard}>
                    {exp.image}
                  </div>
                </div>
                <div className={styles.contentColumn}>
                  <div className={styles.yearBadge}>{exp.year}</div>
                  <div className={styles.header}>
                    <div className={styles.iconWrapper}>{exp.icon}</div>
                    <div>
                      <h3 className={styles.title}>{exp.title}</h3>
                      <h4 className={styles.institution}>{exp.institution}</h4>
                    </div>
                  </div>
                  <p className={styles.description}>{exp.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
