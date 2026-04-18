'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import styles from './CustomCursor.module.css'

export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 30, stiffness: 800 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleTouch = () => {
      // If we detect a touch event, it's a touch device
      // We hide the cursor entirely
      const cursorElement = document.querySelector(`.${styles.cursor}`) as HTMLElement
      if (cursorElement) cursorElement.style.display = 'none'
    }

    window.addEventListener('touchstart', handleTouch, { once: true })
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as HTMLElement
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      
      setIsPointer(!!isClickable)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className={styles.cursor}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <motion.div 
        className={styles.dot}
        animate={{
          scale: isPointer ? 4 : 1,
          backgroundColor: isPointer ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 1)',
          border: isPointer ? '1px solid rgba(255, 255, 255, 1)' : 'none'
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </motion.div>
  )
}
