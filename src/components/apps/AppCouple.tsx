import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Camera } from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'

// Gentle floating flower petal definition
const floatingPetals = [
  { id: 1, icon: '🌸', initialX: 10, targetY: [0, -35, 0], duration: 5.5, delay: 0, size: 'text-lg', rotate: [0, 45, 0] },
  { id: 2, icon: '🌺', initialX: 85, targetY: [0, -45, 0], duration: 6.8, delay: 0.8, size: 'text-base', rotate: [0, -60, 0] },
  { id: 3, icon: '🌷', initialX: 45, targetY: [0, -30, 0], duration: 5.0, delay: 1.5, size: 'text-sm', rotate: [0, 30, 0] },
  { id: 4, icon: '🌸', initialX: 25, targetY: [0, -40, 0], duration: 7.2, delay: 2.1, size: 'text-xs', rotate: [0, -40, 0] },
  { id: 5, icon: '✨', initialX: 70, targetY: [0, -25, 0], duration: 4.5, delay: 0.5, size: 'text-xs', rotate: [0, 90, 0] },
  { id: 6, icon: '💐', initialX: 92, targetY: [0, -38, 0], duration: 6.2, delay: 1.8, size: 'text-sm', rotate: [0, 25, 0] },
]

export const AppCouple: React.FC = () => {
  const { groom, bride, quote } = weddingData.couple

  return (
    <div className="relative p-4 sm:p-6 max-w-2xl mx-auto space-y-6 text-slate-800 overflow-hidden">
      {/* Animated Floating Romantic Petals & Blossoms in background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10">
        {floatingPetals.map(petal => (
          <motion.div
            key={petal.id}
            style={{ left: `${petal.initialX}%`, bottom: '5%' }}
            animate={{
              y: petal.targetY,
              rotate: petal.rotate,
              opacity: [0.3, 0.85, 0.3],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: petal.delay,
            }}
            className={`absolute ${petal.size} drop-shadow-xs filter`}
          >
            {petal.icon}
          </motion.div>
        ))}
      </div>
      {/* Quote Section - Seamless Editorial Quote without heavy card box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative text-center py-4 px-2"
      >
        {/* Pulsing & floating heart icon */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-9 h-9 mx-auto mb-3 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25"
        >
          <Heart className="w-4 h-4 fill-current" />
        </motion.div>

        {/* Quote text with elegant typography */}
        <p className="italic text-sm sm:text-base leading-relaxed text-slate-700 font-serif-wedding max-w-lg mx-auto">
          "{quote.text}"
        </p>

        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-rose-300" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
            {quote.source}
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-rose-300" />
        </div>
      </motion.div>

      {/* Decorative Botanical Flourish Separator */}
      <div className="flex items-center justify-center gap-3 opacity-60 my-2 select-none">
        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-rose-300" />
        <span className="text-xs font-serif text-rose-400">❦ 🌸 ❦</span>
        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-rose-300" />
      </div>

      {/* Couple Profiles - Seamless Flowing Layout without bulky cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start py-2">
        {/* Groom Profile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex flex-col items-center text-center group"
        >
          {/* Groom Avatar with Radiant Aura */}
          <div className="relative mb-4">
            {/* Soft ambient aura */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full bg-gradient-to-tr from-sky-300 via-rose-200 to-blue-300 opacity-60 blur-xs"
            />

            {/* Glowing avatar frame */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-pink-300 to-rose-400 shadow-lg">
              <img
                src={groom.photo}
                alt={groom.name}
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Groom Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 flex items-center gap-1 border border-white"
            >
              <Sparkles className="w-3 h-3 text-sky-200" />
              <span className="text-[11px] font-bold tracking-wide">The Groom</span>
            </motion.div>
          </div>

          {/* Name & Titles */}
          <h3 className="text-xl font-bold font-serif-wedding text-slate-900 group-hover:text-rose-600 transition-colors">
            {groom.fullName}
          </h3>

          <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-[240px]">
            {groom.parents}
          </p>

          {/* Instagram Link */}
          <a
            href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all border border-slate-200/60 shadow-2xs group/ig cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-rose-500 group-hover/ig:scale-110 transition-transform" />
            <span>{groom.instagram}</span>
          </a>
        </motion.div>

        {/* Bride Profile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="flex flex-col items-center text-center group"
        >
          {/* Bride Avatar with Radiant Aura */}
          <div className="relative mb-4">
            {/* Soft ambient aura */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-full bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-200 opacity-60 blur-xs"
            />

            {/* Glowing avatar frame */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-300 shadow-lg">
              <img
                src={bride.photo}
                alt={bride.name}
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Bride Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.35 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/25 flex items-center gap-1 border border-white"
            >
              <Sparkles className="w-3 h-3 text-rose-200" />
              <span className="text-[11px] font-bold tracking-wide">The Bride</span>
            </motion.div>
          </div>

          {/* Name & Titles */}
          <h3 className="text-xl font-bold font-serif-wedding text-slate-900 group-hover:text-rose-600 transition-colors">
            {bride.fullName}
          </h3>

          <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-[240px]">
            {bride.parents}
          </p>

          {/* Instagram Link */}
          <a
            href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all border border-slate-200/60 shadow-2xs group/ig cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-pink-500 group-hover/ig:scale-110 transition-transform" />
            <span>{bride.instagram}</span>
          </a>
        </motion.div>
      </div>

      {/* Romantic Floral Garland & Heart Emblem at Bottom */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="pt-4 text-center select-none"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-rose-300" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 shadow-2xs">
            <span className="text-base">🌸</span>
            <span className="text-xs font-serif-wedding font-bold text-rose-600 tracking-wider">
              Two Souls, One Heart
            </span>
            <span className="text-base">🌸</span>
          </div>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-rose-300" />
        </div>
      </motion.div>
    </div>
  )
}
