'use client'

import { Layers3, Laptop2, Sparkles, Workflow } from 'lucide-react'
import styles from './Projects.module.css'
import { ScrollReveal } from './ScrollReveal'
import { useLanguage } from '@/context/LanguageContext'

export const Projects = () => {
  const { t } = useLanguage()

  const projects = [
    {
      title: t('projectOneTitle'),
      description: t('projectOneDesc'),
      icon: <Laptop2 size={28} />,
      illustration: (
        <svg viewBox="0 0 220 150" className={styles.illustration}>
          <rect x="30" y="20" width="160" height="96" rx="18" fill="currentColor" opacity="0.12" />
          <rect x="48" y="36" width="124" height="64" rx="10" fill="var(--accent)" opacity="0.18" />
          <path d="M70 122h80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.25" />
          <circle cx="155" cy="68" r="12" fill="var(--accent)" opacity="0.45" />
        </svg>
      ),
    },
    {
      title: t('projectTwoTitle'),
      description: t('projectTwoDesc'),
      icon: <Workflow size={28} />,
      illustration: (
        <svg viewBox="0 0 220 150" className={styles.illustration}>
          <circle cx="55" cy="75" r="22" fill="var(--accent)" opacity="0.35" />
          <circle cx="110" cy="45" r="18" fill="currentColor" opacity="0.12" />
          <circle cx="165" cy="95" r="22" fill="currentColor" opacity="0.16" />
          <path d="M76 67 94 53M126 53 144 83" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.35" />
        </svg>
      ),
    },
    {
      title: t('projectThreeTitle'),
      description: t('projectThreeDesc'),
      icon: <Layers3 size={28} />,
      illustration: (
        <svg viewBox="0 0 220 150" className={styles.illustration}>
          <path d="M110 22 180 58 110 94 40 58 110 22Z" fill="var(--accent)" opacity="0.22" />
          <path d="M110 56 180 92 110 128 40 92 110 56Z" fill="currentColor" opacity="0.12" />
          <path d="M110 40v48" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.35" />
        </svg>
      ),
    },
    {
      title: t('projectFourTitle'),
      description: t('projectFourDesc'),
      icon: <Sparkles size={28} />,
      illustration: (
        <svg viewBox="0 0 220 150" className={styles.illustration}>
          <rect x="40" y="34" width="140" height="82" rx="22" fill="currentColor" opacity="0.12" />
          <path d="M72 90c14-26 28-39 42-39s25 11 34 26 16 19 24 11" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="84" cy="58" r="8" fill="var(--accent)" opacity="0.4" />
        </svg>
      ),
    },
  ]

  return (
    <section className={styles.projects}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>{t('projectsTitle')}</h2>
            <p className={styles.subtitle}>{t('projectsSubtitle')}</p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1} scale={0.95}>
              <article className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.icon}>{project.icon}</div>
                  <span className={styles.tag}>{t('projectLabel')}</span>
                </div>
                <div className={styles.visual}>{project.illustration}</div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
