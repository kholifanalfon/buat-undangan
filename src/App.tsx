import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { CatalogHome } from './components/CatalogHome.tsx'
import { WeddingOSApp } from './catalogs/wedding-os/WeddingOSApp.tsx'

export default function App() {
  // Sync state with URL hash (e.g. #/ or #/preview/wedding-os)
  const getProductFromHash = () => {
    const hash = window.location.hash
    if (hash.startsWith('#/preview/')) {
      return hash.replace('#/preview/', '')
    }
    return null
  }

  const [activeProductId, setActiveProductId] = useState<string | null>(getProductFromHash)

  useEffect(() => {
    const handleHashChange = () => {
      setActiveProductId(getProductFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSelectProduct = (productId: string) => {
    window.location.hash = `#/preview/${productId}`
    setActiveProductId(productId)
  }

  const handleBackToCatalog = () => {
    window.location.hash = '#/'
    setActiveProductId(null)
  }

  return (
    <div className="w-full min-h-screen bg-slate-950">
      {activeProductId === 'wedding-os' ? (
        <div className="relative w-full h-screen overflow-hidden">
          {/* Floating Back to Catalog bar */}
          <div className="fixed top-3 left-3 z-[9999] pointer-events-auto">
            <button
              onClick={handleBackToCatalog}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 text-white text-xs font-semibold shadow-2xl backdrop-blur-md transition-all duration-200 active:scale-95"
              title="Kembali ke Katalog Produk"
            >
              <ArrowLeft className="w-4 h-4 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali ke Katalog</span>
            </button>
          </div>

          {/* Render Wedding OS Edition Template */}
          <WeddingOSApp />
        </div>
      ) : (
        <CatalogHome onSelectProduct={handleSelectProduct} />
      )}
    </div>
  )
}
