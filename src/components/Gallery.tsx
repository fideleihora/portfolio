'use client'

import React, { useState } from 'react'
import styles from './Gallery.module.css'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'

const images = Array.from({ length: 9 }, (_, index) => ({
  src: `/gallery/i${index + 1}.jpeg`,
  alt: `Gallery photo ${index + 1}`,
}))

export const Gallery = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const { t } = useLanguage()

  const nextImg = () => setSelectedIdx((prev) => (prev !== null ? (prev + 1) % images.length : null))
  const prevImg = () => setSelectedIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <h2 className={styles.title}>{t('gallery')}</h2>
            <p className={styles.subtitle}>{t('memoriesSub')}</p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {images.map((img, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.05} scale={0.9}>
              <motion.div 
                className={styles.imageCard}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedIdx(idx)}
              >
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  className={styles.image}
                  quality={95}
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                  priority={idx < 3}
                />
                <div className={styles.overlay}>
                  <Maximize2 size={24} color="white" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightbox}
          >
            <button className={styles.closeBtn} onClick={() => setSelectedIdx(null)}>
              <X size={32} />
            </button>
            
            <button className={styles.navBtn} onClick={(e) => { e.stopPropagation(); prevImg(); }} style={{ left: '2rem' }}>
              <ChevronLeft size={48} />
            </button>

            <motion.div 
              key={selectedIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={images[selectedIdx].src} 
                alt={images[selectedIdx].alt} 
                fill 
                className={styles.lightboxImage}
                priority
                quality={100}
                sizes="100vw"
              />
            </motion.div>

            <button className={styles.navBtn} onClick={(e) => { e.stopPropagation(); nextImg(); }} style={{ right: '2rem' }}>
              <ChevronRight size={48} />
            </button>

            <div className={styles.counter}>
              {selectedIdx + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
