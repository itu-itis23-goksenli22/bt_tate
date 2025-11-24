# n8n Webhook Production Mode Kurulumu

## Sorun:
```
404 error: "The requested webhook is not registered"
"In test mode, the webhook only works for one call after you click this button"
```

## Çözüm: Production Mode'a Geç

### Adım 1: n8n Workflow'u Aç
1. https://tunaligokalp.app.n8n.cloud adresine git
2. Chatbot workflow'unu aç

### Adım 2: Webhook Node'unu Production'a Çevir

**Webhook Node Settings:**
1. Webhook node'una tıkla
2. Sağ panel'de ayarları aç
3. **"Webhook Type"** bölümünü bul
4. **"Test Webhook"** → **"Production Webhook"** değiştir
5. Save butonuna bas

### Adım 3: Workflow'u Aktifleştir

1. Sağ üst köşedeki **"Active"** toggle'ı aç (yeşil olmalı)
2. Bu sayede webhook sürekli aktif kalır
3. Test mode gibi her seferinde "Execute" basmana gerek kalmaz

### Adım 4: Production Webhook URL'ini Al

Production mode'a geçince yeni bir URL alacaksın:

**Test URL (eski):**
```
https://tunaligokalp.app.n8n.cloud/webhook-test/1dc6516f-2b39-4c04-912c-eb199c1d048e
```

**Production URL (yeni):**
```
https://tunaligokalp.app.n8n.cloud/webhook/1dc6516f-2b39-4c04-912c-eb199c1d048e
```

Fark: `/webhook-test/` → `/webhook/`

### Adım 5: Kodumuzu Güncelle

Production URL'i aldıktan sonra bana söyle, `/app/api/chat/route.ts` dosyasındaki URL'i güncelleyelim.

---

## Alternatif: Hızlı Test İçin

Eğer şimdilik test etmek istiyorsan:

1. n8n'de workflow'u aç
2. **"Execute Workflow"** butonuna bas (sağ altta)
3. Hemen chatbot'tan mesaj gönder (1 mesaj için çalışır)
4. Her test için tekrar "Execute" basmalısın

**Not:** Bu sürdürülebilir değil, production için mutlaka Production Mode'a geçmelisin.

---

## Production Mode Avantajları:

✅ **Sürekli Aktif:** Execute butonu gereksiz
✅ **Sınırsız İstek:** Test mode 1 istek, production sınırsız
✅ **Güvenilir:** Timeout yok
✅ **Scalable:** 1000+ concurrent user destekler

---

## Webhook Node Configuration Örneği:

```javascript
// n8n Webhook Node Settings
{
  "httpMethod": "POST",
  "path": "1dc6516f-2b39-4c04-912c-eb199c1d048e",
  "responseMode": "responseNode", // veya "lastNode"
  "webhookType": "production" // ÖNEMLİ!
}
```

---

## Webhook Response Format:

n8n'den dönen response şu formatta olmalı:

```json
{
  "response": "AI'nin cevabı buraya",
  "sessionId": "session_123...",
  "timestamp": "2025-01-24T..."
}
```

veya

```json
{
  "message": "AI'nin cevabı buraya"
}
```

veya

```json
{
  "output": "AI'nin cevabı buraya"
}
```

Frontend bunların hepsini destekliyor:
```typescript
data.response || data.message || data.output
```

---

## Troubleshooting:

### 404 Error devam ediyor:
- Workflow aktif mi kontrol et (yeşil toggle)
- URL production mode'a geçmiş mi kontrol et (`/webhook/` olmalı)
- Webhook path doğru mu kontrol et

### 403 Error:
- Webhook authentication açık olabilir
- Settings'den authentication'ı kapat

### Timeout Error:
- n8n workflow çok uzun sürüyor olabilir
- Response süresini kısalt
- Async processing kullan

---

## Production Deployment Checklist:

- [ ] Webhook type: Production
- [ ] Workflow: Active (yeşil)
- [ ] URL: `/webhook/` ile başlıyor
- [ ] Authentication: None (veya header-based)
- [ ] Response format: JSON
- [ ] Timeout: < 30 saniye
- [ ] Error handling: Var

---

Yeni production webhook URL'ini aldığında bana söyle, kodumuzu güncelleyelim! 🚀
