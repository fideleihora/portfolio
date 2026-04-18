'use client'

import { useEffect, useState } from 'react'
import styles from './Stats.module.css'
import { motion } from 'framer-motion'
import { Users, MessageSquare, TrendingUp, BarChart3 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'
import { fetchAnalyticsSummary, subscribeToAnalytics } from '@/lib/portfolioAnalytics'
import { emptyAnalyticsSummary, type AnalyticsSummary, type TrafficSource } from '@/lib/portfolioData'

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const trafficLabels: Record<TrafficSource, string> = {
  direct: 'Direct',
  referral: 'Referral',
  social: 'Social',
}

export const Stats = () => {
  const { t } = useLanguage()
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(emptyAnalyticsSummary)

  useEffect(() => {
    const syncAnalytics = async () => {
      setAnalytics(await fetchAnalyticsSummary())
    }

    void syncAnalytics()
    return subscribeToAnalytics(() => {
      void syncAnalytics()
    })
  }, [])

  const activityPeak = Math.max(...analytics.weeklyActivity, 1)
  const totalTraffic = Object.values(analytics.trafficSources).reduce((sum, value) => sum + value, 0)
  const weeklyVisits = analytics.weeklyActivity.reduce((sum, value) => sum + value, 0)
  const messageRate = analytics.totalVisitors > 0
    ? `${Math.round((analytics.contactSubmissions / analytics.totalVisitors) * 100)}%`
    : '0%'

  const topTrafficSources = (Object.entries(analytics.trafficSources) as Array<[TrafficSource, number]>)
    .map(([source, count]) => ({
      count,
      label: trafficLabels[source],
      share: totalTraffic > 0 ? Math.round((count / totalTraffic) * 100) : 0,
      source,
    }))
    .sort((left, right) => right.count - left.count)

  const statsData = [
    {
      color: '#3b82f6',
      icon: <Users size={32} />,
      label: t('visitors'),
      meta: `${analytics.totalPageViews.toLocaleString()} page views`,
      value: analytics.totalVisitors.toLocaleString(),
    },
    {
      color: '#10b981',
      icon: <MessageSquare size={32} />,
      label: t('messages'),
      meta: `${messageRate} visitor-to-message rate`,
      value: analytics.contactSubmissions.toLocaleString(),
    },
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
                    <span className={styles.change}>{stat.meta}</span>
                  </div>
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
              <p className={styles.detailSummary}>{weeklyVisits} page views tracked in the last 7 days.</p>
              <div className={styles.barGrid}>
                {analytics.weeklyActivity.map((count, index) => (
                  <div key={`${dayLabels[index]}-${index}`} className={styles.barWrapper}>
                    <span className={styles.barValue}>{count}</span>
                    <motion.div
                      className={styles.bar}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${Math.max((count / activityPeak) * 100, count > 0 ? 12 : 4)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + (index * 0.08) }}
                    />
                    <span className={styles.day}>{dayLabels[index]}</span>
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
              <p className={styles.detailSummary}>Traffic sources are grouped from live visits tracked by the server.</p>
              <ul className={styles.sourcesList}>
                {topTrafficSources.map((item, index) => (
                  <li key={item.source}>
                    <span>{item.label}</span>
                    <div className={styles.progressTrack}>
                      <motion.div
                        className={styles.progressBar}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.share}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.5 + (index * 0.1) }}
                      />
                    </div>
                    <span>{item.share}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
