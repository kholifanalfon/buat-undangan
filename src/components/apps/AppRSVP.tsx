import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Send, CheckCircle2, XCircle, HelpCircle, MessageSquare } from 'lucide-react'
import { useWishes } from '../../hooks/useWishes.ts'
import { useGuest } from '../../hooks/useGuest.ts'

export const AppRSVP: React.FC = () => {
  const { guestName } = useGuest()
  const { wishes, addWish } = useWishes()

  const [name, setName] = useState(guestName !== 'Tamu Undangan' ? guestName : '')
  const [presence, setPresence] = useState<'attending' | 'not_attending' | 'tentative'>('attending')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    addWish({
      name: name.trim(),
      message: message.trim(),
      presence,
    })

    // Trigger sweet confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#e11d48'],
      })
    } catch {
      // Ignored in test environment
    }

    setMessage('')
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 text-slate-800">
      {/* RSVP Form - Seamless without bulky outer card */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-serif-wedding text-slate-900 mb-1">
            Konfirmasi Kehadiran & Doa Restu
          </h3>
          <p className="text-xs text-slate-500">
            Kehadiran dan doa restu Anda merupakan kado terindah bagi kami.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPresence('attending')}
                className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                  presence === 'attending'
                    ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Hadir</span>
              </button>
              <button
                type="button"
                onClick={() => setPresence('not_attending')}
                className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                  presence === 'not_attending'
                    ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Berhalangan</span>
              </button>
              <button
                type="button"
                onClick={() => setPresence('tentative')}
                className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                  presence === 'tentative'
                    ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Ragu</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Ucapan & Doa Restu
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan manis atau doa restu Anda..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-slate-50/50"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md hover:from-rose-600 hover:to-pink-700 active:scale-98 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Ucapan & RSVP</span>
          </button>

          {isSubmitted && (
            <p className="text-center text-xs font-semibold text-emerald-600 bg-emerald-50 py-2 rounded-lg border border-emerald-200">
              Terima kasih! Ucapan dan konfirmasi kehadiran Anda telah tersimpan.
            </p>
          )}
        </form>
      </div>

      {/* Wishes Feed - Seamless List Dividers instead of boxed cards */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs sm:text-sm">
          <MessageSquare className="w-4 h-4 text-rose-500" />
          <span>Ucapan dari Sahabat & Kerabat ({wishes.length})</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-1">
          {wishes.map(wish => (
            <div
              key={wish.id}
              className="py-3 first:pt-1 last:pb-1 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-slate-900">{wish.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    wish.presence === 'attending'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                      : wish.presence === 'not_attending'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  }`}
                >
                  {wish.presence === 'attending'
                    ? 'Hadir'
                    : wish.presence === 'not_attending'
                    ? 'Berhalangan'
                    : 'Ragu'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{wish.message}</p>
              <span className="block text-[10px] text-slate-400">{wish.createdAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
