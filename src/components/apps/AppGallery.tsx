import React, { useState } from 'react'
import { ZoomIn } from 'lucide-react'
import { weddingData } from '../../data/weddingData.ts'
import { LightboxModal } from '../common/LightboxModal.tsx'
import { useDevice } from '../../hooks/useDevice.ts'

export const AppGallery: React.FC = () => {
  const { activeOS } = useDevice()
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState<number | null>(null)

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 text-slate-800">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold font-serif-wedding text-slate-900">Sweet Memories</h3>
        <p className="text-xs text-slate-500">Momen kebersamaan yang terukir dalam perjalanan cinta kami</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {weddingData.gallery.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setCurrentGalleryIdx(index)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-100 shadow-sm aspect-4/3"
          >
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-white text-center">
              <ZoomIn className="w-6 h-6 mb-1 text-rose-300" />
              <p className="text-xs font-medium">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Themed Lightbox Preview with next/prev & bottom thumbnails */}
      <LightboxModal
        isOpen={currentGalleryIdx !== null}
        photos={weddingData.gallery}
        currentIndex={currentGalleryIdx ?? 0}
        onIndexChange={idx => setCurrentGalleryIdx(idx)}
        photoUrl={currentGalleryIdx !== null ? weddingData.gallery[currentGalleryIdx]?.url : null}
        caption={currentGalleryIdx !== null ? weddingData.gallery[currentGalleryIdx]?.caption : undefined}
        onClose={() => setCurrentGalleryIdx(null)}
        activeOS={activeOS}
      />
    </div>
  )
}
