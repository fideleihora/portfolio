'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  scale?: number
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  scale = 0.8
}) => {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
    none: { x: 0, y: 0 }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        scale: scale 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.21, 1.11, 0.81, 0.99] // springy pop effect
      }}
    >
      {children}
    </motion.div>
  )
}
