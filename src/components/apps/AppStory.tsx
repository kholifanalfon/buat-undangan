import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Calendar, BookHeart, Compass, Clock } from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'

export const AppStory: React.FC = () => {
  const stories = weddingData.stories || []

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-8 text-slate-800">
      {/* Animated Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center space-y-2 pb-2"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-200/80 text-rose-700 text-xs font-bold uppercase tracking-wider shadow-xs">
          <BookHeart className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span>Perjalanan Cinta Kami</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-serif-wedding text-slate-900 tracking-wide">
          Our Love Story
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Setiap detik kebersamaan adalah untaian doa dan cerita indah yang mengantarkan kami menuju ikatan suci ini.
        </p>

        <div className="flex items-center justify-center gap-2 pt-1 text-slate-400 text-xs">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-[11px] font-medium tracking-wide">Scroll ke bawah untuk membaca linimasa</span>
        </div>
      </motion.div>

      {/* Timeline Container with Animated Growing Beam */}
      <div className="relative ml-4 sm:ml-8 pl-6 sm:pl-9 space-y-10">
        {/* Animated Timeline Stem Line */}
        <div className="absolute left-0 top-3 bottom-6 w-0.5 bg-gradient-to-b from-rose-400 via-pink-400 to-rose-200" />

        {stories.map((item, index) => {
          const isEven = index % 2 === 0

          return (
            <motion.div
              key={item.year}
              initial={{
                opacity: 0,
                y: 35,
                rotate: isEven ? -1.5 : 1.5,
                scale: 0.92,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{
                type: 'spring',
                damping: 22,
                stiffness: 180,
                mass: 0.9,
              }}
              className="relative group"
            >
              {/* Timeline Pulsing Node with Floating Aura */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: 'spring', delay: 0.1, stiffness: 260, damping: 15 }}
                className="absolute -left-[35px] sm:-left-[47px] top-2.5 z-10 flex items-center justify-center"
              >
                {/* Glow ring */}
                <div className="absolute w-8 h-8 rounded-full bg-rose-400/30 animate-ping pointer-events-none" />

                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 border-4 border-white shadow-lg flex items-center justify-center text-white">
                  <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                </div>
              </motion.div>

              {/* Story Card with Parallax-like Glow & Border Shimmer */}
              <div className="relative overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-rose-100/90 shadow-xl shadow-rose-950/5 transition-all duration-300 group-hover:shadow-2xl group-hover:border-rose-300/80 group-hover:-translate-y-1.5">
                {/* Subtle gradient corner illumination */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-rose-100/40 via-pink-100/20 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                {/* Year Pill & Milestone Tag */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-extrabold tracking-wider inline-flex items-center gap-1.5 shadow-sm shadow-rose-500/20">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500/80 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-300 animate-pulse" />
                    <span>Chapter 0{index + 1}</span>
                  </span>
                </div>

                {/* Milestone Title */}
                <h4 className="text-lg sm:text-xl font-bold font-serif-wedding text-slate-900 mb-3 group-hover:text-rose-600 transition-colors leading-snug">
                  {item.title}
                </h4>

                {/* Photo with Smooth Hover Zoom */}
                {item.photo && (
                  <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-4 bg-slate-100 shadow-inner group/photo">
                    <img
                      src={item.photo}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/photo:scale-108 group-hover:scale-105"
                    />
                    {/* Soft vignette overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {/* Story Description Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans relative z-10">
                  {item.story}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Animated Closing Milestone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="text-center pt-6 pb-4"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 text-white shadow-xl shadow-rose-500/30 mb-2">
          <Compass className="w-6 h-6 animate-spin [animation-duration:12s]" />
        </div>
        <p className="text-rose-600 font-handwriting text-2xl font-bold tracking-wide">
          "And so our forever begins..." ✨
        </p>
        <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-semibold">
          Romeo & Juliet • 2026
        </p>
      </motion.div>
    </div>
  )
}
