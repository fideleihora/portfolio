'use client'

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import styles from './Contact.module.css'
import { MapPin, Send } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ScrollReveal } from './ScrollReveal'
import { submitContactForm } from '@/lib/portfolioAnalytics'

const LinkedInIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const GitHubIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
  </svg>
)

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.6 2 2.18 6.4 2.18 11.83c0 1.74.45 3.43 1.31 4.92L2 22l5.4-1.42a9.8 9.8 0 0 0 4.63 1.18h.01c5.43 0 9.84-4.4 9.84-9.83a9.76 9.76 0 0 0-2.83-7.02Zm-7.02 15.19h-.01a8.13 8.13 0 0 1-4.14-1.14l-.3-.18-3.2.84.86-3.12-.2-.32a8.12 8.12 0 0 1-1.25-4.35c0-4.48 3.66-8.14 8.16-8.14a8.1 8.1 0 0 1 5.77 2.39 8.08 8.08 0 0 1 2.38 5.76c0 4.5-3.66 8.16-8.07 8.16Zm4.47-6.08c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.96-.15.17-.30.19-.56.06-.25-.12-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.40-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.30.37-.45.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.87-.20-.49-.41-.42-.57-.43h-.48c-.17 0-.43.06-.65.31-.23.25-.86.84-.86 2.04s.88 2.37 1 2.54c.13.17 1.73 2.64 4.20 3.71.59.25 1.04.40 1.40.52.59.19 1.12.16 1.55.10.47-.07 1.47-.60 1.68-1.17.21-.58.21-1.08.15-1.17-.06-.10-.23-.15-.48-.27Z"/>
  </svg>
)

const TelegramIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M11.944 0C5.344 0 0 5.344 0 11.944c0 6.6 5.344 11.944 11.944 11.944 6.6 0 11.944-5.344 11.944-11.944C23.888 5.344 18.544 0 11.944 0Zm5.448 8.112-1.856 8.744c-.14.624-.51.776-1.032.48l-2.824-2.08-1.364 1.312c-.15.15-.276.276-.564.276l.204-2.888 5.256-4.752c.228-.204-.05-.316-.35-.116l-6.504 4.096-2.8-0.876c-.608-.19-.62-.608.128-.9l10.94-4.22c.504-.18.948.116.764.924Z"/>
  </svg>
)

const GmailIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" />
  </svg>
)

const CONTACT_EMAIL = 'fideleihorindengera@gmail.com'
const CONTACT_PHONE = '+250793047276'
const DRAFT_STORAGE_KEY = 'portfolio.contact-draft'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/fidel-ihorindengera-2397a33a0/',
    icon: <LinkedInIcon />,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/FideleIhorindengera',
    icon: <TelegramIcon />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/fideleihora',
    icon: <GitHubIcon />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ihorindengerafidele/',
    icon: <InstagramIcon />,
  },
  {
    name: 'Facebook',
    href: 'https://web.facebook.com/ihorindengera.fidelehero/',
    icon: <FacebookIcon />,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/250793047276',
    icon: <WhatsAppIcon />,
  },
  {
    name: 'Email',
    href: `mailto:${CONTACT_EMAIL}`,
    icon: <GmailIcon />,
  },
]

type ContactFormValues = {
  email: string
  message: string
  name: string
  subject: string
}

type FormStatus =
  | null
  | { tone: 'error'; text: string }
  | { tone: 'success'; text: string }

const emptyForm: ContactFormValues = {
  email: '',
  message: '',
  name: '',
  subject: '',
}

const feedbackCopy = {
  en: {
    helper: 'Your message will be stored directly in the portfolio inbox.',
    invalidEmail: 'Enter a valid email address.',
    invalidMessage: 'Write at least 20 characters so the message has enough detail.',
    invalidName: 'Enter your name before sending.',
    invalidSubject: 'Add a clear subject.',
    sending: 'Sending message...',
    serverError: 'Unable to send the message right now.',
    success: 'Your message was received successfully.',
  },
  fr: {
    helper: 'Le message sera enregistre directement dans la boite de reception du portfolio.',
    invalidEmail: 'Saisissez une adresse e-mail valide.',
    invalidMessage: 'Ajoutez au moins 20 caracteres pour donner assez de contexte.',
    invalidName: 'Saisissez votre nom avant lenvoi.',
    invalidSubject: 'Ajoutez un sujet clair.',
    sending: 'Envoi du message...',
    serverError: 'Impossible denvoyer le message pour le moment.',
    success: 'Votre message a bien ete enregistre.',
  },
  rw: {
    helper: 'Ubutumwa buzahita bubikwa muri sisitemu ya portfolio.',
    invalidEmail: 'Andika imeri yemewe.',
    invalidMessage: 'Andika nibura inyuguti 20 kugira ngo ubutumwa busobanuke.',
    invalidName: 'Andika izina ryawe mbere yo kohereza.',
    invalidSubject: 'Andika umutwe usobanutse.',
    sending: 'Ubutumwa buri koherezwa...',
    serverError: 'Ubutumwa ntibushoboye koherezwa ubu.',
    success: 'Ubutumwa bwawe bwakiriwe neza.',
  },
  sw: {
    helper: 'Ujumbe utahifadhiwa moja kwa moja kwenye mfumo wa portfolio.',
    invalidEmail: 'Weka anwani sahihi ya barua pepe.',
    invalidMessage: 'Andika angalau herufi 20 ili ujumbe uwe na maelezo ya kutosha.',
    invalidName: 'Weka jina lako kabla ya kutuma.',
    invalidSubject: 'Weka mada iliyo wazi.',
    sending: 'Inatuma ujumbe...',
    serverError: 'Imeshindikana kutuma ujumbe kwa sasa.',
    success: 'Ujumbe wako umepokelewa.',
  },
}

export const Contact = () => {
  const { language, t } = useLanguage()
  const [formValues, setFormValues] = useState<ContactFormValues>(emptyForm)
  const [status, setStatus] = useState<FormStatus>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY)

    if (!savedDraft) {
      return
    }

    try {
      const parsedDraft = JSON.parse(savedDraft) as Partial<ContactFormValues>

      window.requestAnimationFrame(() => {
        setFormValues({
          email: parsedDraft.email ?? '',
          message: parsedDraft.message ?? '',
          name: parsedDraft.name ?? '',
          subject: parsedDraft.subject ?? '',
        })
      })
    } catch {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    const hasContent = Object.values(formValues).some((value) => value.trim().length > 0)

    if (!hasContent) {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY)
      return
    }

    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formValues))
  }, [formValues])

  const handleChange = (field: keyof ContactFormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value

    setFormValues((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    void (async () => {
      const name = formValues.name.trim()
      const email = formValues.email.trim()
      const subject = formValues.subject.trim()
      const message = formValues.message.trim()
      const copy = feedbackCopy[language]

      if (!name) {
        setStatus({ tone: 'error', text: copy.invalidName })
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus({ tone: 'error', text: copy.invalidEmail })
        return
      }

      if (!subject) {
        setStatus({ tone: 'error', text: copy.invalidSubject })
        return
      }

      if (message.length < 20) {
        setStatus({ tone: 'error', text: copy.invalidMessage })
        return
      }

      setIsSubmitting(true)
      setStatus({ tone: 'success', text: copy.sending })

      try {
        await submitContactForm({
          email,
          message,
          name,
          subject,
        })

        setStatus({ tone: 'success', text: copy.success })
        setFormValues(emptyForm)
        window.localStorage.removeItem(DRAFT_STORAGE_KEY)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : copy.serverError
        setStatus({ tone: 'error', text: errorMessage })
      } finally {
        setIsSubmitting(false)
      }
    })()
  }

  const submitLabel = isSubmitting ? feedbackCopy[language].sending : t('sendMessage')

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
                <div className={styles.icon}><GmailIcon /></div>
                <div className={styles.contactContent}>
                  <h3>{t('email')}</h3>
                  <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <div className={styles.contactItem}>
                <div className={styles.icon}><WhatsAppIcon /></div>
                <div className={styles.contactContent}>
                  <h3>{t('phone')}</h3>
                  <p><a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a></p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className={styles.contactItem}>
                <div className={styles.icon}><MapPin size={24} /></div>
                <div className={styles.contactContent}>
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
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="contact-name">{t('namePlaceholder')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formValues.name}
                    onChange={handleChange('name')}
                    placeholder={t('namePlaceholder')}
                    autoComplete="name"
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="contact-email">{t('emailPlaceholder')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formValues.email}
                    onChange={handleChange('email')}
                    placeholder={t('emailPlaceholder')}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="contact-subject">{t('subject')}</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formValues.subject}
                  onChange={handleChange('subject')}
                  placeholder={t('subjectPlaceholder')}
                  autoComplete="off"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.messageHeader}>
                  <label className={styles.label} htmlFor="contact-message">{t('messagePlaceholder')}</label>
                  <span className={styles.counter}>{formValues.message.trim().length}/500</span>
                </div>
                <textarea
                  id="contact-message"
                  value={formValues.message}
                  onChange={handleChange('message')}
                  placeholder={t('messagePlaceholder')}
                  rows={7}
                  maxLength={500}
                  required
                />
              </div>

              <div className={styles.formFooter}>
                <p className={`${styles.status} ${status?.tone === 'error' ? styles.statusError : ''} ${status?.tone === 'success' ? styles.statusSuccess : ''}`}>
                  {status?.text ?? feedbackCopy[language].helper}
                </p>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {submitLabel} <Send size={18} />
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
