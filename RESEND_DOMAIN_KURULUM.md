# 🚀 Resend Domain Kurulumu - info@aiscale.app için

API Key'in hazır: `re_656dcCfn_LYRhSkRkgvxYyTpUPDpBHVnd`

Şimdi `info@aiscale.app` adresinden mail gönderebilmek için **domain doğrulaması** yapman gerekiyor.

---

## 📋 ADIM 1: Resend'e Giriş Yap

1. https://resend.com/login adresine git
2. API key'i aldığın hesaba giriş yap

---

## 📧 ADIM 2: Domain Ekle

1. Sol menüden **"Domains"** sekmesine tıkla
2. Sağ üstteki **"+ Add Domain"** butonuna bas
3. Domain kutusuna yaz: **aiscale.app** (www yazmadan!)
4. **"Add"** butonuna tıkla

---

## 🔧 ADIM 3: DNS Kayıtlarını Al

Domain ekledikten sonra Resend sana **3 DNS kaydı** gösterecek. Şuna benzer:

### 1️⃣ SPF Record (Sender Policy Framework)
```
Type: TXT
Name: @ (veya aiscale.app)
Value: v=spf1 include:_spf.resend.com ~all
```

### 2️⃣ DKIM Record (DomainKeys Identified Mail)
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN... (uzun bir key)
```

### 3️⃣ DMARC Record (Domain-based Message Authentication)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; pct=100; rua=mailto:dmarc@resend.com
```

**ÖNEMLİ:** Bu kayıtları şimdilik **Resend sayfasında aç bırak**! Domain yönetim paneline giderken lazım olacak.

---

## 🌐 ADIM 4: Domain Yönetim Paneline Git

**aiscale.app domain'ini nereden aldın?**

### Seçenek A: Cloudflare

1. https://dash.cloudflare.com adresine git
2. **aiscale.app** domain'ine tıkla
3. Sol menüden **"DNS"** > **"Records"** sekmesine git
4. **ADIM 5**'e geç ⬇️

### Seçenek B: Namecheap

1. https://namecheap.com adresine giriş yap
2. Sol menüden **"Domain List"** tıkla
3. **aiscale.app** yanındaki **"Manage"** butonuna bas
4. **"Advanced DNS"** sekmesine git
5. **ADIM 5**'e geç ⬇️

### Seçenek C: GoDaddy

1. https://godaddy.com adresine giriş yap
2. **My Products** > **Domains**
3. **aiscale.app** yanındaki **"DNS"** butonuna tıkla
4. **ADIM 5**'e geç ⬇️

### Seçenek D: Google Domains / Squarespace

1. https://domains.google.com (veya https://domains.squarespace.com)
2. **aiscale.app** seç
3. **"DNS"** sekmesine git
4. **ADIM 5**'e geç ⬇️

---

## ➕ ADIM 5: DNS Kayıtlarını Ekle

Şimdi Resend'den aldığın 3 kaydı DNS paneline ekleyeceksin:

### 1️⃣ SPF Record Ekle

| Alan | Değer |
|------|-------|
| **Type** | TXT |
| **Name** | @ (veya boş bırak) |
| **Value** | `v=spf1 include:_spf.resend.com ~all` |
| **TTL** | Auto (veya 3600) |

**"Add Record"** veya **"Save"** butonuna bas

---

### 2️⃣ DKIM Record Ekle

| Alan | Değer |
|------|-------|
| **Type** | TXT |
| **Name** | `resend._domainkey` |
| **Value** | Resend'den kopyala (p=MIGfMA... ile başlayan) |
| **TTL** | Auto (veya 3600) |

**"Add Record"** veya **"Save"** butonuna bas

---

### 3️⃣ DMARC Record Ekle

| Alan | Değer |
|------|-------|
| **Type** | TXT |
| **Name** | `_dmarc` |
| **Value** | `v=DMARC1; p=none; pct=100; rua=mailto:dmarc@resend.com` |
| **TTL** | Auto (veya 3600) |

**"Add Record"** veya **"Save"** butonuna bas

---

## ⏰ ADIM 6: DNS Yayılmasını Bekle

DNS kayıtları **10-15 dakika** içinde yayılır, ama bazen **1-2 saat** sürebilir.

### Resend'de Kontrol Et

1. Resend'e dön: https://resend.com/domains
2. **"aiscale.app"** domain'ine tıkla
3. **"Verify DNS Records"** butonuna bas
4. ✅ Yeşil tik görmelisin: **"Verified"**

**Hala "Pending" diyor mu?**
- Sayfayı yenile ve **"Check Again"** butonuna bas
- 30 dakika daha bekle
- DNS kayıtlarını doğru girdiğinden emin ol

---

## 🧪 ADIM 7: Test Email Gönder

Domain doğrulandıktan sonra test edelim:

### 7.1 Development Server'ı Yeniden Başlat

```bash
# Terminal'de Ctrl+C ile durdur
# Sonra tekrar başlat
cd /Users/bahakizil/Desktop/tate
npm run dev
```

### 7.2 Test Et

1. http://localhost:3000 adresine git
2. **"ÜCRETSİZ SEMİNERE KATIL"** bölümüne scroll et
3. Kendi email adresini gir
4. **"Ücretsiz Erişim Kazan"** butonuna bas
5. Email kutunu kontrol et!

### 7.3 Email Geldi mi?

Email'de **gönderen** olarak görmelisin:
```
AI Scale <info@aiscale.app>
```

**Email gelmediyse:**
1. Spam klasörüne bak
2. Resend Dashboard > Emails: https://resend.com/emails
3. Son email'in durumunu kontrol et

---

## 🚀 ADIM 8: Production'a Deploy Et

### 8.1 Vercel'e Environment Variables Ekle

1. https://vercel.com/dashboard git
2. **tate** projesini seç
3. **Settings** > **Environment Variables**
4. Şu değişkenleri ekle:

| Key | Value |
|-----|-------|
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dHdkY2hsYnJ1a3JueWdzcGJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIwOTU5NiwiZXhwIjoyMDQ3Nzg1NTk2fQ.wN8gvKnHJVKrBiMUf4YxZs-2kRqpPl2g0J1WEGHdLDY` |
| `RESEND_API_KEY` | `re_656dcCfn_LYRhSkRkgvxYyTpUPDpBHVnd` |

**Environment:** Production seç ✅

5. **"Save"** butonuna bas

### 8.2 Commit ve Push

```bash
cd /Users/bahakizil/Desktop/tate
git add .
git commit -m "Update email sender to info@aiscale.app"
git push
```

### 8.3 Production'da Test Et

1. https://tate-one.vercel.app adresine git
2. Email formunu doldur
3. Email kutunu kontrol et

---

## ✅ Tamamlandı!

Artık `info@aiscale.app` adresinden email gönderebiliyorsun! 🎉

---

## 🆘 Sorun Giderme

### 1. Domain doğrulanmıyor

**Kontrol et:**
```bash
# Terminal'de DNS kayıtlarını kontrol et
dig TXT aiscale.app
dig TXT resend._domainkey.aiscale.app
dig TXT _dmarc.aiscale.app
```

### 2. Email gönderilmiyor

**Console'da hata var mı?**
- Terminal'de `npm run dev` çıktısına bak
- Browser console'u aç (F12) ve Network sekmesini kontrol et

### 3. Email spam'e düşüyor

**Çözüm:**
- Domain'in tam doğrulandığından emin ol (3 yeşil tik)
- İlk birkaç email spam'e düşebilir, "spam değil" işaretle
- DMARC policy'ni `p=quarantine` yap (opsiyonel)

---

## 📞 Destek

Sorun mu var?
- Resend Docs: https://resend.com/docs
- Resend Discord: https://resend.com/discord
- Email: support@resend.com
