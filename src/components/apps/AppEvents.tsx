import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'

export const AppEvents: React.FC = () => {
  const { akad, resepsi, targetDate } = weddingData.events

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const createGoogleCalendarUrl = (title: string) => {
    // 20261025T010000Z format
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title + ' - Romeo & Juliet Wedding'
    )}&dates=20261025T010000Z/20261025T070000Z&details=${encodeURIComponent(
      'Pernikahan Romeo & Juliet di Gedung Putih Grand Ballroom Bandung'
    )}&location=${encodeURIComponent('Gedung Putih Grand Ballroom Bandung')}`
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 text-slate-800">
      {/* Countdown Hero */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl p-6 text-center shadow-lg">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-100 mb-4">
          Menuju Hari Bahagia
        </h3>
        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
            <span className="block text-2xl md:text-3xl font-extrabold">{timeLeft.days}</span>
            <span className="text-[10px] md:text-xs text-rose-100 uppercase tracking-wider">Hari</span>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
            <span className="block text-2xl md:text-3xl font-extrabold">{timeLeft.hours}</span>
            <span className="text-[10px] md:text-xs text-rose-100 uppercase tracking-wider">Jam</span>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
            <span className="block text-2xl md:text-3xl font-extrabold">{timeLeft.minutes}</span>
            <span className="text-[10px] md:text-xs text-rose-100 uppercase tracking-wider">Menit</span>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
            <span className="block text-2xl md:text-3xl font-extrabold">{timeLeft.seconds}</span>
            <span className="text-[10px] md:text-xs text-rose-100 uppercase tracking-wider">Detik</span>
          </div>
        </div>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Akad */}
        <div className="bg-white/70 border border-slate-100 p-5 rounded-2xl shadow-sm backdrop-blur-sm space-y-3">
          <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
            {akad.title}
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{akad.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{akad.time}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">{akad.venue}</p>
                <p className="text-xs text-slate-500">{akad.address}</p>
              </div>
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <a
              href={akad.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-xl transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Google Maps
            </a>
          </div>
        </div>

        {/* Resepsi */}
        <div className="bg-white/70 border border-slate-100 p-5 rounded-2xl shadow-sm backdrop-blur-sm space-y-3">
          <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-semibold rounded-full">
            {resepsi.title}
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{resepsi.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{resepsi.time}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">{resepsi.venue}</p>
                <p className="text-xs text-slate-500">{resepsi.address}</p>
              </div>
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <a
              href={createGoogleCalendarUrl(resepsi.title)}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium rounded-xl transition shadow-sm"
            >
              <CalendarPlus className="w-3.5 h-3.5" /> Save to Calendar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
