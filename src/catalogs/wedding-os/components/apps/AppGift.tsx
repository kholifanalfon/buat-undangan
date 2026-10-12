import React, { useState } from 'react'
import { Gift, Copy, Check } from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'

export const AppGift: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber)
    setCopiedAccount(accountNumber)
    setTimeout(() => setCopiedAccount(null), 2500)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 text-slate-800">
      <div className="text-center space-y-1">
        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500 mb-2">
          <Gift className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold font-serif-wedding text-slate-900">Tanda Kasih (Amplop Digital)</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Doa restu Anda merupakan kado terindah bagi kami. Namun jika Anda ingin memberikan hadiah tanda kasih, kami menyediakan amplop digital di bawah ini.
        </p>
      </div>

      {/* Bank Account Cards */}
      <div className="space-y-4">
        {weddingData.gifts.map((gift, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden"
          >
            {/* Subtle decorative circles */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute right-12 top-2 w-16 h-16 bg-white/5 rounded-full pointer-events-none" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
                {gift.bank}
              </span>
              <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">
                Digital Envelope
              </span>
            </div>

            <div className="space-y-1 mb-4">
              <p className="text-xl md:text-2xl font-mono font-bold tracking-wider text-rose-300">
                {gift.accountNumber}
              </p>
              <p className="text-xs text-slate-300 font-medium tracking-wide">
                a.n {gift.holderName}
              </p>
            </div>

            <button
              onClick={() => handleCopy(gift.accountNumber)}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-xl text-xs font-semibold tracking-wide transition border border-white/10 cursor-pointer"
            >
              {copiedAccount === gift.accountNumber ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Nomor Rekening Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Salin Nomor Rekening</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
