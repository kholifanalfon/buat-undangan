export interface CoupleProfile {
  name: string
  fullName: string
  parents: string
  photo: string
  instagram: string
}

export interface WeddingEvent {
  title: string
  date: string
  time: string
  venue: string
  address: string
  mapsUrl: string
}

export interface PolaroidPhoto {
  id: string
  url: string
  caption: string
  rotation: number
  position: { top: string; left: string }
}

export interface BankGift {
  bank: string
  accountNumber: string
  holderName: string
  logo?: string
  qrisUrl?: string
}

export interface WishItem {
  id: string
  name: string
  message: string
  presence: 'attending' | 'not_attending' | 'tentative'
  createdAt: string
}

export interface LoveStoryMilestone {
  year: string
  title: string
  story: string
  photo?: string
  icon?: string
}

export interface WeddingConfig {
  couple: {
    groom: CoupleProfile
    bride: CoupleProfile
    quote: {
      text: string
      source: string
    }
  }
  stories?: LoveStoryMilestone[]
  events: {
    akad: WeddingEvent
    resepsi: WeddingEvent
    targetDate: string // ISO format for countdown
  }
  venueWeather: {
    city: string
    temperature: string
    condition: string
    humidity: string
  }
  gallery: Array<{
    id: string
    url: string
    caption: string
  }>
  polaroids: PolaroidPhoto[]
  gifts: BankGift[]
  music: {
    title: string
    artist: string
    audioUrl: string
  }
}
