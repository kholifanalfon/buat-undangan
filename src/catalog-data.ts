export interface ProductCatalogItem {
  id: string
  title: string
  subtitle: string
  category: 'Wedding' | 'Birthday' | 'Formal' | 'Event'
  theme: string
  badge: string
  rating: number
  reviewsCount: number
  price: string
  originalPrice?: string
  description: string
  features: string[]
  tags: string[]
  thumbnailUrl: string
  available: boolean
}

export const CATALOG_PRODUCTS: ProductCatalogItem[] = [
  {
    id: 'wedding-os',
    title: 'Wedding OS Edition',
    subtitle: 'Dual Interface: Windows 11 Desktop & Samsung One UI Mobile',
    category: 'Wedding',
    theme: 'Interactive Operating System',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 128,
    price: 'Rp 249.000',
    originalPrice: 'Rp 399.000',
    description:
      'Undangan pernikahan interaktif bertema sistem operasi modern. Pengalaman unik dengan dual-mode: Windows 11 Fluency di desktop & Samsung One UI di smartphone.',
    features: [
      'Dual OS Experience (Windows 11 & Samsung One UI)',
      'Lock Screen Interaktif dengan Foto Pasangan',
      'App Pemutar Musik & Lirik Interaktif',
      'App Countdown, RSVP Real-time & Amplop Digital',
      'Galeri Foto Polaroid & Love Story Timeline',
      'Responsive & Halus dengan Framer Motion',
    ],
    tags: ['Windows 11', 'Samsung One UI', 'Interactive', 'Music Player', 'RSVP'],
    thumbnailUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    available: true,
  },
  {
    id: 'floral-botanical',
    title: 'Floral Botanical Elegance',
    subtitle: 'Sentuhan Floral Mewah dengan Animasi Watercolor Emas',
    category: 'Wedding',
    theme: 'Elegance & Botanical',
    badge: 'Coming Soon',
    rating: 4.8,
    reviewsCount: 94,
    price: 'Rp 199.000',
    originalPrice: 'Rp 299.000',
    description:
      'Desain bertema dedaunan botanical hijau sage dengan ornamen foil emas berkilau. Cocok untuk pernikahan outdoor, rustic, maupun intimate wedding.',
    features: [
      'Animasi Bunga & Daun Berguguran Halus',
      'Audio Background Autoplay & Mute Control',
      'Integrasi Google Maps & Calendar Reminder',
      'QR Code Check-in Tamu Terintegrasi',
    ],
    tags: ['Rustic', 'Botanical', 'Gold Foil', 'Intimate'],
    thumbnailUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    available: false,
  },
  {
    id: 'minimalist-monochrome',
    title: 'Modern Minimalist Typography',
    subtitle: 'Tipografi Editorial Modern, Bersih dan Sangat Elegan',
    category: 'Wedding',
    theme: 'Clean Editorial',
    badge: 'Coming Soon',
    rating: 4.7,
    reviewsCount: 76,
    price: 'Rp 179.000',
    originalPrice: 'Rp 250.000',
    description:
      'Gaya majalah mode kontemporer dengan tipografi serif elegan, tata letak grid minimalis, dan transisi halaman yang lembut.',
    features: [
      'Layout Editorial Majalah Vogue / Harper',
      'Dark & Light Mode Toggle',
      'Galeri Foto Fullscreen Grid',
      'Form Ucapan & Doa Tamu',
    ],
    tags: ['Minimalist', 'Editorial', 'Monochrome', 'Serif'],
    thumbnailUrl:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    available: false,
  },
]
