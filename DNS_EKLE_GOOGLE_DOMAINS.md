# 🌐 Google Domains'de DNS Kayıtları Ekleme - 5 Dakika

Domain'in Google Domains'de (nameserver: ns-cloud-b1.googledomains.com)

Resend'den aldığın DNS kayıtlarını eklemek **çok kolay**! İşte adım adım:

---

## 📋 Eklenecek DNS Kayıtları

### 1️⃣ DKIM Record
```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDPtXXR/Ovvi55xX6u45D3TaB2SBED4I6mxWSS9Cjv5aVmEWx33cv/ZmDsO74grmkQJKZ8WzMQtcWWeVKbvP5PsiE4LL1dtibMOGTRb7C3WhJjBCfVaa+PPZFSEXWaEJd7IvpQk8RLN798as7vmEqDHsq+Xwr/9k7Th3gpMJJdmQIDAQAB
TTL: Auto
```

### 2️⃣ MX Record (Mail Server)
```
Type: MX
Name: send
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
TTL: Auto
```

### 3️⃣ SPF Record
```
Type: TXT
Name: send
Value: v=spf1 include:amazonses.com ~all
TTL: Auto
```

---

## 🚀 ADIM ADIM EKLEME

### ADIM 1: Google Domains'e Giriş Yap

1. https://domains.google.com adresine git
2. Google hesabınla giriş yap
3. **aiscale.app** domain'ine tıkla

### ADIM 2: DNS Ayarlarına Git

1. Sol menüden **"DNS"** sekmesine tıkla
2. Aşağı scroll et, **"Resource records"** bölümünü bul
3. **"Manage custom records"** butonuna tıkla

### ADIM 3: DKIM Record Ekle

1. **"Create new record"** butonuna bas

| Alan | Değer |
|------|-------|
| **Host name** | `resend._domainkey` |
| **Type** | TXT |
| **TTL** | 3600 (veya default) |
| **Data** | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDPtXXR/Ovvi55xX6u45D3TaB2SBED4I6mxWSS9Cjv5aVmEWx33cv/ZmDsO74grmkQJKZ8WzMQtcWWeVKbvP5PsiE4LL1dtibMOGTRb7C3WhJjBCfVaa+PPZFSEXWaEJd7IvpQk8RLN798as7vmEqDHsq+Xwr/9k7Th3gpMJJdmQIDAQAB` |

2. **"Add"** veya **"Save"** butonuna bas ✅

---

### ADIM 4: MX Record Ekle

1. Tekrar **"Create new record"** butonuna bas

| Alan | Değer |
|------|-------|
| **Host name** | `send` |
| **Type** | MX |
| **TTL** | 3600 (veya default) |
| **Priority** | `10` |
| **Data** | `feedback-smtp.us-east-1.amazonses.com` |

2. **"Add"** veya **"Save"** butonuna bas ✅

---

### ADIM 5: SPF Record Ekle

1. Tekrar **"Create new record"** butonuna bas

| Alan | Değer |
|------|-------|
| **Host name** | `send` |
| **Type** | TXT |
| **TTL** | 3600 (veya default) |
| **Data** | `v=spf1 include:amazonses.com ~all` |

2. **"Add"** veya **"Save"** butonuna bas ✅

---

### ADIM 6: Kaydet

1. Sağ alttaki **"Save"** butonuna bas (eğer varsa)
2. ✅ 3 DNS kaydı eklendi!

---

## ⏰ ADIM 7: DNS Yayılmasını Bekle

Google Domains DNS kayıtları genelde **5-15 dakika** içinde yayılır.

### Terminal'de Kontrol Et

```bash
# DKIM kaydını kontrol et
dig TXT resend._domainkey.aiscale.app +short

# MX kaydını kontrol et
dig MX send.aiscale.app +short

# SPF kaydını kontrol et
dig TXT send.aiscale.app +short
```

---

## ✅ ADIM 8: Resend'de Doğrula

1. Resend Dashboard'a dön: https://resend.com/domains
2. **aiscale.app** domain'ine tıkla
3. **"Verify DNS Records"** butonuna bas
4. 10-15 dakika bekle
5. Sayfayı yenile
6. ✅ **3 yeşil tik** görmelisin!

---

## 🧪 ADIM 9: Test Et

### Development'ta Test

```bash
# Terminal'de
cd /Users/bahakizil/Desktop/tate
npm run dev
```

1. http://localhost:3000 aç
2. **"ÜCRETSİZ SEMİNERE KATIL"** formuna git
3. Kendi email adresini gir
4. **"Ücretsiz Erişim Kazan"** butonuna bas
5. Email kutunu kontrol et!

Email gelirse gönderen şöyle görünecek:
```
AI Scale <info@aiscale.app>
```

---

## 🚀 ADIM 10: Production'a Deploy

Environment variables'ları Vercel'e ekle:

```bash
# Vercel CLI ile (eğer yüklüyse)
vercel env add RESEND_API_KEY
# Değer: re_656dcCfn_LYRhSkRkgvxYyTpUPDpBHVnd

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Değer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1dHdkY2hsYnJ1a3JueWdzcGJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjIwOTU5NiwiZXhwIjoyMDQ3Nzg1NTk2fQ.wN8gvKnHJVKrBiMUf4YxZs-2kRqpPl2g0J1WEGHdLDY
```

Veya **Vercel Dashboard**'dan manuel ekle:
1. https://vercel.com/dashboard
2. **tate** projesini seç
3. **Settings** > **Environment Variables**
4. Yukarıdaki 2 değişkeni ekle (Production seç)

Sonra deploy et:
```bash
git add .
git commit -m "DNS records configured"
git push
```

---

## 🎉 Tamamlandı!

Artık `info@aiscale.app` adresinden email gönderebiliyorsun!

---

## 📸 Görsel Yardım

Eğer Google Domains panelini bulamıyorsan:

1. https://domains.google.com
2. Sağ üst köşede profil resmine tıkla > doğru hesabı seç
3. Domain listesinde **aiscale.app** görünüyorsa tıkla
4. Sol menüden **DNS** sekmesine git
5. **"Manage custom records"** bölümünü bul

---

## 🆘 Sorun mu Var?

### DNS kayıtları görünmüyor
```bash
# 15 dakika bekle, sonra tekrar kontrol et
dig TXT resend._domainkey.aiscale.app +short
```

### Resend hala "Pending" diyor
- 30 dakika bekle (Google DNS bazen yavaş)
- DNS kayıtlarını doğru girdiğinden emin ol
- Resend'de **"Refresh"** butonuna bas

### Email gelmiyor
- Spam klasörüne bak
- Resend > Emails bölümünden son email'in durumunu kontrol et
- Console'da hata var mı bak (F12 > Console)
