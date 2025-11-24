# 📧 Email Sistemi Kurulum Rehberi

Bu rehber, landing page'inizdeki email formunun çalışması için gerekli tüm adımları **adım adım** anlatıyor.

---

## 🎯 Sistem Nasıl Çalışıyor?

1. Kullanıcı email adresini giriyor
2. Email **Supabase database**'e kaydediliyor
3. Kullanıcıya **otomatik email** gidiyor
4. Email'de webinar kayıt linki var

---

## ⚠️ ÖNEMLİ: Neden Resend Gerekli?

**Supabase'in email gönderme servisi YOK!**

Supabase sadece kendi kullanıcı kayıt emaillerini gönderebilir. Bizim gibi özel emailler göndermek için **3. parti bir servis** şart.

**Resend neden en iyi seçenek?**
- ✅ Kurulumu çok basit (10 dakika)
- ✅ Ayda 3,000 email ÜCRETSİZ
- ✅ Emailler spam'e düşmez
- ✅ Türk domain'lerle de çalışır

---

## 📋 ADIM 1: Supabase Database Kurulumu

### 1.1 Migration'ı Çalıştır

Supabase Dashboard'a git: https://supabase.com/dashboard

1. Sol menüden **"SQL Editor"** sekmesine tıkla
2. **"New Query"** butonuna bas
3. Aşağıdaki SQL kodunu kopyala ve yapıştır:

```sql
-- Email subscribers tablosu
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  webinar_link_sent BOOLEAN DEFAULT FALSE,
  webinar_link_sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT DEFAULT 'landing_page',
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Index'ler (hızlı arama için)
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON public.email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_subscribed_at ON public.email_subscribers(subscribed_at DESC);

-- Row Level Security (Güvenlik)
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Form'dan email eklenebilsin
CREATE POLICY "Allow anonymous inserts" ON public.email_subscribers
  FOR INSERT TO anon WITH CHECK (true);

-- API'den okuyup güncelleyebilsin
CREATE POLICY "Allow service role full access" ON public.email_subscribers
  FOR ALL TO service_role USING (true) WITH CHECK (true);
```

4. Sağ alttaki **"Run"** butonuna bas
5. **"Success. No rows returned"** mesajını görmelisin ✅

### 1.2 Tablo Oluştu mu Kontrol Et

1. Sol menüden **"Table Editor"** sekmesine git
2. **"email_subscribers"** tablosunu göreceksin
3. Tıklayınca boş bir tablo açılacak (henüz email yok)

✅ **ADIM 1 TAMAMLANDI!**

---

## 📧 ADIM 2: Resend Hesabı Oluştur

### 2.1 Hesap Aç

1. https://resend.com/signup adresine git
2. **Email** ve **şifre** ile kayıt ol (veya GitHub ile)
3. Email'ini doğrula (gelen maile tıkla)

### 2.2 Domain Ekle

**ÖNEMLİ:** Email'leri kendi domain'inden göndermen gerekiyor (örn: `noreply@aiscale.app`)

1. Resend Dashboard'a gir: https://resend.com/domains
2. Sağ üstteki **"Add Domain"** butonuna tıkla
3. Domain'ini yaz: **aiscale.app** (www yazmadan!)
4. **"Add"** butonuna bas

### 2.3 DNS Kayıtlarını Ekle

Şimdi Resend sana **3 DNS kaydı** verecek:

```
SPF Record
DKIM Record
DMARC Record
```

Bu kayıtları domain'inin DNS ayarlarına eklemelisin:

**Domain nereden alındı?** (Namecheap, GoDaddy, Cloudflare, vs.)

#### Örnek: Cloudflare için

1. Cloudflare'e giriş yap
2. Domain'ini seç (aiscale.app)
3. Sol menüden **"DNS"** > **"Records"** tıkla
4. Her kayıt için **"Add record"** butonuna bas

Resend'deki her satırı aynen kopyala:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | @ | (Resend'den kopyala) | Auto |
| TXT | resend._domainkey | (Resend'den kopyala) | Auto |
| TXT | _dmarc | (Resend'den kopyala) | Auto |

5. **"Save"** butonuna bas

#### Örnek: Namecheap için

1. Namecheap'e giriş yap
2. Domain List > aiscale.app > **"Manage"**
3. **"Advanced DNS"** sekmesine git
4. **"Add New Record"** butonuna bas
5. Resend'deki kayıtları ekle (yukarıdaki tablo gibi)

### 2.4 Doğrulama Bekle

1. DNS kayıtlarını ekledikten sonra Resend'e dön
2. **"Verify DNS Records"** butonuna bas
3. **10-15 dakika** bekle (DNS yayılması için)
4. Sayfayı yenile
5. ✅ Yeşil tik görmelisin: **"Verified"**

**Hala "Pending" diyor mu?**
- 1-2 saat bekle (bazen DNS yavaş yayılır)
- DNS'leri doğru girdiğinden emin ol
- Resend'in "Check Again" butonuna bas

✅ **ADIM 2 TAMAMLANDI!**

---

## 🔑 ADIM 3: API Key Al

### 3.1 Resend API Key Oluştur

1. Resend Dashboard: https://resend.com/api-keys
2. **"Create API Key"** butonuna tıkla
3. İsim ver: **"AI Scale Production"**
4. Permission: **"Sending access"** seçili olsun
5. **"Add"** butonuna bas
6. **API Key'i KOPYALA** (bir daha göremeyeceksin!)

API Key şuna benzer:
```
re_AbCdEfGh123456789
```

### 3.2 Supabase Service Role Key Al

1. Supabase Dashboard: https://supabase.com/dashboard
2. Project seç
3. Sol altta **"Project Settings"** (dişli ikonu)
4. Sol menüden **"API"** sekmesine tıkla
5. **"Project API keys"** bölümüne scroll et
6. **"service_role"** key'ini kopyala (secret yazanı)

### 3.3 Environment Variables Dosyası Oluştur

Projenin ana klasöründe (tate/) **`.env.local`** dosyası oluştur:

```bash
cd /Users/bahakizil/Desktop/tate
touch .env.local
```

Dosyaya şunları yaz:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://SENIN-PROJE.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend
RESEND_API_KEY=re_AbCdEfGh123456789

# Checkout URL
NEXT_PUBLIC_CHECKOUT_URL=https://ai-scale.circle.so/checkout/aiscaleapp-aylik
```

**ÖNEMLI:**
- `SUPABASE_URL` ve `ANON_KEY` zaten `next.config.js`'de var, oradan kopyala
- `SERVICE_ROLE_KEY` yukarıda kopyaladığın secret key
- `RESEND_API_KEY` Resend'den aldığın key

### 3.4 Development Server'ı Yeniden Başlat

```bash
# Önce durdur (Ctrl + C)
# Sonra tekrar başlat
npm run dev
```

✅ **ADIM 3 TAMAMLANDI!**

---

## 🧪 ADIM 4: Test Et

### 4.1 Local'de Test

1. Tarayıcıda aç: http://localhost:3000
2. Aşağı scroll et **"ÜCRETSİZ SEMİNERE KATIL"** bölümüne
3. Email adresini gir (kendi emailini)
4. **"Ücretsiz Erişim Kazan"** butonuna bas
5. **"Başarıyla kaydoldunuz! Email adresinizi kontrol edin."** mesajını görmelisin

### 4.2 Email Geldi mi Kontrol Et

1. Email kutunu aç (spam klasörüne de bak!)
2. **"🎉 AI Scale Ücretsiz Webinar - Kaydınız Alındı!"** başlıklı email göreceksin
3. Email'i aç ve **"Anketi Doldurun ve Webinar'a Katılın"** butonuna tıkla
4. `https://aiscale.app/webinar-registration` linkine gitmeli

### 4.3 Supabase'de Kontrol Et

1. Supabase Dashboard > Table Editor > email_subscribers
2. Email'inin kayıtlı olduğunu göreceksin
3. `webinar_link_sent` kolonunda **TRUE** yazacak

### 4.4 Sorun mu Var?

**Email gelmediyse:**

1. **Resend Dashboard**'a git: https://resend.com/emails
2. Son gönderilen emaili gör
3. Status **"Delivered"** mı?
   - ✅ **Delivered**: Email gitti, spam klasörüne bak
   - ❌ **Failed**: Hata mesajını oku

**Console'da hata varsa:**

```bash
# Terminal'de hatayı göreceksin
# Örnek: "RESEND_API_KEY not configured"
# Çözüm: .env.local dosyasını kontrol et
```

✅ **ADIM 4 TAMAMLANDI!**

---

## 🚀 ADIM 5: Production'a Deploy Et

### 5.1 Vercel'e Environment Variables Ekle

1. Vercel Dashboard: https://vercel.com
2. Project'i seç: **tate**
3. Üst menüden **"Settings"** tıkla
4. Sol menüden **"Environment Variables"** seç
5. Her değişken için **"Add"** butonuna bas:

| Key | Value | Environment |
|-----|-------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | eyJhbGciOiJI... | Production |
| `RESEND_API_KEY` | re_AbCdE... | Production |

**NOT:** `NEXT_PUBLIC_` ile başlayanlar zaten var, onları ekleme!

6. **"Save"** butonuna bas

### 5.2 Git Push

```bash
cd /Users/bahakizil/Desktop/tate
git add .
git commit -m "Email system ready for production"
git push
```

### 5.3 Vercel Otomatik Deploy Edecek

1. Vercel Dashboard'da **"Deployments"** sekmesine git
2. En üstteki deployment'ı bekle (1-2 dakika)
3. **"Ready"** yazısını gör

### 5.4 Production'da Test Et

1. https://tate-one.vercel.app adresine git
2. Email formunu doldur
3. Email geldi mi kontrol et

✅ **ADIM 5 TAMAMLANDI!**

---

## 📊 ADIM 6: İzleme ve Analiz

### Email İstatistikleri (Resend)

https://resend.com/emails

- Kaç email gönderildi?
- Kaç tanesi açıldı?
- Hangi linkler tıklandı?

### Subscriber İstatistikleri (Supabase)

Supabase Dashboard > SQL Editor'da çalıştır:

```sql
-- Toplam subscriber
SELECT COUNT(*) FROM email_subscribers;

-- Bugün kaydolanlar
SELECT COUNT(*) FROM email_subscribers
WHERE subscribed_at::date = CURRENT_DATE;

-- Email gönderilme oranı
SELECT
  COUNT(*) as toplam,
  SUM(CASE WHEN webinar_link_sent THEN 1 ELSE 0 END) as gonderildi
FROM email_subscribers;
```

---

## ❓ Sık Sorulan Sorular

### 1. Email spam'e düşüyor

**Çözüm:**
- Resend'de domain'in **"Verified"** olduğundan emin ol
- DNS kayıtlarının hepsini doğru girdiğini kontrol et
- İlk emailler spam'e düşebilir, "spam değil" işaretle

### 2. "RESEND_API_KEY not configured" hatası

**Çözüm:**
- `.env.local` dosyasının doğru yerde olduğunu kontrol et (tate/)
- Development server'ı yeniden başlat (`npm run dev`)
- API key'i doğru kopyaladığından emin ol

### 3. Supabase'e email kaydolmuyor

**Çözüm:**
- Migration'ı çalıştırdığından emin ol (ADIM 1)
- `email_subscribers` tablosunun olduğunu kontrol et
- RLS policy'lerin doğru olduğunu kontrol et

### 4. Domain'im yok, test edebilir miyim?

**Evet!** Resend test mode'unda çalışır:
- Domain doğrulamadan da email gönderebilirsin
- Ama sadece Resend'e kayıtlı email adreslerine gider
- Production için mutlaka domain doğrula

---

## 🎉 Tamamlandı!

Email sisteminiz hazır!

**Özet:**
1. ✅ Supabase'de tablo oluşturuldu
2. ✅ Resend hesabı kuruldu ve domain doğrulandı
3. ✅ API key'ler eklendi
4. ✅ Local'de test edildi
5. ✅ Production'a deploy edildi

**Şimdi ne olacak?**
- Kullanıcılar email adreslerini girecek
- Otomatik email alacaklar
- Webinar linkine tıklayacaklar
- Sen Supabase'den tüm emailleri görebileceksin

**Destek:**
- Sorun olursa: bahakizil@gmail.com
- Resend Docs: https://resend.com/docs
- Supabase Docs: https://supabase.com/docs
