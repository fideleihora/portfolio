'use client'

import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage, type Language } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon, Menu, X } from 'lucide-react'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when pathname changes
  useEffect(() => {
    if (mobileMenuOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMobileMenuOpen(false)
    }
  }, [pathname, mobileMenuOpen])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('projects'), href: '/projects' },
    { name: t('experience'), href: '/experience' },
    { name: t('skills'), href: '/skills' },
    { name: t('honors'), href: '/honors' },
    { name: t('stats'), href: '/stats' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('contact'), href: '/contact' },
  ]

  return (
    <nav className={`${styles.nav} ${scrolled || pathname !== '/' ? styles.scrolled : ''} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
      <div className={styles.container}>
        <Link href="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.logo}
          >
            IF
          </motion.div>
        </Link>
        
        <div className={styles.rightSection}>
          <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.showMobileLinks : ''}`}>
            {navItems.map((item, index) => (
              <motion.li 
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={item.href} 
                  className={pathname === item.href ? styles.active : ''}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
          
          <div className={styles.controls}>
            <button 
              onClick={toggleTheme} 
              className={styles.themeToggle}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className={styles.langSwitcher}>
              {['en', 'sw', 'fr', 'rw'].map((lang) => (
                <button 
                  key={lang}
                  className={`${styles.langBtn} ${language === lang ? styles.activeLang : ''}`}
                  onClick={() => setLanguage(lang as Language)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button 
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
