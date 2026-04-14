'use client'

import styles from './Stats.module.css'
import { motion } from 'framer-motion'
import { Users, MessageSquare, TrendingUp, BarChart3 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'

export const Stats = () => {
  const { t } = useLanguage()

  const statsData = [
    {
      label: t('visitors'),
      value: '1,248',
      change: '+12%',
      icon: <Users size={32} />,
      color: '#3b82f6',
      illustration: (
        <svg viewBox="0 0 200 100" className={styles.svgChart}>
          <motion.path
            d="M0,80 Q30,40 60,60 T120,30 T180,50 T200,10"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <rect x="0" y="0" width="200" height="100" fill="url(#grad-blue)" opacity="0.1" />
          <defs>
            <linearGradient id="grad-blue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      label: t('messages'),
      value: '142',
      change: '+5%',
      icon: <MessageSquare size={32} />,
      color: '#10b981',
      illustration: (
        <svg viewBox="0 0 200 100" className={styles.svgChart}>
          <motion.path
            d="M0,70 Q40,80 80,40 T140,50 T200,20"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
          <rect x="0" y="0" width="200" height="100" fill="url(#grad-green)" opacity="0.1" />
          <defs>
            <linearGradient id="grad-green" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
        </svg>
      )
    }
  ]

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>{t('analytics')}</h2>
            <p className={styles.subtitle}>{t('activity')}</p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {statsData.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.2} scale={0.95}>
              <div className={styles.card}>
                <div className={styles.cardInfo}>
                  <div className={styles.icon} style={{ color: stat.color }}>{stat.icon}</div>
                  <div>
                    <h3 className={styles.label}>{stat.label}</h3>
                    <p className={styles.value}>{stat.value}</p>
                    <span className={styles.change}>{stat.change}</span>
                  </div>
                </div>
                <div className={styles.illustrationWrapper}>
                  {stat.illustration}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className={styles.detailedStats}>
          <ScrollReveal direction="right" delay={0.4}>
            <div className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <BarChart3 size={24} />
                <h3>{t('activity')}</h3>
              </div>
              <div className={styles.barGrid}>
                {[60, 80, 45, 90, 70, 55, 75].map((h, i) => (
                  <div key={i} className={styles.barWrapper}>
                    <motion.div 
                      className={styles.bar} 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    />
                    <span className={styles.day}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={0.4}>
            <div className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <TrendingUp size={24} />
                <h3>{t('traffic')}</h3>
              </div>
              <ul className={styles.sourcesList}>
                <li>
                  <span>Direct Search</span>
                  <div className={styles.progressTrack}>
                    <motion.div 
                      className={styles.progressBar} 
                      initial={{ width: 0 }}
                      whileInView={{ width: '65%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </div>
                  <span>65%</span>
                </li>
                <li>
                  <span>Social Media</span>
                  <div className={styles.progressTrack}>
                    <motion.div 
                      className={styles.progressBar} 
                      initial={{ width: 0 }}
                      whileInView={{ width: '25%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </div>
                  <span>25%</span>
                </li>
                <li>
                  <span>Referral</span>
                  <div className={styles.progressTrack}>
                    <motion.div 
                      className={styles.progressBar} 
                      initial={{ width: 0 }}
                      whileInView={{ width: '10%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                    />
                  </div>
                  <span>10%</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
