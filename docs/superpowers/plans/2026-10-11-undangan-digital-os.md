# Undangan Digital Bertema OS (Windows 11 & Samsung One UI) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun website undangan pernikahan digital interaktif dengan dua antarmuka OS adaptif: Windows 11 untuk desktop (dilengkapi widget desktop acrylic, window manager draggable, dan hiasan polaroid) dan Samsung One UI 6.1 untuk mobile (wallpaper full-bleed foto prewedding, lock screen One UI, squircle widgets, dan bottom sheet modals), serta personalisasi nama tamu melalui parameter URL `?to=`.

**Architecture:** Arsitektur modular memisahkan data acara terpusat (`weddingData.ts`) dan logika state (`useGuest`, `useAudio`, `useDevice`, `useWishes`) dari antarmuka visual. Modul aplikasi (*AppCouple*, *AppEvents*, *AppGallery*, *AppRSVP*, *AppGift*) dibuat reusable sehingga dapat dirender di dalam *Windows 11 Draggable Window Frame* maupun *Samsung One UI Bottom Sheet Modal*.

**Tech Stack:** React 18 / 19, TypeScript, Vite, Tailwind CSS, Lucide React, Canvas-Confetti, Vitest & React Testing Library.

**Spec:** [`docs/superpowers/specs/2026-10-11-undangan-digital-os-design.md`](file:///Users/kholifanalfon/Sites/project/undangan-digital/docs/superpowers/specs/2026-10-11-undangan-digital-os-design.md)

## Global Constraints

- Full client-side static application (tanpa server database eksternal).
- Data RSVP dan ucapan doa tamu disimpan di `localStorage`.
- Nama tamu diparsing otomatis dari parameter URL `?to=...` atau `?guest=...`.
- Autoplay audio hanya dipicu saat pengguna melakukan interaksi pembuka kunci (*unlock lock screen*).
- Responsif terhadap breakpoint layar (`window.innerWidth >= 1024px` = Windows 11, `< 1024px` = Samsung One UI 6.1) disertai tombol floating toggle untuk pratinjau manual.
- Tidak melakukan git commit otomatis (biarkan perubahan dalam working tree untuk review pengguna).

---

### Task 1: Project Scaffolding & Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Test: `tests/setup.ts`
- Test: `tests/smoke.test.ts`

**Interfaces:**
- Produces: Lingkungan pengembangan React + Vite + Tailwind CSS yang dapat di-build (`npm run build`) dan ditest (`npm test`).

- [ ] **Step 1: Inisialisasi package.json dan instalasi dependencies**

Konfigurasi `package.json` dengan dependencies: `react`, `react-dom`, `lucide-react`, `canvas-confetti`, `@types/canvas-confetti`, `tailwindcss`, `autoprefixer`, `postcss`, `vite`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.

- [ ] **Step 2: Buat konfigurasi Vite, Tailwind, dan PostCSS**

Konfigurasi `vite.config.ts`, `tailwind.config.js`, dan `postcss.config.js` agar mendukung styling Tailwind dan testing berbasis jsdom.

- [ ] **Step 3: Buat tsconfig.json dan index.html**

Konfigurasi TypeScript compiler options dan HTML entry point yang memuat font modern (Inter / Plus Jakarta Sans) serta title dinamis.

- [ ] **Step 4: Buat src/index.css dan src/main.tsx**

Setup tailwind directives di `src/index.css` beserta custom styling glassmorphism / acrylic blur.

- [ ] **Step 5: Buat smoke test dan verifikasi**

Run: `npm test`
Expected: PASS untuk smoke test inisialisasi environment.

---

### Task 2: Core Data Models & State Hooks

**Files:**
- Create: `src/types/wedding.ts`
- Create: `src/data/weddingData.ts`
- Create: `src/hooks/useGuest.ts`
- Create: `src/hooks/useAudio.ts`
- Create: `src/hooks/useDevice.ts`
- Create: `src/hooks/useWishes.ts`
- Test: `tests/hooks.test.ts`

**Interfaces:**
- Produces:
  - `weddingData: WeddingConfig`
  - `useGuest(): { guestName: string }`
  - `useAudio(audioUrl: string): { isPlaying: boolean; play: () => void; pause: () => void; toggle: () => void; isMuted: boolean; toggleMute: () => void }`
  - `useDevice(): { isDesktop: boolean; activeOS: 'windows' | 'samsung'; toggleOS: () => void; setOS: (os: 'windows' | 'samsung') => void }`
  - `useWishes(): { wishes: WishItem[]; addWish: (wish: Omit<WishItem, 'id' | 'createdAt'>) => void }`

- [ ] **Step 1: Tulis unit test untuk useGuest, useWishes, dan useDevice di tests/hooks.test.ts**
- [ ] **Step 2: Jalankan test untuk memastikan test gagal (FAIL)**
- [ ] **Step 3: Implementasikan tipe data di src/types/wedding.ts dan data default di src/data/weddingData.ts**
- [ ] **Step 4: Implementasikan hooks di src/hooks/**
- [ ] **Step 5: Jalankan test dan pastikan semua lulus (PASS)**

---

### Task 3: Shared App Content Modules

**Files:**
- Create: `src/components/apps/AppCouple.tsx`
- Create: `src/components/apps/AppEvents.tsx`
- Create: `src/components/apps/AppGallery.tsx`
- Create: `src/components/apps/AppRSVP.tsx`
- Create: `src/components/apps/AppGift.tsx`
- Test: `tests/apps.test.tsx`

**Interfaces:**
- Produces: Komponen konten yang menerima data dari `weddingData` dan dapat dirender di dalam Window Desktop maupun Bottom Sheet Mobile.

- [ ] **Step 1: Tulis unit test untuk render AppCouple, AppEvents, AppRSVP, dan AppGift**
- [ ] **Step 2: Jalankan test untuk memverifikasi kegagalan awal**
- [ ] **Step 3: Implementasikan AppCouple (Profil mempelai pria & wanita, ortu, kutipan ayat)**
- [ ] **Step 4: Implementasikan AppEvents (Countdown akad & resepsi, tombol Save to Google Calendar, peta lokasi)**
- [ ] **Step 5: Implementasikan AppGallery (Grid foto prewedding dengan opsi klik zoom)**
- [ ] **Step 6: Implementasikan AppRSVP (Form konfirmasi kehadiran + daftar ucapan dengan LocalStorage & confetti feedback)**
- [ ] **Step 7: Implementasikan AppGift (No rekening bank dengan tombol copy-to-clipboard dan QRIS display)**
- [ ] **Step 8: Jalankan test dan pastikan lulus (PASS)**

---

### Task 4: Windows 11 Desktop Widgets & Polaroid Ornaments

**Files:**
- Create: `src/components/desktop/WinWidgets/WinAnalogClock.tsx`
- Create: `src/components/desktop/WinWidgets/WinLoveMeter.tsx`
- Create: `src/components/desktop/WinWidgets/WinCalendar.tsx`
- Create: `src/components/desktop/WinWidgets/WinWeather.tsx`
- Create: `src/components/desktop/WinWidgets/WinStickyNotes.tsx`
- Create: `src/components/desktop/WinPolaroid.tsx`
- Create: `src/components/common/LightboxModal.tsx`
- Test: `tests/widgets.test.tsx`

**Interfaces:**
- Produces:
  - Widget analog clock bulat dengan jarum detik real-time.
  - Love meter dual gauge widget sesuai referensi gambar pengguna.
  - Kalender mini dengan penanda hari pernikahan.
  - Weather widget kota Bandung/lokasi acara.
  - Sticky notes kuning transparan berisi kutipan romantis.
  - Frame polaroid miring dengan tekstur selotip washi tape dan interaksi klik-untuk-zoom (Lightbox).

- [ ] **Step 1: Tulis test pengujian render widget analog clock dan polaroid**
- [ ] **Step 2: Implementasikan widget-widget acrylic di src/components/desktop/WinWidgets/**
- [ ] **Step 3: Implementasikan WinPolaroid.tsx dan LightboxModal.tsx**
- [ ] **Step 4: Jalankan test dan pastikan lulus (PASS)**

---

### Task 5: Windows 11 Desktop Shell & Window Manager

**Files:**
- Create: `src/components/desktop/WinLockScreen.tsx`
- Create: `src/components/desktop/WinTaskbar.tsx`
- Create: `src/components/desktop/WinWindow.tsx`
- Create: `src/components/desktop/WinDesktop.tsx`
- Test: `tests/desktop.test.tsx`

**Interfaces:**
- Produces:
  - `WinLockScreen`: Jam besar, tanggal, badge penerima `?to=...`, tombol "Buka Undangan".
  - `WinTaskbar`: Start Menu button, Widgets button, app launch icons, System Tray (jam, status, volume controller).
  - `WinWindow`: Draggable window frame dengan Mica blur, minimize, maximize, close, active z-index focus.
  - `WinDesktop`: Menghubungkan wallpaper, widgets, polaroids, icon shortcut, dan window manager.

- [ ] **Step 1: Tulis test interaksi unlock dan window open/close**
- [ ] **Step 2: Implementasikan WinLockScreen.tsx**
- [ ] **Step 3: Implementasikan WinWindow.tsx (draggable window manager)**
- [ ] **Step 4: Implementasikan WinTaskbar.tsx**
- [ ] **Step 5: Integrasikan di WinDesktop.tsx**
- [ ] **Step 6: Jalankan test dan pastikan lulus (PASS)**

---

### Task 6: Samsung One UI 6.1 Mobile Shell

**Files:**
- Create: `src/components/mobile/SamsungStatusBar.tsx`
- Create: `src/components/mobile/SamsungLockScreen.tsx`
- Create: `src/components/mobile/SamsungWidgets.tsx`
- Create: `src/components/mobile/SamsungBottomSheet.tsx`
- Create: `src/components/mobile/SamsungHomeScreen.tsx`
- Test: `tests/mobile.test.tsx`

**Interfaces:**
- Produces:
  - `SamsungLockScreen`: Wallpaper foto prewedding full-bleed (tanpa polaroid), jam One UI tebal, kartu notifikasi squircle memuat nama tamu, gesture swipe-up to open.
  - `SamsungStatusBar`: Jam, 5G, Wi-Fi, baterai Samsung.
  - `SamsungWidgets`: Countdown card One UI, cuaca, Samsung Music mini controller.
  - `SamsungBottomSheet`: Modal card dengan drag handle dari bawah layar untuk membuka app content.
  - `SamsungHomeScreen`: Penggabungan status bar, widget squircle, app icons grid, dan bottom sheet manager.

- [ ] **Step 1: Tulis test render Samsung LockScreen dan pembukaan Bottom Sheet**
- [ ] **Step 2: Implementasikan SamsungStatusBar.tsx dan SamsungLockScreen.tsx**
- [ ] **Step 3: Implementasikan SamsungWidgets.tsx (Music Player, Countdown, Weather)**
- [ ] **Step 4: Implementasikan SamsungBottomSheet.tsx**
- [ ] **Step 5: Integrasikan di SamsungHomeScreen.tsx**
- [ ] **Step 6: Jalankan test dan pastikan lulus (PASS)**

---

### Task 7: App Integration, Device Switcher & Final Polish

**Files:**
- Create: `src/components/common/DeviceSwitcher.tsx`
- Modify: `src/App.tsx`
- Test: `tests/integration.test.tsx`

**Interfaces:**
- Produces: Aplikasi utuh yang mendeteksi resolusi layar, mendukung tombol toggle manual Desktop/Mobile, mengaktifkan audio pasca-unlock, dan siap build produksi (`npm run build`).

- [ ] **Step 1: Implementasikan DeviceSwitcher.tsx (floating pill icon di sudut layar)**
- [ ] **Step 2: Hubungkan semua modul di src/App.tsx**
- [ ] **Step 3: Tulis integration test untuk transisi unlock, navigasi app, dan audio state**
- [ ] **Step 4: Jalankan seluruh test suite (`npm test`)**
- [ ] **Step 5: Jalankan `npm run build` untuk memverifikasi tidak ada type error atau bundling error**
