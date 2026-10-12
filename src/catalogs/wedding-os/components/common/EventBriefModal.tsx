import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Heart, X, Sparkles, Minus, Square, CalendarCheck, PartyPopper, Gift, MessageSquare } from "lucide-react";
import { weddingData } from "../../data/weddingData.ts";
import { OSType } from "../../hooks/useDevice.ts";
import { AnimatedContinuousText, AnimatedWordReveal } from "./AnimatedText.tsx";

interface EventBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOS: OSType;
  onOpenRSVP?: () => void;
  onOpenGift?: () => void;
}

export const EventBriefModal: React.FC<EventBriefModalProps> = ({ isOpen, onClose, activeOS, onOpenRSVP, onOpenGift }) => {
  if (!isOpen) return null;

  const prewedPhoto = weddingData.polaroids[0] || {
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80",
    caption: "Our Special Moment ✨",
  };

  /* =========================================================================
     WINDOWS 11 MICA / FLUENT DESIGN DIALOG
     ========================================================================= */
  if (activeOS === "windows") {
    return (
      <AnimatePresence>
        <div
          role="dialog"
          aria-modal="true"
          data-testid="win-event-dialog"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.88, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden ring-1 ring-black/10 select-none"
          >
            {/* Windows 11 Fluent Titlebar */}
            <div className="h-10 px-4 bg-slate-100/90 border-b border-slate-200/70 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xs">
                  <Heart className="w-3 h-3 fill-current" />
                </div>
                <span className="text-xs font-semibold text-slate-800 tracking-tight">Informasi Acara Pernikahan</span>
              </div>

              {/* Windows 11 Caption Controls */}
              <div className="flex items-center space-x-1">
                <button onClick={onClose} className="w-8 h-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-600 transition" aria-label="Minimize">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button onClick={onClose} className="w-8 h-7 rounded hover:bg-slate-200 flex items-center justify-center text-slate-600 transition" aria-label="Maximize">
                  <Square className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-7 rounded hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-600 transition"
                  aria-label="Tutup"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Windows 11 Dialog Body */}
            <div className="p-6 space-y-5 bg-gradient-to-b from-white/80 to-slate-50/70 max-h-[82vh] overflow-y-auto">
              {/* Header with Prewedding Polaroid & Rich Animated Intro */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 border border-rose-200/60">
                {/* Polaroid Card with Spring Bounce Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  transition={{ type: "spring", damping: 14, stiffness: 180, delay: 0.15 }}
                  className="relative group shrink-0"
                >
                  {/* Washi tape */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-rose-200/80 backdrop-blur-xs -rotate-2 z-10 shadow-xs border border-rose-300/40" />

                  <div className="w-32 bg-white p-2 pb-3.5 shadow-xl rounded-sm border border-slate-200/80 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105">
                    <div className="w-full h-28 bg-slate-100 overflow-hidden rounded-xs mb-2">
                      <img src={prewedPhoto.url} alt={prewedPhoto.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <p className="text-center font-handwriting text-slate-800 text-xs font-semibold leading-tight line-clamp-1">{prewedPhoto.caption}</p>
                  </div>
                </motion.div>

                {/* Kinetic Typography Section */}
                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100/80 text-rose-700 text-[10px] font-bold uppercase tracking-wider"
                  >
                    <Sparkles className="w-3 h-3 text-rose-500" />
                    <span>The Wedding Celebration</span>
                  </motion.div>

                  {/* Continuous Wavy Animated Typography */}
                  <div className="block text-2xl md:text-3xl font-bold font-serif-wedding text-slate-900 tracking-wide">
                    <AnimatedContinuousText text={`${weddingData.couple.groom.name} & ${weddingData.couple.bride.name}`} delay={0.25} />
                  </div>

                  {/* Word-by-word Animated Date */}
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-xs font-semibold text-rose-600">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <AnimatedWordReveal text={weddingData.events.akad.date} delay={0.45} staggerChildren={0.05} />
                  </div>

                  {/* Word-by-word Animated Invitation Note */}
                  <AnimatedWordReveal
                    text="Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu di hari bahagia kami."
                    className="text-[11px] text-slate-500 leading-relaxed pt-1"
                    delay={0.6}
                    staggerChildren={0.025}
                  />
                </div>
              </div>

              {/* Agenda Timeline Card with Spring Pop */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, type: "spring", damping: 15 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs hover:border-rose-300 transition">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 mb-1.5">
                    <CalendarCheck className="w-4 h-4" />
                    <span>Akad Nikah</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{weddingData.events.akad.time}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{weddingData.events.akad.venue}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs hover:border-pink-300 transition">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-pink-600 mb-1.5">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    <span>Resepsi</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{weddingData.events.resepsi.time}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">Grand Ballroom</p>
                </div>
              </motion.div>

              {/* Location Section */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, type: "spring", damping: 15 }}
                className="p-3.5 rounded-xl bg-white/90 border border-slate-200/80 flex items-start gap-3 shadow-xs"
              >
                <div className="p-2 rounded-lg bg-rose-50 text-rose-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-bold text-slate-800">{weddingData.events.akad.venue}</p>
                  <p className="mt-0.5 leading-relaxed text-slate-500">{weddingData.events.akad.address}</p>
                </div>
              </motion.div>

              {/* Windows 11 Quick Action Buttons (RSVP & Amplop) */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onOpenRSVP?.();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-98 text-white text-xs font-semibold shadow-md shadow-rose-500/20 transition flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span>Konfirmasi Kehadiran</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenGift?.();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50/80 active:scale-98 text-rose-600 text-xs font-semibold border border-rose-200/80 hover:border-rose-300 shadow-xs transition flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Gift className="w-3.5 h-3.5 transition-transform group-hover:scale-110 text-rose-500" />
                  <span>Kirim Amplop</span>
                </button>
              </motion.div>

              {/* Windows 11 Footer Controls */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200/60"
              >
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 active:scale-98 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <PartyPopper className="w-3.5 h-3.5" />
                  <span>Jelajahi Desktop</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  /* =========================================================================
     SAMSUNG ONE UI 6.1 SQUIRCLE POPUP DIALOG
     ========================================================================= */
  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        data-testid="samsung-event-dialog"
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 240 }}
          className="relative w-full max-w-sm bg-white/95 backdrop-blur-2xl text-slate-800 rounded-[32px] p-5 shadow-2xl border border-rose-100/80 max-h-[88vh] overflow-y-auto select-none ring-1 ring-slate-900/5"
        >
          {/* Top One UI Squircle Icon & Close (Light Theme) */}
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">SAMSUNG CALENDAR</span>
                <span className="text-[11px] text-slate-400 font-medium block">Event Reminder</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-600 transition shadow-xs"
              aria-label="Tutup"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Polaroid Prewed Centerpiece (Light Theme) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 180, delay: 0.15 }}
            className="flex justify-center mb-3"
          >
            <div className="relative group">
              {/* Pink Tape at top center */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-rose-200/90 backdrop-blur-xs z-10 shadow-xs border border-rose-300/40 rounded-xs" />

              <div className="w-36 bg-white text-slate-800 p-2 pb-3.5 shadow-xl rounded-sm border border-slate-200/80 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-32 bg-slate-100 overflow-hidden rounded-xs mb-1.5">
                  <img
                    src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80"
                    alt="First Date in Paris"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="text-center font-handwriting text-[12px] font-bold leading-tight line-clamp-1 text-slate-800">First Date in Paris 🗼</p>
              </div>
            </div>
          </motion.div>

          {/* Romeo & Juliet Continuous Wavy Title (Light Theme) */}
          <div className="text-center mb-3.5 space-y-0.5">
            <div className="block text-2xl font-bold font-serif-wedding text-slate-900 tracking-wide">
              <AnimatedContinuousText text={`${weddingData.couple.groom.name} & ${weddingData.couple.bride.name}`} delay={0.25} />
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-rose-600 font-bold tracking-wide">
              <AnimatedWordReveal text={weddingData.events.akad.date} delay={0.4} staggerChildren={0.05} />
            </div>
          </div>

          {/* Squircle Cards for Details (Light Theme) */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: "spring", damping: 16 }} className="space-y-2 mb-4">
            {/* Time Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 shadow-xs flex items-center justify-between text-slate-900">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-rose-500 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Akad & Resepsi</p>
                  <p className="text-xs font-bold text-slate-900">08:00 - 14:00 WIB</p>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold border border-rose-200">WIB</span>
            </div>

            {/* Venue Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 shadow-xs flex items-start gap-2.5 text-slate-900">
              <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold text-slate-900 text-xs">{weddingData.events.akad.venue}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{weddingData.events.akad.address}</p>
              </div>
            </div>
          </motion.div>

          {/* Samsung One UI Quick Actions (RSVP & Amplop Digital) */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }} className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                onClose();
                onOpenRSVP?.();
              }}
              className="py-3 px-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">Kirim Ucapan</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenGift?.();
              }}
              className="py-3 px-3 rounded-2xl bg-rose-50 hover:bg-rose-100/80 active:scale-95 text-rose-600 font-bold text-xs border border-rose-200/80 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Gift className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">Kirim Amplop</span>
            </button>
          </motion.div>

          {/* Action Pill Buttons (Light Theme) */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }} className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-semibold text-xs transition tracking-wide cursor-pointer"
            >
              Nanti Saja
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
