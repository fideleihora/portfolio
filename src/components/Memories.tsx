'use client'

import styles from './Memories.module.css'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'

export const Memories = () => {
  const { t } = useLanguage()

  const sections = [
    {
      title: t('urugereroTitle'),
      description: t('urugereroDesc'),
      images: ['/gallery/i1.jpeg', '/gallery/i7.jpeg'],
      direction: 'right' as const
    },
    {
      title: t('leadershipTitle'),
      description: t('leadershipDesc'),
      images: ['/gallery/i2.jpeg', '/gallery/i6.jpeg'],
      direction: 'left' as const
    },
    {
      title: t('socialTitle'),
      description: t('socialDesc'),
      images: ['/gallery/i8.jpeg', '/gallery/i9.jpeg'],
      direction: 'right' as const
    }
  ]

  return (
    <section className={styles.memories}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>{t('memoriesTitle')}</h2>
            <p className={styles.subtitle}>{t('memoriesSub')}</p>
          </div>
        </ScrollReveal>

        <div className={styles.sectionsList}>
          {sections.map((section, idx) => (
            <div key={idx} className={styles.sectionRow}>
              <ScrollReveal direction={section.direction} delay={0.2}>
                <div className={styles.textContent}>
                  <h3 className={styles.rowTitle}>{section.title}</h3>
                  <p className={styles.rowDesc}>{section.description}</p>
                </div>
              </ScrollReveal>

              <div className={styles.imageGrid}>
                {section.images.map((img, imgIdx) => (
                  <ScrollReveal key={imgIdx} direction="up" delay={0.1 * imgIdx} scale={0.9}>
                    <div className={styles.imageCard}>
                      <Image 
                        src={img} 
                        alt={`${section.title} ${imgIdx}`} 
                        fill 
                        className={styles.image}
                        quality={95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx === 0 && imgIdx < 2}
                      />
                      <div className={styles.overlay}></div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
