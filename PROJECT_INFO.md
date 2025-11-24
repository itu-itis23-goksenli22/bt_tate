# AI SCALE Project - Tüm Bilgiler

## 🌐 Deployment URLs

### Production Site
- **Vercel URL:** https://tate-jncr6ilrc-bahas-projects-554ef70d.vercel.app
- **GitHub Repo:** https://github.com/bahakizil/bt_tate

### Checkout URL
- **Circle.so Checkout:** https://ai-scale.circle.so/checkout/aiscaleapp-aylik

---

## 🔑 Environment Variables

### Supabase Credentials
```env
NEXT_PUBLIC_SUPABASE_URL=https://sutwdchlbrukrnygspbg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dHdkY2hsYnJ1a3JueWdzcGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzQyOTgsImV4cCI6MjA3OTU1MDI5OH0.b4adt9H6YJUj8563cJFJ9jc8OiuqkL59SVEYLdZ0paU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dHdkY2hsYnJ1a3JueWdzcGJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mzk3NDI5OCwiZXhwIjoyMDc5NTUwMjk4fQ.Zzcgtgi_qisRQM4bJs3_xIWjd7gk0PfHCVa_xXwCooM
```

### Vercel'de Kayıtlı Environment Variables
✅ Production ortamında eklenmiş:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🎥 Embedded Videos

### Hero Section Video
- **Platform:** YouTube
- **Video ID:** qQbl1YPaI7k
- **Start Time:** 335 seconds (5:35)
- **Full Embed URL:** https://www.youtube.com/embed/qQbl1YPaI7k?start=335
- **Lokasyon:** `components/HeroSection.tsx` (satır 43)

### Video Modal Placeholders
- **Lokasyon:** `components/WhatIsSection.tsx`
- **Durum:** Placeholder'lar mevcut, gerçek video URL'leri henüz eklenmedi
- **Video Sayısı:** 5 placeholder video kartı

---

## 🗂️ Supabase Storage

### Images Bucket
- **Bucket Adı:** `images`
- **Public Access:** Evet
- **Yüklenen Görseller:**
  - `logo.png` (Untitled design.png'den yüklendi)

### Storage URL Yapısı
```
https://sutwdchlbrukrnygspbg.supabase.co/storage/v1/object/public/images/{dosya-adi}
```

### Görsel Eklemek İçin:
```bash
# 1. Görseli projeye ekle
# 2. scripts/upload-images.ts dosyasını güncelle
# 3. Komutu çalıştır:
npm run upload-images
```

---

## 🔗 Internal Links (Site İçi Navigasyon)

### Navbar Links
- `#ozellikler` → Özellikler bölümü
- `#moduller` → Modüller bölümü
- `#paketler` → Paketler/Pricing bölümü

---

## 🛠️ Yararlı Komutlar

### Development
```bash
npm run dev          # Dev server başlat
npm run build        # Production build
npm run start        # Production server başlat
```

### Supabase İşlemleri
```bash
npm run create-bucket    # Storage bucket oluştur
npm run upload-images    # Görselleri Supabase'e yükle
```

### Deployment
```bash
git add .
git commit -m "message"
git push                 # GitHub'a push

vercel --prod           # Vercel'e production deploy
vercel env ls           # Vercel env variables listele
```

---

## 📊 Supabase Dashboard Linkleri

- **Project Dashboard:** https://supabase.com/dashboard/project/sutwdchlbrukrnygspbg
- **Storage:** https://supabase.com/dashboard/project/sutwdchlbrukrnygspbg/storage/buckets
- **API Settings:** https://supabase.com/dashboard/project/sutwdchlbrukrnygspbg/settings/api

---

## 🎯 CTA Button Yönlendirmeleri

Tüm call-to-action butonları şu URL'e yönlendiriliyor:
**https://ai-scale.circle.so/checkout/aiscaleapp-aylik**

### Buton Konumları:
1. Navbar - "Hemen Başla"
2. Pricing Section - "Şimdi Başla"
3. Kickstart Section - "Yolculuğumu Başlat"
4. Email Form Section - Form submit
5. Footer - "Hemen Katıl"
6. Two Paths Section - "Bu Yolu Seçin"
7. Access Section - "Hemen Erişim Sağla"
8. Motivation Section - "Evet, Hazırım!"
9. Services Section - "Hizmet Oluştur"

---

## 📝 Notlar

- Site Next.js 14 ile geliştirildi
- Tailwind CSS kullanıldı
- Tüm görseller Supabase Storage'da
- Environment variables Vercel'de güvenli şekilde saklanıyor
- Git repository GitHub'da public olarak paylaşılıyor

---

**Son Güncelleme:** 2025-11-24
