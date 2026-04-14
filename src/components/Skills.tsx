'use client'

import styles from './Skills.module.css'
import { Code, Terminal, Brain, Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'

export const Skills = () => {
  const { t } = useLanguage()
  
  const categories = [
    {
      title: t('technical'),
      icon: <Terminal size={32} />,
      skills: ['C++', 'VS Code', 'Mathematics', 'Physics', 'Computer Science'],
      illustration: (
        <svg viewBox="0 0 200 200" className={styles.svgIllustration}>
          <rect x="20" y="40" width="160" height="120" rx="10" fill="currentColor" opacity="0.1" />
          <path d="M40 70h120M40 90h80M40 110h100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
          <circle cx="150" cy="140" r="20" fill="var(--accent)" opacity="0.5" />
        </svg>
      )
    },
    {
      title: t('softSkills'),
      icon: <Brain size={32} />,
      skills: ['Problem Solving', 'Team Working', 'Creative Thinking', 'Video Editing'],
      illustration: (
        <svg viewBox="0 0 200 200" className={styles.svgIllustration}>
          <circle cx="100" cy="100" r="80" fill="currentColor" opacity="0.1" />
          <path d="M100 40c-33 0-60 27-60 60s60 60 60 60 60-27 60-60-27-60-60-60z" fill="var(--accent)" opacity="0.2" />
          <circle cx="100" cy="100" r="30" fill="currentColor" opacity="0.3" />
        </svg>
      )
    },
    {
      title: t('languages'),
      icon: <Globe size={32} />,
      skills: ['English (Very Good)', 'Kinyarwanda (Native)', 'Kiswahili (Good)'],
      illustration: (
        <svg viewBox="0 0 200 200" className={styles.svgIllustration}>
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
          <ellipse cx="100" cy="100" rx="30" ry="70" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
          <line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.2" />
          <circle cx="130" cy="70" r="15" fill="var(--accent)" opacity="0.4" />
        </svg>
      )
    },
    {
      title: t('certifications'),
      icon: <Code size={32} />,
      skills: ['Digital Skills Foundation', 'Beyond Success Certificate', 'I lead program certificate'],
      illustration: (
        <svg viewBox="0 0 200 200" className={styles.svgIllustration}>
          <rect x="40" y="30" width="120" height="140" rx="5" fill="currentColor" opacity="0.1" />
          <path d="M70 60h60M70 80h60M70 100h30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
          <polygon points="100,120 110,140 90,140" fill="var(--accent)" opacity="0.6" />
        </svg>
      )
    },
  ]

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <h2 className={styles.sectionTitle}>{t('expertise')}</h2>
        </ScrollReveal>
        
        <div className={styles.grid}>
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.title} delay={index * 0.1} scale={0.9}>
              <div className={styles.card}>
                <div className={styles.illustrationWrapper}>
                  {cat.illustration}
                </div>
                <div className={styles.cardHeader}>
                  <div className={styles.icon}>{cat.icon}</div>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                </div>
                <ul className={styles.skillList}>
                  {cat.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
