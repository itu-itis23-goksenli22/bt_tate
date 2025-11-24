# Email Automation Setup Guide

Bu proje için otomatik email gönderme sistemini kurmak için aşağıdaki adımları izleyin.

## 1. Supabase Setup

### Migration'ı Çalıştır

```bash
# Supabase CLI ile migration'ı uygula
supabase db push

# Veya manuel olarak Supabase Dashboard > SQL Editor'de çalıştır:
# supabase/migrations/20250124000000_create_email_subscribers.sql
```

### Tablo Oluşturuldu

`email_subscribers` tablosu oluşturuldu:
- `id`: UUID (primary key)
- `email`: TEXT (unique)
- `name`: TEXT (optional)
- `subscribed_at`: TIMESTAMP
- `webinar_link_sent`: BOOLEAN
- `webinar_link_sent_at`: TIMESTAMP
- `status`: TEXT (active/unsubscribed)
- `source`: TEXT
- `metadata`: JSONB

## 2. Email Provider Setup

**NOT:** Supabase'in kendi email gönderme servisi yok. Email göndermek için üçüncü parti bir servis kullanmamız gerekiyor.

### Neden Resend?
- ✅ En basit kurulum (5 dakika)
- ✅ Ücretsiz 3,000 email/ay
- ✅ Mükemmel deliverability (spam'e düşmez)
- ✅ Modern API ve güzel dashboard

### Adım 1: Resend Hesabı Oluştur
1. https://resend.com adresine git
2. Ücretsiz hesap oluştur (ayda 3,000 email ücretsiz)

### Adım 2: Domain Doğrula
1. Dashboard > Domains > Add Domain
2. `aiscale.app` domain'ini ekle
3. DNS kayıtlarını ekle (SPF, DKIM, DMARC)
4. Doğrulanmasını bekle (~10-15 dakika)

### Adım 3: API Key Al
1. Dashboard > API Keys > Create API Key
2. Key'i kopyala
3. `.env.local` dosyasına ekle:

```env
RESEND_API_KEY=re_xxxxxxxxxx
```

## 3. Environment Variables

`.env.local` dosyasını oluştur:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=re_your_api_key

# Checkout
NEXT_PUBLIC_CHECKOUT_URL=https://ai-scale.circle.so/checkout/aiscaleapp-aylik
```

## 4. Test Et

### Frontend'de Test
1. http://localhost:3000 adresine git
2. "ÜCRETSİZ SEMİNERE KATIL" bölümüne scroll et
3. Email adresini gir ve gönder
4. Email geldi mi kontrol et

### API'yi Curl ile Test
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### Supabase'de Kontrol Et
```sql
SELECT * FROM email_subscribers ORDER BY subscribed_at DESC LIMIT 10;
```

## 5. Email Template

Email template'i `lib/email-template.ts` dosyasında:

- **Modern design** (gradient, shadows)
- **Responsive** (mobile-friendly)
- **CTA button** (https://aiscale.app/webinar-registration)
- **Features list**
- **Stats** (10K+ öğrenci, 6+ modül, 24/7 destek)
- **Unsubscribe link**

## 6. Alternatif Email Providers

Resend yerine kullanabileceğiniz alternatifler:

### SendGrid
```typescript
// app/api/subscribe/route.ts içinde sendWebinarEmail fonksiyonunu değiştir
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: email,
  from: 'noreply@aiscale.app',
  subject: '🎉 AI Scale Ücretsiz Webinar - Kaydınız Alındı!',
  html: htmlContent,
});
```

### AWS SES
```typescript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-east-1" });
await ses.send(new SendEmailCommand({
  Source: 'noreply@aiscale.app',
  Destination: { ToAddresses: [email] },
  Message: {
    Subject: { Data: '🎉 AI Scale Ücretsiz Webinar - Kaydınız Alındı!' },
    Body: { Html: { Data: htmlContent } }
  }
}));
```

## 7. Production Deployment

### Vercel'e Deploy Et
```bash
git add .
git commit -m "Add email automation system"
git push
```

### Environment Variables'ı Vercel'e Ekle
1. Vercel Dashboard > Project > Settings > Environment Variables
2. `.env.local` içindeki tüm değişkenleri ekle
3. Redeploy

## 8. Monitoring

### Email Gönderim Logları
Resend Dashboard > Logs bölümünden email gönderimlerini izleyebilirsin:
- Gönderilen emailler
- Açılma oranları
- Bounce oranları
- Click oranları

### Supabase Analytics
```sql
-- Toplam subscriber sayısı
SELECT COUNT(*) FROM email_subscribers;

-- Bugün kaydolan subscriber'lar
SELECT COUNT(*) FROM email_subscribers
WHERE subscribed_at >= CURRENT_DATE;

-- Email gönderilme oranı
SELECT
  COUNT(*) as total,
  SUM(CASE WHEN webinar_link_sent THEN 1 ELSE 0 END) as sent
FROM email_subscribers;
```

## 9. Troubleshooting

### Email gelmiyor?
1. Spam klasörünü kontrol et
2. Resend Dashboard > Logs'dan hatayı kontrol et
3. Domain doğrulamasını kontrol et
4. API key'in doğru olduğundan emin ol

### Supabase hatası?
1. Row Level Security (RLS) policy'leri kontrol et
2. Service role key doğru mu?
3. Migration çalıştı mı?

### API 500 hatası?
1. Browser console'da error loglarına bak
2. Vercel logs'u kontrol et: `vercel logs`
3. Environment variables eksik mi?

## Support

Sorun yaşarsan:
1. GitHub Issues: https://github.com/bahakizil/bt_tate/issues
2. Email: support@aiscale.app
