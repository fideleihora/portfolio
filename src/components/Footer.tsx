'use client'

import { useEffect, useState } from 'react'
import styles from '@/app/page.module.css'
import { useLanguage } from '@/context/LanguageContext'
import { fetchAnalyticsSummary, subscribeToAnalytics } from '@/lib/portfolioAnalytics'
import { Users } from 'lucide-react'

export const Footer = () => {
  const { t } = useLanguage()
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    const syncCount = async () => {
      const summary = await fetchAnalyticsSummary()
      setVisitorCount(summary.totalVisitors)
    }

    void syncCount()
    return subscribeToAnalytics(() => {
      void syncCount()
    })
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Ihorindengera Fidele. {t('footer')}</p>
        {visitorCount !== null && (
          <div className={styles.visitorCounter} title="Total Unique Visitors">
            <Users size={14} />
            <span>{visitorCount.toLocaleString()}</span>
          </div>
        )}
      </div>
    </footer>
  )
}
