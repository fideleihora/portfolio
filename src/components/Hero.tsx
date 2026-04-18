'use client'

import { useState, useEffect } from 'react'
import styles from './Hero.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'

const slides = [
  { src: '/F1.jpeg', alt: 'Ihorindengera Fidele 1' },
  { src: '/F3.jpeg', alt: 'Ihorindengera Fidele 3' },
]

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.flexContent}>
          {/* Centered Image */}
          <ScrollReveal direction="up" delay={0.2} scale={0.9}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={styles.slideItem}
                  >
                    <Image 
                      src={slides[currentSlide].src} 
                      alt={slides[currentSlide].alt} 
                      fill
                      className={styles.profileImage}
                      priority
                      sizes="(max-width: 768px) 260px, 320px"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className={styles.imageDecoration}></div>
                <div className={styles.slideIndicators}>
                  {slides.map((_, idx) => (
                    <motion.div 
                      key={idx} 
                      className={`${styles.indicator} ${idx === currentSlide ? styles.activeIndicator : ''}`}
                      layoutId="indicator"
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Centered Text Content */}
          <ScrollReveal direction="up" delay={0.4} scale={0.95}>
            <div className={styles.content}>
              <h2 className={styles.subtitle}>{t('hello')}</h2>
              <h1 className={styles.title}>Ihorindengera Fidele</h1>
              <p className={styles.description}>
                {t('description')}
              </p>
              <div className={styles.actions}>
                <a href="/contact?type=hire" className={styles.primaryBtn}>
                  {t('hireMe')}
                </a>
                <a href="/contact?type=collaborate" className={styles.secondaryBtn}>
                  {t('collaborate')}
                </a>
                <a href="/contact?type=assist" className={styles.secondaryBtn}>
                  {t('assist')}
                </a>
              </div>
              <div className={styles.subActions}>
                <a href="/about" className={styles.linkBtn}>
                  {t('aboutMe')} <ArrowRight size={16} />
                </a>
                <a href="/contact" className={styles.linkBtn}>
                  {t('letsTalk')}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Windows 11 Bloom Background Effects */}
      <div className={styles.background}>
        <div className={styles.bloom1}></div>
        <div className={styles.bloom2}></div>
      </div>
    </section>
  )
}
