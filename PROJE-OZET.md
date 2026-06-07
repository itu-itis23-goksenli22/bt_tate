# AI Scale — Proje Özeti & Çalışma Rehberi

> Bu dosya, projeyi farklı bir makineden/Claude oturumundan devralacak kişi için
> hazırlandı. Tüm sistem mimarisini, sayfaları, entegrasyonları ve **değişiklik
> yapıp deploy etme akışını** anlatır.
>
> **GÜVENLİK:** Bu dosya GitHub'a gider. Secret key'ler (API token, secret) burada
> YOK — sadece env var **isimleri** referans verilir. Gerçek değerler Vercel
> Environment Variables'ta ve lokal `.env.local`'da saklı.

---

## 1. GENEL BAKIŞ

İki ayrı Vercel projesi var:

| Proje | Lokal Yol | Vercel | Ne işe yarar |
|---|---|---|---|
| **bt_tate** | `/Users/Hakan/bt_tate` | `bttate.vercel.app` | Ana site — tüm funnel sayfaları |
| **funnel-backend** | `/Users/Hakan/funnel-backend` | `funnel-backend-blue.vercel.app` | GHL/Zoom için serverless backend |

**bt_tate** stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Node 24.x (Vercel).
**GitHub:** https://github.com/bahakizil/bt_tate (branch: `main`)

### Domainler (bt_tate)
- `www.aiscaleapp.com` + `aiscaleapp.com` → ana site
- `dijitalakademi.live` → middleware ile `/eticaret/*` variant'ına rewrite edilir
- DNS: Google Cloud DNS'te (Vercel'de değil — subdomain eklemek için DNS'e CNAME gerekir)

---

## 2. SAYFALAR / FUNNEL'LAR (bt_tate)

### Ana Funnel
| URL | Açıklama | Meta Event |
|---|---|---|
| `/` | Ana landing (her gün 20:00 auto-webinar) | CompleteRegistration |
| `/kayitbasarili` | VIP $9.90 upsell (embedded Stripe) | — |
| `/kayitbasarili/tesekkurler` | Teşekkürler + countdown | — |
| `/vipodemeonay` | $9.90 ödeme sonrası onay | — |

### /katil Funnel (paralel variant — 6 Haziran 2026 webinarı)
| URL | Açıklama |
|---|---|
| `/katil` | Landing — "Yapay Zeka ile Startup Kur / 10X Büyüt" headline, **Lead** event, sarı tarih badge (6 Haziran Cumartesi 20:00) |
| `/katil/kayitbasarili` | VIP $9.90 upsell — üstte Zoom mail önizleme kartı, embedded Stripe, InitiateCheckout event, 4 video "Gerçek Başarı Hikayeleri" |
| `/katil/kayitbasarili/tesekkurler` | 6 Haziran sabit countdown |
| `/katil/vipodemeonay` | 6 Haziran sabit countdown |

> /katil ana funnel'ın klonudur. Component'ler paylaşımlı; variant farkları
> **prop** ile geçilir (`webinarId`, `successPath`, `contentName`, `fixedDateString`,
> `ctaText`, `eventType="Lead"`).

### Satış Sayfaları (community paketi)
| URL | Fiyat | Stripe |
|---|---|---|
| `/firsat` | ₺15,000 | Eski Payment Link (`BASARILIKAYIT_CHECKOUT_MASTERCLASS`) |
| `/sonfirsat` | ₺29,900 | **Embedded Stripe** (`STRIPE_SONFIRSAT_PRICE_ID` = `price_1Tc8wpIWawaEi3elIg14ABZX`), CTA'lar `#sonfirsat-checkout`'a scroll, fallback Payment Link `buy.stripe.com/4gM6oI2e4c5L5wJdpS3wQ0v` |
| `/firsat2`, `/eticaret/firsat` | — | Aynı component (`basarilikayit`) |

> `/firsat` ve `/sonfirsat` paylaşımlı `components/basarilikayit/*` kullanır.
> Variant farkları prop ile: `priceFormatted`, `checkoutUrl`, `strikethroughPrice`,
> `packageItems`, `mainFeatures`, `topCards`, ViewContentTracker `value`+`contentName`.

### Diğer
| URL | Açıklama |
|---|---|
| `/vsl` | Instagram reklam landing — Typeform embed (placeholder `VSL_TYPEFORM_ID`) → kalifiyeler Calendly'ye. robots noindex. |
| `/calendly` | **Onboarding** randevu sayfası — büyük buton `calendly.com/aiscale-info/new-meeting` yeni sekmede açar (inline embed Safari/cookie engeli yüzünden KALDIRILDI), WhatsApp destek butonu |
| `/odemeonay` | Genel satın alma başarılı sayfası (Stripe webhook return_url) |
| `/eticaret/*` | dijitalakademi.live variant'ı |

---

## 3. ENTEGRASYONLAR

### Meta Pixel + CAPI (server-side dedup)
- **Pixel ID'leri:** aiscale `793366716531580`, dijitalakademi `1261057665474950`
- **Dosyalar:** `components/MetaPixel.tsx` (browser), `lib/meta-pixel.ts` (helpers), `lib/meta-capi.ts` (server), `app/api/meta-capi/route.ts`
- **Event'ler:** PageView, CompleteRegistration (CR), Lead, InitiateCheckout, Purchase, ViewContent
- **Env:** `META_CAPI_ACCESS_TOKEN`, `META_CAPI_ACCESS_TOKEN_DIJITAL`
- **Önemli:** Advanced Matching'de email + telefon **format validasyonu** var
  (`lib/meta-pixel.ts` + `lib/meta-capi.ts`) — Meta "Invalid format/length"
  uyarısını önlemek için geçersiz değerler atılır.
- **content_name ile audience ayrımı:** Katil Funnel Webinar, Katil Funnel Checkout,
  Sonfirsat Checkout, VIP/Course/Sonfirsat Purchase

### Stripe
- **Env:** `STRIPE_SECRET_KEY`, `STRIPE_VIP_PRICE_ID` ($9.90), `STRIPE_SONFIRSAT_PRICE_ID` (₺29,900), `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Embedded Checkout:** `app/api/create-checkout-session/route.ts` — variant-aware
  (`"vip"` | `"sonfirsat"`), `components/VipEmbeddedCheckout.tsx` (priceVariant prop)
- **Webhook:** `app/api/stripe-webhook/route.ts` → `checkout.session.completed` →
  Meta CAPI Purchase + welcome email + Hetzner notify
  - $9.90 USD (metadata.variant=vip) → VIP Purchase + `sendVipUpsellEmail`
  - 15.000 TL (1.500.000 kuruş) → Course Purchase + `sendCourseWelcomeEmail`
  - 29.900 TL (metadata.variant=sonfirsat / 2.990.000 kuruş) → Sonfirsat Purchase + `sendSonfirsatWelcomeEmail`

### Zoom (webinar otomatik kayıt)
- **Dosya:** `lib/zoom.ts`, `app/api/zoom-register/route.ts`, `app/api/qualify-lead/route.ts`
- **Env:** `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, `ZOOM_WEBINAR_ID`
- **Akış:** form submit → OAuth token → registrant ekle → `join_url` döner
- **Webinar ID'leri:**
  - `89869552274` — eski "30 Mayıs Lansman"
  - **`81497341331` — GÜNCEL** "YAPAY ZEKA SERVET TRANSFERİ: CANLI SEMİNER" (6 Haziran 2026 20:00 TR). `/katil` bunu kullanır.
  - `86257770515` — eticaret webinar
- **Not:** Webinar'da "Registration: Required" + auto-approve açık olmalı yoksa registrant API çalışmaz.

### Resend (email)
- **Dosya:** `lib/purchase-emails.ts` — `from: AI Scale <info@aiscale.app>`
- **Env:** `RESEND_API_KEY`
- **Fonksiyonlar:**
  - `sendCourseWelcomeEmail` — 15.000 TL alıcıları
  - `sendVipUpsellEmail` — $9.90 alıcıları (3 kart: Notion paket + bonus eğitim + seminer)
  - `sendSonfirsatWelcomeEmail` — 29.900 TL alıcıları (Claude Code + N8N temalı)
  - `sendWebinarYoutubeEmail` — kayıt sonrası (opsiyonel `eventDateString` → /katil için "6 Haziran" tarih bloğu gösterir)

### Supabase
- **Tablo:** `email_subscribers` (kolonlar: email, name, phone, source, webinar_link_sent, webinar_link_sent_at, created_at)
- **Project URL:** `https://flmvruchjhxhfllcjpqc.supabase.co`
- **Env:** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Form submit'leri (qualify-lead, zoom-register) buraya yazar. `source` alanı:
  `yerimi_ayirt`, `zoom_register` vb.

### Vercel Analytics
- `@vercel/analytics` kurulu, `app/layout.tsx`'te `<Analytics />`. Vercel Dashboard → Analytics.

### funnel-backend (ayrı proje)
- Endpoint'ler: `/api/health`, `/api/zoom-register`, `/api/zoom-test`
- Env: `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, `ZOOM_WEBINAR_ID`
- GHL (GoHighLevel) form'larından çağrılır. CORS açık (`vercel.json`).

---

## 4. ⭐ İŞ AKIŞI — Değişiklik → Commit → Push → Deploy

**ÇOK ÖNEMLİ:** Bu projede Vercel deploy **OTOMATİK DEĞİL**. Git push ile deploy
ayrı işlemlerdir. Bir değişiklik yapınca **3 adımı da** yapman gerekir.

### Adım Adım

```bash
cd /Users/Hakan/bt_tate

# 1. Değişikliği yap (Edit/Write ile dosyaları düzenle)

# 2. TypeScript kontrolü (HER ZAMAN — hata varsa deploy etme)
npx tsc --noEmit -p .

# 3. Commit
git add <değişen-dosyalar>
git commit -m "açıklayıcı mesaj"

# 4. Production'a DEPLOY (Vercel — manuel)
vercel --prod --yes

# 5. GitHub'a PUSH
git push origin main
```

### Önemli Notlar
- **Deploy ≠ Push.** `vercel --prod` siteyi canlıya alır; `git push` kodu GitHub'a
  gönderir. İkisini de yap.
- **TS check şart:** `npx tsc --noEmit -p .` çıktısı boşsa (hata yok) deploy et.
  Hata varsa önce düzelt.
- **Doğrulama:** Deploy sonrası `curl -sS -o /dev/null -w "%{http_code}" https://www.aiscaleapp.com/SAYFA`
  ile 200 dönüyor mu bak. Bu projenin **dev server'ında cache sorunları var** —
  değişiklikleri production'da (deploy sonrası) doğrula, lokal dev'e güvenme.
- **Deploy çıktısı:** `Aliased: https://bttate.vercel.app` görünce production canlı.
- **Vercel logs:** `vercel logs https://www.aiscaleapp.com` (runtime logları bazen
  gecikmeli/boş gelebilir — CLI aksaklığı). Alternatif: `vercel inspect <url> --logs`.

### funnel-backend için
```bash
cd /Users/Hakan/funnel-backend
vercel --prod --yes     # deploy
# env var ekleme: printf "değer" | vercel env add VAR_ADI production  (echo DEĞİL — echo newline ekler!)
```

### Commit mesajı kuralı (CLAUDE.md'den)
Commit mesajlarının sonuna şu satır eklenir:
```
Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

---

## 5. BU SOHBETTE YAPILAN İŞLER (kronolojik özet)

1. **/vipodemeonay + /kayitbasarili/tesekkurler** — "Seminere Mutlaka Katıl" kartı,
   adımlar arası ↓ ok, "Katılım Linkiniz E-posta Adresine Gönderildi" bloğu.
2. **$9.90 VIP welcome email** yeniden yazıldı (3 kart yapı). 15.000 TL maili dokunulmadı.
3. **funnel-backend** projesi kuruldu (Zoom kayıt için serverless). Vercel'e deploy +
   env vars eklendi. Zoom OAuth doğrulandı.
4. **/katil funnel** — ana funnel klonlandı, 6 Haziran webinarı (Zoom 81497341331),
   Lead event, "Katil Funnel Webinar" content_name, custom headline/CTA.
5. **/sonfirsat** — /firsat'ın 29.900 TL versiyonu, embedded Stripe, Claude Code/N8N
   paket içeriği (eğitim programı lafı kaldırıldı), 4 video grid.
6. **Telefon opt-in checkbox** — modal'da telefon artık zorunlu değil, "Sadece üyelere
   özel tekliflerden haberdar olmak istiyorum" checkbox'ına tıklayınca açılır. SMS dili yok.
7. **Meta Advanced Matching validasyonu** — geçersiz email/telefon formatları atılıyor
   (Meta "Invalid format/length" uyarısı çözümü).
8. **Claude Code Masterclass** — Eğitim Müfredatı'na 6. kampüs olarak eklendi.
9. **Vercel Analytics** eklendi.
10. **/katil/kayitbasarili** — Zoom mail önizleme kartı (en üst), AI Shopify rehberi
    kaldırıldı ($2000→$1500), decline butonu testimonial üstüne taşındı, 4 video eklendi.
11. **/katil tarih badge** — sarı italic "6 Haziran Cumartesi · 20:00 (TR)", oval yok.
12. **/vsl** — Instagram trafik için Typeform application sayfası (placeholder).
13. **/calendly** — onboarding randevu sayfası. Calendly inline embed denendi ama
    **Safari/Brave third-party cookie engeli** yüzünden çalışmadı (kanıt: Calendly
    x-frame-options ALLOWALL veriyor, sorun tarayıcıda). Sonuç: **büyük buton** yeni
    sekmede açar (her tarayıcıda %100), WhatsApp destek butonu.

---

## 6. WHATSAPP / MANYCHAT / BROADCAST

- **ManyChat WhatsApp Business API:** bağlı (+15559611048, 2000 BIC/24h, Marketing
  Messages connected, Business Verified, Approved).
- **SORUN:** ManyChat toplu contact import'u (telefon/email) **manuel onay** gerektirir
  ("Request approval"). Onaysız "Confirm Import" butonu kilitli kalıyor. Onay saatler/gün
  sürer → acil seminerlere yetişmez.
- **Mapping notu:** CSV import'ta `phone → WhatsApp ID`, `first_name → First Name`
  eşleştir (ManyChat first_name'i yanlışlıkla "Opted-in for WhatsApp"a map'liyor — düzelt).
- **Opt-in gerçeği:** Meta sitedeki checkbox'ı GÖRMEZ. Quality Rating'i (block/report)
  izler. Consent'li kullanıcı daha az block'lar → puanı korur. İlk broadcast'i küçük
  grupta test et (block oranı), sonra büyüt.
- **Broadcast alternatifi:** WhatsApp import takılırsa **Resend email** ile hatırlatma
  daha hızlı/güvenli (ban riski yok, kişisel Zoom linkleri Zoom attendee CSV'sinde var).
- **Hazırlanan CSV'ler** (`/Users/Hakan/Downloads/`, repoda DEĞİL):
  Zoom attendee listesi (487 kişi) Supabase ile eşleştirilip telefonu olanlar (237 →
  temizlenince 219) ManyChat formatına (`phone,first_name`, E.164) çevrildi.
  Parçalar: `manychat-import-TEMIZ.csv` (219), `manychat-parca-1..5.csv`, `manychat-10kisi.csv`.

---

## 7. REHBER DOSYALARI (repo kökünde)

- `STRIPE-EMBED-REHBER.md` — Stripe Embedded Checkout'u GHL'e gömme
- `ZOOM-API-KISA-REHBER.md` — Zoom API entegrasyon adımları
- `funnel-backend/README.md` — backend kullanımı

---

## 8. HIZLI BAŞLANGIÇ (yeni makine / yeni Claude için)

```bash
# 1. Repoyu klonla
git clone https://github.com/bahakizil/bt_tate.git
cd bt_tate

# 2. Bağımlılıklar
npm install

# 3. Env vars — Vercel'den çek veya manuel oluştur
#    (.env.local — secret'lar burada, repoda YOK / .gitignore'da)
#    Gerekli: STRIPE_*, ZOOM_*, RESEND_API_KEY, *_SUPABASE_*, META_CAPI_*

# 4. Değişiklik yap → TS check → commit → vercel --prod → git push
#    (Bölüm 4'teki akışı izle)
```

### Vercel CLI
```bash
vercel whoami              # login kontrolü (scope: haknaci-s-projects)
vercel ls bt_tate          # son deploy'lar
vercel env ls              # env var listesi (değerler şifreli görünür)
```

---

## 9. DİKKAT EDİLECEKLER

- **Secret'lar repoda yok** — `.env.local` `.gitignore`'da. Yeni makinede env'leri
  Vercel Dashboard → Settings → Environment Variables'tan al.
- **Deploy + Push ayrı** — ikisini de yap (Bölüm 4).
- **Dev server cache'li** — değişiklikleri production'da doğrula.
- **`echo` yerine `printf`** — Vercel env eklerken (echo trailing newline ekler, OAuth bozar).
- **Component'ler paylaşımlı** — `components/zoomkayit/*` (ana+katil), `components/basarilikayit/*`
  (firsat+sonfirsat). Birini değiştirince tüm variant'lar etkilenir. Variant'a özel
  davranış için **prop** kullan, default'ları koru.
- **Webinar tarihi /katil'de SABİT** (6 Haziran 2026), ana funnel'da DİNAMİK (her gün 20:00).
