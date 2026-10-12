import React from 'react'
import { motion, Variants } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  staggerChildren?: number
}

// Letter by letter continuous wave / float & shimmer animation
export const AnimatedContinuousText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0.2,
}) => {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          style={{
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            display: 'inline-block',
          }}
          animate={{
            y: [0, -6, 0, 2, 0],
            rotate: [0, -1.5, 0, 1.5, 0],
            scale: [1, 1.05, 1, 0.98, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: delay + index * 0.08,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Letter by letter spring pop entrance animation
export const AnimatedSplitText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0.2,
  staggerChildren = 0.035,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -60,
      scale: 0.8,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: 1000 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Word by word reveal animation with smooth sliding gradient/upward flow
export const AnimatedWordReveal: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0.3,
  staggerChildren = 0.08,
}) => {
  const words = text.split(' ')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 16,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 150,
      },
    },
  }

  return (
    <motion.p
      className={`inline-flex flex-wrap gap-x-1.5 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
