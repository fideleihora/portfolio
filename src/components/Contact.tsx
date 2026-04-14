'use client'

import styles from './Contact.module.css'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'

const socialLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/250793047276',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.6 2 2.18 6.4 2.18 11.83c0 1.74.45 3.43 1.31 4.92L2 22l5.4-1.42a9.8 9.8 0 0 0 4.63 1.18h.01c5.43 0 9.84-4.4 9.84-9.83a9.76 9.76 0 0 0-2.83-7.02Zm-7.02 15.19h-.01a8.13 8.13 0 0 1-4.14-1.14l-.3-.18-3.2.84.86-3.12-.2-.32a8.12 8.12 0 0 1-1.25-4.35c0-4.48 3.66-8.14 8.16-8.14a8.1 8.1 0 0 1 5.77 2.39 8.08 8.08 0 0 1 2.38 5.76c0 4.5-3.66 8.16-8.07 8.16Zm4.47-6.08c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.96-.15.17-.3.19-.56.06-.25-.12-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.3.37-.45.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.87-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.43.06-.65.31-.23.25-.86.84-.86 2.04s.88 2.37 1 2.54c.13.17 1.73 2.64 4.2 3.71.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.17.21-.58.21-1.08.15-1.17-.06-.1-.23-.15-.48-.27Z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:fideleihorindengera@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M4 5h16a2 2 0 0 1 2 2v.35l-10 6.3-10-6.3V7a2 2 0 0 1 2-2Zm18 4.72V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.72l9.47 5.97a1 1 0 0 0 1.06 0L22 9.72Z"/>
      </svg>
    ),
  },
  {
    name: 'Call',
    href: 'tel:+250793047276',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.32.56 3.59.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.19 2.47.56 3.59a1 1 0 0 1-.25 1l-2.19 2.2Z"/>
      </svg>
    ),
  },
]

export const Contact = () => {
  const { t } = useLanguage()

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.header}>
            <h2 className={styles.sectionTitle}>{t('getInTouch')}</h2>
            <p className={styles.subtitle}>{t('contactSubtitle')}</p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          <div className={styles.info}>
            <ScrollReveal direction="right" delay={0.2}>
              <div className={styles.contactItem}>
                <div className={styles.icon}><Mail size={24} /></div>
                <div>
                  <h3>{t('email')}</h3>
                  <p><a href="mailto:fideleihorindengera@gmail.com">fideleihorindengera@gmail.com</a></p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={0.3}>
              <div className={styles.contactItem}>
                <div className={styles.icon}><Phone size={24} /></div>
                <div>
                  <h3>{t('phone')}</h3>
                  <p><a href="tel:0793047276">0793047276</a></p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className={styles.contactItem}>
                <div className={styles.icon}><MapPin size={24} /></div>
                <div>
                  <h3>{t('location')}</h3>
                  <p>{t('locationVal')}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.5}>
              <div className={styles.socialBlock}>
                <h3 className={styles.socialTitle}>{t('socialMedia')}</h3>
                <div className={styles.socialLinks}>
                  {socialLinks.map(({ name, href, icon }) => (
                    <a
                      key={name}
                      href={href}
                      className={styles.socialLink}
                      aria-label={name}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.3}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <input type="text" placeholder={t('namePlaceholder')} required />
              </div>
              <div className={styles.inputGroup}>
                <input type="email" placeholder={t('emailPlaceholder')} required />
              </div>
              <div className={styles.inputGroup}>
                <textarea placeholder={t('messagePlaceholder')} rows={5} required></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>
                {t('sendMessage')} <Send size={18} />
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
