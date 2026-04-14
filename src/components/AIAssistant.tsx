'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageSquare, Mic, MicOff, Send, User, X } from 'lucide-react'
import styles from './AIAssistant.module.css'
import { useLanguage, type Language } from '@/context/LanguageContext'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface SpeechRecognitionResultLike {
  0: {
    transcript: string
  }
}

interface SpeechRecognitionEventLike extends Event {
  results: {
    0: SpeechRecognitionResultLike
  }
}

interface SpeechRecognitionLike {
  lang: string
  continuous: boolean
  interimResults: boolean
  onstart: (() => void) | null
  onend: (() => void) | null
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  start: () => void
  stop: () => void
}

interface SpeechRecognitionConstructorLike {
  new (): SpeechRecognitionLike
}

const welcomeMessages: Record<Language, string> = {
  en: "Hello. I'm Fidele's portfolio assistant. Ask about his skills, education, projects, or contact details.",
  sw: 'Habari. Mimi ni msaidizi wa portfolio ya Fidele. Uliza kuhusu ujuzi, elimu, miradi, au mawasiliano yake.',
  fr: 'Bonjour. Je suis l’assistant du portfolio de Fidele. Posez une question sur ses compétences, ses études, ses projets ou ses contacts.',
  rw: 'Muraho. Ndi umufasha wa portfolio ya Fidele. Umbaze ku bumenyi bwe, amashuri, imishinga, cyangwa uko wamubona.',
}

const quickAnswers = [
  {
    matches: ['who', 'name', 'nani', 'uri nde', 'uri nani'],
    answer:
      'Ihorindengera Fidele is a Mathematics, Physics, and Computer Science specialist based in Rwanda.',
  },
  {
    matches: ['skills', 'skill', 'expert', 'expertise', 'ubumenyi', 'ujuzi'],
    answer:
      'His strengths include mathematics, physics, computer science, C++, problem solving, and video editing.',
  },
  {
    matches: ['education', 'study', 'school', 'amashuri', 'elimu'],
    answer:
      'He completed A2 in Mathematics, Physics and Computer Science at Ecole de Science Byimana after studying Ordinary Level at GS Rambura Boys.',
  },
  {
    matches: ['project', 'projects', 'portfolio', 'website'],
    answer:
      'This portfolio highlights his academic background, technical skills, personal achievements, and a gallery of key memories.',
  },
  {
    matches: ['contact', 'email', 'phone', 'call', 'whatsapp', 'mawasiliano', 'kuguvugisha'],
    answer:
      'You can reach him at fideleihorindengera@gmail.com or by phone and WhatsApp on +250 793 047 276.',
  },
  {
    matches: ['location', 'where', 'rwanda', 'musanze'],
    answer:
      'He is based in Musanze District, Northern Province, Rwanda.',
  },
]

const getSpeechRecognition = (): SpeechRecognitionConstructorLike | null => {
  if (typeof window === 'undefined') return null

  const recognition = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructorLike
    webkitSpeechRecognition?: SpeechRecognitionConstructorLike
  }

  return recognition.SpeechRecognition ?? recognition.webkitSpeechRecognition ?? null
}

const getRecognitionLanguage = (language: Language) => {
  switch (language) {
    case 'sw':
      return 'sw-TZ'
    case 'fr':
      return 'fr-FR'
    case 'rw':
      return 'en-US'
    default:
      return 'en-US'
  }
}

const getFallbackReply = (language: Language) => {
  switch (language) {
    case 'sw':
      return 'Jaribu kuuliza kuhusu ujuzi, elimu, mawasiliano, au mahali alipo Fidele.'
    case 'fr':
      return 'Essayez de demander des informations sur ses compétences, ses études, ses contacts ou sa localisation.'
    case 'rw':
      return 'Gerageza kumbaza ku bumenyi bwe, amashuri yize, aho abarizwa, cyangwa uko wamubona.'
    default:
      return "Try asking about Fidele's skills, education, location, or contact information."
  }
}

const createMessage = (id: number, text: string, sender: 'user' | 'ai'): Message => ({
  id: id.toString(),
  text,
  sender,
  timestamp: new Date(),
})

export const AIAssistant = () => {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => [createMessage(1, welcomeMessages.en, 'ai')])
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const messageIdRef = useRef(2)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
    }
  }, [])

  const generateResponse = (input: string) => {
    const query = input.toLowerCase()
    const matched = quickAnswers.find((item) => item.matches.some((match) => query.includes(match)))
    return matched?.answer ?? getFallbackReply(language)
  }

  const handleSend = (rawText: string) => {
    const text = rawText.trim()
    if (!text) return

    const userId = messageIdRef.current++
    setMessages((prev) => [...prev, createMessage(userId, text, 'user')])
    setInputText('')
    setIsTyping(true)

    window.setTimeout(() => {
      const aiId = messageIdRef.current++
      const response = generateResponse(text)
      setMessages((prev) => [...prev, createMessage(aiId, response, 'ai')])
      setIsTyping(false)
    }, 700)
  }

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      return
    }

    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) {
      const aiId = messageIdRef.current++
      setMessages((prev) => [
        ...prev,
        createMessage(aiId, 'Voice input is not available in this browser. Please type your question instead.', 'ai'),
      ])
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = getRecognitionLanguage(language)
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onstart = () => setIsRecording(true)
    recognition.onend = () => setIsRecording(false)
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInputText(transcript)
      handleSend(transcript)
    }
    recognitionRef.current = recognition
    recognition.start()
  }

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={styles.chatWindow}
          >
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                <div className={styles.botIcon}><Bot size={20} /></div>
                <div>
                  <h3>Fidele AI</h3>
                  <span className={styles.onlineStatus}>Ready</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Close assistant">
                <X size={20} />
              </button>
            </div>

            <div className={styles.messages} ref={scrollRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
                  <div className={styles.avatar}>
                    {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={styles.messageContent}>
                    <p>{msg.text}</p>
                    <span className={styles.time}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.message} ${styles.ai}`}>
                  <div className={styles.avatar}>
                    <Bot size={16} />
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.inputArea}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSend(inputText)
                    }
                  }}
                  placeholder={welcomeMessages[language]}
                />
                <button
                  onClick={toggleRecording}
                  className={`${styles.iconBtn} ${isRecording ? styles.recording : ''}`}
                  aria-label={isRecording ? 'Stop voice input' : 'Start voice input'}
                >
                  {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
              </div>
              <button onClick={() => handleSend(inputText)} className={styles.sendBtn} aria-label="Send message">
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.floatingBtn}
        aria-label="Open assistant"
      >
        <MessageSquare size={24} />
        {!isOpen && <span className={styles.badge}>AI</span>}
      </motion.button>
    </div>
  )
}
