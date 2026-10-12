import { useState } from 'react'
import {
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  Star,
  Eye,
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartHandshake
} from 'lucide-react'
import { CATALOG_PRODUCTS } from '../catalog-data.ts'

interface CatalogHomeProps {
  onSelectProduct: (productId: string) => void
}

export function CatalogHome({ onSelectProduct }: CatalogHomeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', 'Wedding', 'Birthday', 'Formal', 'Event']

  const filteredProducts = CATALOG_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Background Decorative Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-[130px]" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                UndanganStudio
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Katalog Produk
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#catalog-list"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block"
            >
              Lihat Desain
            </a>
            <button
              onClick={() => onSelectProduct('wedding-os')}
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-md shadow-rose-500/25 transition active:scale-95 flex items-center gap-1.5"
            >
              <span>Demo Wedding OS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-12 sm:pt-24 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs text-rose-300 mb-6 backdrop-blur shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Koleksi Template Undangan Digital Interaktif Generasi Baru</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Buat Momen Berharga Anda Lebih Berkesan dengan{' '}
          <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Desain Interaktif
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Pilihan template undangan digital responsif berteknologi modern. Dari antarmuka sistem operasi
          unik (Windows 11 & Samsung One UI) hingga gaya editorial minimalis.
        </p>

        {/* Search & Category Filter Bar */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari tema, fitur (mis: OS, Rustic, Polaroid)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/60 text-slate-200 placeholder-slate-500 text-sm pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/60 transition"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product List Grid */}
      <section id="catalog-list" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Katalog Template</h2>
            <p className="text-sm text-slate-400 mt-1">
              Menampilkan {filteredProducts.length} desain pilihan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              {/* Product Thumbnail Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img
                  src={product.thumbnailUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow-md backdrop-blur-md ${
                      product.badge === 'Best Seller'
                        ? 'bg-rose-500/90 text-white'
                        : 'bg-indigo-600/90 text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Category tag */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-950/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
                    {product.category}
                  </span>
                </div>

                {/* Quick action button overlay */}
                {product.available ? (
                  <button
                    onClick={() => onSelectProduct(product.id)}
                    className="absolute inset-0 m-auto w-36 h-11 rounded-xl bg-slate-950/80 hover:bg-slate-950 text-white font-medium text-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-slate-700 shadow-xl backdrop-blur-md scale-95 group-hover:scale-100"
                  >
                    <Eye className="w-4 h-4 text-rose-400" />
                    <span>Live Preview</span>
                  </button>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 backdrop-blur-[2px]">
                    <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      Sedang Dipersiapkan
                    </span>
                  </div>
                )}
              </div>

              {/* Product Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
                    <div className="flex items-center">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="ml-1 font-semibold text-slate-200">{product.rating}</span>
                    </div>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">({product.reviewsCount} ulasan)</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-indigo-300 font-medium mt-1 mb-3">{product.subtitle}</p>

                  <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-5">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs text-slate-500 block">Mulai dari</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-white">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {product.available ? (
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition shadow-sm active:scale-95 flex items-center gap-1.5"
                    >
                      <span>Buka Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60"
                    >
                      Segera Hadir
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="relative z-10 border-t border-slate-800/80 bg-slate-900/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-1">Cepat & Ringan</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Dioptimalkan untuk kecepatan loading kilat di semua perangkat, irit kuota, dan responsif.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-1">Kustomisasi Mudah</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Data mempelai, foto, lagu, lokasi Google Maps, dan rekening amplop digital mudah diatur.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-1">Dukungan Responsif</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Bisa diintegrasikan ke WhatsApp blasting tamu dan Google Spreadsheet untuk data RSVP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} UndanganStudio. Katalog Undangan Digital Interaktif.</p>
      </footer>
    </div>
  )
}
