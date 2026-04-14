'use client'

import styles from '@/app/page.module.css'
import { useLanguage } from '@/context/LanguageContext'

export const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Ihorindengera Fidele. {t('footer')}</p>
    </footer>
  )
}
