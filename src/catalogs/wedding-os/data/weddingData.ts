import { WeddingConfig, WishItem } from '../types/wedding.ts'

export const weddingData: WeddingConfig = {
  couple: {
    groom: {
      name: 'Romeo',
      fullName: 'Romeo Montague, S.T.',
      parents: 'Putra pertama dari Bpk. William Montague & Ibu Mary Montague',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      instagram: '@romeomontague',
    },
    bride: {
      name: 'Juliet',
      fullName: 'Juliet Capulet, S.Ds.',
      parents: 'Putri kedua dari Bpk. Lord Capulet & Ibu Lady Capulet',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      instagram: '@julietcapulet',
    },
    quote: {
      text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
      source: 'QS. Ar-Rum: 21',
    },
  },
  stories: [
    {
      year: '2021',
      title: 'Pertemuan Pertama',
      story: 'Takdir mempertemukan kami di sebuah kedai kopi di Bandung. Senyuman sederhana berbuah percakapan hangat yang tak pernah kami sangka akan berlanjut sejauh ini.',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    },
    {
      year: '2023',
      title: 'Menjalin Komitmen',
      story: 'Setelah dua tahun berbagi tawa, impian, dan saling menguatkan di kala suka maupun duka, kami sepakat untuk melangkah ke jenjang yang lebih serius.',
      photo: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop&q=80',
    },
    {
      year: '2025',
      title: 'Momen Lamaran (The Proposal)',
      story: 'Di bawah hangatnya senja pantai, sebuah cincin tersemat sebagai simbol janji suci. She said YES! Momen tak terlupakan yang mengukir lembaran baru perjalanan cinta kami.',
      photo: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80',
    },
    {
      year: '2026',
      title: 'Menuju Hari Bahagia',
      story: 'Dengan restu kedua orang tua dan doa dari keluarga serta sahabat, kini kami siap mengikat janji suci pernikahan untuk mengarungi bahtera rumah tangga selamanya.',
      photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    },
  ],
  events: {
    akad: {
      title: 'Akad Nikah',
      date: 'Minggu, 25 Oktober 2026',
      time: '08:00 - 10:00 WIB',
      venue: 'Gedung Putih Grand Ballroom',
      address: 'Jl. Setiabudi No. 120, Sukasari, Kota Bandung, Jawa Barat',
      mapsUrl: 'https://maps.google.com/?q=Bandung',
    },
    resepsi: {
      title: 'Resepsi Pernikahan',
      date: 'Minggu, 25 Oktober 2026',
      time: '11:00 - 14:00 WIB',
      venue: 'Gedung Putih Grand Ballroom',
      address: 'Jl. Setiabudi No. 120, Sukasari, Kota Bandung, Jawa Barat',
      mapsUrl: 'https://maps.google.com/?q=Bandung',
    },
    targetDate: '2026-10-25T08:00:00+07:00',
  },
  venueWeather: {
    city: 'Bandung',
    temperature: '26°C',
    condition: 'Cerah Berawan',
    humidity: '65%',
  },
  gallery: [
    {
      id: 'g1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      caption: 'The Beginning of Our Forever',
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      caption: 'Hand in Hand Through Every Season',
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80',
      caption: 'Laughter & Pure Joy',
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop&q=80',
      caption: 'Our Special Promise',
    },
  ],
  polaroids: [
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80',
      caption: 'First Date in Paris 🗼',
      rotation: -5,
      position: { top: '15%', left: '4%' },
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&auto=format&fit=crop&q=80',
      caption: 'She said YES! 💍✨',
      rotation: 6,
      position: { top: '52%', left: '6%' },
    },
  ],
  gifts: [
    {
      bank: 'Bank Central Asia (BCA)',
      accountNumber: '8735091241',
      holderName: 'ROMEO MONTAGUE',
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: '1310023456789',
      holderName: 'JULIET CAPULET',
    },
  ],
  music: {
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    audioUrl: '/audio/wedding-song.mp3',
  },
}

export const initialWishes: WishItem[] = [
  {
    id: 'w1',
    name: 'Keluarga Bpk. H. Rahmat',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khoir. Semoga sakinah mawaddah warahmah.',
    presence: 'attending',
    createdAt: '2 jam yang lalu',
  },
  {
    id: 'w2',
    name: 'Dimas & Anisa',
    message: 'Selamat Romeo & Juliet! Lancar sampai hari H yaa!',
    presence: 'attending',
    createdAt: '4 jam yang lalu',
  },
]
