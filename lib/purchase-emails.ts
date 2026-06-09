import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "AI Scale <info@aiscale.app>";

const NOTION_LINK =
  "https://www.notion.so/Yapay-Zeka-Ba-lang-Paketi-2aea3d46179c81f28341ea38e05b15f8?source=copy_link";

// /sonfirsat 29.900 TL paketi için Skool/community giriş linki.
// Şimdilik NOTION_LINK'in aynısı; gerçek topluluk linki gelince
// güncellenecek (kullanıcı sonra söyleyecek).
const SONFIRSAT_COMMUNITY_LINK = NOTION_LINK;

/**
 * Wraps body HTML in a clean responsive email shell.
 */
function shell(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:32px 28px;line-height:1.6;font-size:15px;">
    ${bodyHtml}
    <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px;" />
    <p style="color:#888;font-size:12px;margin:0;">
      Bu mail satın alımınız nedeniyle gönderildi. İletişim:
      <a href="mailto:info@aiscale.app" style="color:#888;">info@aiscale.app</a>
    </p>
  </div>
</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────────────
 * 1) Course Welcome — 15.000 TL kurs alıcıları
 * ───────────────────────────────────────────────────────────────────── */
function courseWelcomeBody(): string {
  return `
    <p>Selam,</p>
    <p>Aiscale eğitimine katıldığın için harika bir karar verdin, aramıza hoş geldin! 🎉</p>
    <p>
      Süreci senin için olabildiğince pratik ve hızlı uygulanabilir hale getirmek istedik.
      Bu yüzden, eğitimde öğrendiklerini hemen aksiyona dökebilmen için hazırladığımız
      <strong>Yapay Zeka Başlangıç Paketi Notion şablonunu</strong> sana hediye ediyoruz.
    </p>
    <p><strong>İçeride seni neler bekliyor?</strong></p>
    <ul style="padding-left:20px;margin:12px 0;">
      <li><strong>Manychat Kurulum Rehberi ve Otomasyonlar</strong> ile sistemlerini hemen kurabilirsin.</li>
      <li><strong>7 Günlük Hızlandırılmış Program</strong> ile ilk haftadan ivme yakalayabilirsin.</li>
      <li><strong>Kanıtlanmış Mesajlaşma Çerçeveleri ve Yapay Zeka Araçları Dizini</strong> ile zaman kazanabilirsin.</li>
      <li>Özel hazırladığımız <strong>Pazar Analitiği Raporu, detaylı HOOK Rehberi</strong> ve <strong>Reklam Yönetimi/Büyütme</strong> PDF'leri ile pazarlamanı bir üst seviyeye taşıyabilirsin.</li>
    </ul>
    <p style="margin:24px 0;">
      <a href="${NOTION_LINK}"
         style="display:inline-block;background:#1a1a1a;color:#ffffff;padding:14px 22px;border-radius:8px;text-decoration:none;font-weight:600;">
        👉 Yapay Zeka Başlangıç Paketi'ne Buradan Eriş
      </a>
    </p>
    <p style="color:#555;font-size:13px;">
      (Açılan sayfada sağ üstteki <strong>"Duplicate"</strong> veya <strong>"Çoğalt"</strong> butonuna basarak
      şablonu kendi Notion alanına kopyalayabilirsin.)
    </p>
    <div style="background:#fff8e1;border-left:4px solid #f5b400;padding:14px 16px;margin:24px 0;border-radius:4px;">
      <p style="margin:0 0 6px 0;"><strong>⚠️ Çok Önemli Bir Not:</strong></p>
      <p style="margin:0;">
        Tüm bu eğitim içeriklerine ve videolara ulaşabilmek için önce <strong>Skoola</strong>'ya giriş yapmalısın.
        Skoola giriş linkin sana gönderdiğimiz diğer mailde yer alıyor. Lütfen önce o link üzerinden
        kaydını tamamla ve platforma giriş yap.
      </p>
    </div>
    <p>
      Sistemleri kurarken veya eğitimleri izlerken aklına takılan herhangi bir şey olursa
      bizimle her zaman iletişime geçebilirsin.
    </p>
    <p>Başarılar ve bol otomasyonlu günler!<br /><strong>Aiscale Ekibi</strong></p>
  `;
}

export async function sendCourseWelcomeEmail(to: string) {
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [to],
    subject: '🎁 Aramıza Hoş Geldin! İşte Sana Özel "Yapay Zeka Başlangıç Paketi" Hediyen 🚀',
    html: shell(courseWelcomeBody()),
  });
  if (error) throw error;
  return data;
}

/* ─────────────────────────────────────────────────────────────────────
 * 1b) Sonfirsat Welcome — ₺29.900 community paketi alıcıları
 *     Claude Code + N8N temalı, /sonfirsat sayfasındaki paket içeriği
 *     ile bire bir uyumlu.
 * ───────────────────────────────────────────────────────────────────── */
function sonfirsatWelcomeBody(): string {
  return `
    <p>Selam,</p>
    <p>
      AI Scale Community'e katıldığın için harika bir karar verdin —
      aramıza hoş geldin! 🎉
    </p>
    <p>
      Topluluğa ve eğitim içeriklerine erişimini hemen aktifleştirdik.
      Hazırladığımız <strong>Claude Code Masterclass</strong>,
      <strong>N8N otomasyon stack'i</strong> ve API entegrasyon
      toolkit'i ile sıfırdan AI ajansı kurma yolculuğun başlıyor.
    </p>

    <p><strong>📦 Paketinde Neler Var?</strong></p>
    <ul style="padding-left:20px;margin:12px 0;">
      <li><strong>Claude Code Masterclass</strong> + canlı topluluk
        erişimi — sıfırdan kod yazarak yapay zeka ajansı kurmanın
        tam yol haritası.</li>
      <li><strong>N8N otomasyon stack'i</strong> + canlı mentörlük —
        kod yazmadan müşterilere otomasyon satabileceğin pratik
        sistemler.</li>
      <li><strong>API entegrasyon toolkit'i</strong> + Ads stratejisi +
        Setter sistemi — gelir kanallarını sağlamlaştır.</li>
      <li>Tüm bonuslar + <strong>AI ajans kurulum kiti</strong> —
        şablonlar, scriptler, mesajlaşma çerçeveleri.</li>
    </ul>

    <p style="margin:24px 0;">
      <a href="${SONFIRSAT_COMMUNITY_LINK}"
         style="display:inline-block;background:#1a1a1a;color:#ffffff;padding:14px 22px;border-radius:8px;text-decoration:none;font-weight:600;">
        👉 Topluluğa ve Eğitim İçeriklerine Eriş
      </a>
    </p>

    <div style="background:#fff8e1;border-left:4px solid #f5b400;padding:14px 16px;margin:24px 0;border-radius:4px;">
      <p style="margin:0 0 6px 0;"><strong>⚠️ Önemli Not:</strong></p>
      <p style="margin:0;">
        Tüm eğitim içeriklerine ve canlı topluluk oturumlarına
        erişebilmek için yukarıdaki butona tıkla. Aklında soru olursa
        topluluk içindeki kanallardan direkt ekiple iletişime
        geçebilirsin.
      </p>
    </div>

    <p>
      İlk adımı atmak için Claude Code modülünden başlamanı öneriyoruz —
      ilk 7 günde uygulanabilir bir proje çıkarmış olacaksın.
    </p>
    <p>Başarılar ve bol otomasyonlu günler!<br /><strong>AI Scale Ekibi</strong></p>
  `;
}

export async function sendSonfirsatWelcomeEmail(to: string) {
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [to],
    subject:
      "🚀 AI Scale Community'e Hoş Geldin — Claude Code & N8N Erişimin Aktif",
    html: shell(sonfirsatWelcomeBody()),
  });
  if (error) throw error;
  return data;
}

/* ─────────────────────────────────────────────────────────────────────
 * 2) VIP Upsell — $27 alıcıları (yeni versiyon — /vipodemeonay
 *    sayfasındaki paket/seminer akışıyla birebir uyumlu).
 *    İçerik 3 kart: (1) Yapay Zeka Başlangıç Paketi'ne eriş,
 *    (2) Bonus Eğitim Video Serisi, (3) Seminere mutlaka katıl.
 * ───────────────────────────────────────────────────────────────────── */
const BONUS_PLAYLIST =
  "https://youtube.com/playlist?list=PLTxbxLRP7FbhMK-Dh_uWaJrYOLnaJUzyU&si=G1fqnnetUAQGuOLR";

function vipUpsellBody(): string {
  return `
    <p style="font-size:16px;margin:0 0 14px 0;">Selam,</p>
    <p style="margin:0 0 14px 0;">
      <strong>VIP üyeliğin onaylandı 🔒</strong> — aramıza hoş geldin!
      Aşağıda VIP üyeliğinle birlikte gelen 3 şeye buradan ulaşabilirsin.
    </p>

    <!-- 1) Yapay Zeka Başlangıç Paketi -->
    <div style="border:2px solid #C19D44;border-radius:9px;padding:20px;margin:20px 0;background:#fffaf0;">
      <p style="margin:0 0 6px 0;color:#AA813C;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
        1 — Bunlara Eriş
      </p>
      <p style="margin:0 0 10px 0;font-size:19px;font-weight:800;color:#1a1a1a;">
        📦 Yapay Zeka Başlangıç Paketi
      </p>
      <p style="margin:0 0 14px 0;color:#444;">
        Manychat kurulum rehberi, 7 günlük hızlandırılmış program, mesajlaşma
        çerçeveleri, HOOK rehberi, reklam yönetimi PDF'leri ve daha fazlası —
        hepsi tek Notion sayfasında.
      </p>
      <a href="${NOTION_LINK}"
         style="display:inline-block;background:#C19D44;color:#1a1a1a;padding:13px 22px;border-radius:8px;text-decoration:none;font-weight:700;">
        👉 Paketi Aç
      </a>
      <p style="margin:10px 0 0 0;color:#777;font-size:12px;">
        Sağ üstteki <strong>"Duplicate"</strong> / <strong>"Çoğalt"</strong>
        butonuyla kendi Notion alanına kopyalayabilirsin.
      </p>
    </div>

    <!-- 2) Bonus Eğitim Video Serisi -->
    <div style="border:2px solid #00b09b;border-radius:9px;padding:20px;margin:20px 0;background:#f0fdf9;">
      <p style="margin:0 0 6px 0;color:#00876d;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
        2 — Seminer Öncesi İzle
      </p>
      <p style="margin:0 0 10px 0;font-size:19px;font-weight:800;color:#1a1a1a;">
        🎥 Bonus Eğitim Video Serisi
      </p>
      <p style="margin:0 0 14px 0;color:#444;">
        Yapay zeka ile sıfırdan startup kurmanın tam video serisi. Semineri
        en yüksek faydayla geçirmek için önceden bu seriyi izlemen bekleniyor.
      </p>
      <a href="${BONUS_PLAYLIST}"
         style="display:inline-block;background:#00b09b;background-image:linear-gradient(135deg,#00b09b 0%,#96c93d 100%);color:#ffffff;padding:13px 22px;border-radius:8px;text-decoration:none;font-weight:700;">
        ▶ Tıkla, İzle
      </a>
    </div>

    <!-- 3) Seminere Mutlaka Katıl -->
    <div style="border:2px solid #C19D44;border-radius:9px;padding:20px;margin:20px 0;background:#fffaf0;">
      <p style="margin:0 0 6px 0;color:#AA813C;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
        3 — Unutma
      </p>
      <p style="margin:0 0 10px 0;font-size:19px;font-weight:800;color:#1a1a1a;">
        📅 Seminere Mutlaka Katıl
      </p>
      <p style="margin:0 0 6px 0;color:#444;">
        Seminer linkin sana ayrı bir mailde gönderildi. Zoom üzerinden canlı
        yayın — saat geldiğinde tek tıkla katılacaksın.
      </p>
      <div style="background:#fff8e1;border-left:4px solid #f5b400;padding:12px 14px;margin:14px 0 0 0;border-radius:4px;">
        <p style="margin:0;color:#5a4a00;font-size:13px;">
          <strong>İpucu:</strong> Seminere baştan sona katılan üyeler her zaman
          en çok kazananlar oluyor — başta paylaşılan kurulumları kaçırma,
          sonda da sürpriz fırsatlar var.
        </p>
      </div>
    </div>

    <p style="margin:24px 0 14px 0;">
      Aklına takılan bir şey olursa
      <a href="mailto:info@aiscale.app" style="color:#AA813C;">info@aiscale.app</a>
      adresinden ulaşabilirsin.
    </p>
    <p style="margin:0;">Seminerde görüşürüz!<br /><strong>AI Scale Ekibi</strong></p>
  `;
}

export async function sendVipUpsellEmail(to: string) {
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [to],
    subject: "🔒 VIP Üyeliğin Hazır — Paketin, Bonus Eğitim ve Seminer Bilgileri",
    html: shell(vipUpsellBody()),
  });
  if (error) throw error;
  return data;
}

/* ─────────────────────────────────────────────────────────────────────
 * 3) Webinar Welcome — Zoom kayıt sonrası YouTube engagement
 *    Sadece aiscale tarafına atılıyor (eticaret webinar'a değil).
 * ───────────────────────────────────────────────────────────────────── */
const YOUTUBE_CHANNEL = "https://www.youtube.com/@baturalp.tunali";

function webinarWelcomeBody(
  firstName: string,
  eventDateString?: string,
  tesekkurUrl?: string
): string {
  const safeName = firstName ? firstName.replace(/[<>]/g, "") : "";
  // Seminer detay/geri sayım sayfası butonu — /katil kayıtları için
  // tesekkurUrl geçilir (kişiye özel name+email param'lı link).
  const detailButton = tesekkurUrl
    ? `
    <p style="margin:24px 0;text-align:center;">
      <a href="${tesekkurUrl}"
         style="display:inline-block;background:#C19D44;color:#1a1a1a;padding:15px 30px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;">
        📅 Seminer Detayların & Geri Sayım →
      </a>
    </p>`
    : "";
  // Tarih sabit etkinlik için (örn. /katil — 6 Haziran 2026); ana funnel
  // (her gün 20:00 auto-webinar) için eventDateString geçilmez ve bu blok
  // gizlenir.
  const dateBlock = eventDateString
    ? `
    <div style="background:#fffbeb;border:2px solid #C19D44;padding:18px 20px;margin:20px 0;border-radius:8px;text-align:center;">
      <p style="margin:0 0 6px 0;color:#AA813C;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
        📅 Seminer Tarihi
      </p>
      <p style="margin:0;color:#1a1a1a;font-size:20px;font-weight:800;">
        ${eventDateString}
      </p>
      <p style="margin:8px 0 0 0;color:#666;font-size:13px;">
        Zoom katılım linkin ayrı bir mailde gönderildi.
      </p>
    </div>`
    : "";

  return `
    <p>Selam${safeName ? ` ${safeName}` : ""},</p>
    <p>
      AI Scale ücretsiz seminerine kaydolduğun için teşekkürler! 🎉
      Aramızda görüşene kadar sana faydalı olabilecek bir şey paylaşmak istedik.
    </p>
    ${dateBlock}
    ${detailButton}
    <div style="background:#f0f9ff;border-left:4px solid #2563eb;padding:14px 16px;margin:20px 0;border-radius:4px;">
      <p style="margin:0 0 6px 0;"><strong>🎬 Seminere Kadar Bunu İzle</strong></p>
      <p style="margin:0;">
        Baturalp Tunalı'nın YouTube kanalında <strong>yapay zeka, otomasyon ve
        ölçeklenme</strong> üzerine onlarca pratik video var. Seminerden önce 1-2
        video izleyenler içeriği çok daha iyi yakalıyor — temel kavramları
        zaten oturmuş halde geliyorlar.
      </p>
    </div>
    <p style="margin:24px 0;text-align:center;">
      <a href="${YOUTUBE_CHANNEL}"
         style="display:inline-block;background:#FF0000;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
        ▶ YouTube Kanalını Ziyaret Et
      </a>
    </p>
    <p style="color:#555;font-size:13px;text-align:center;">
      <a href="${YOUTUBE_CHANNEL}" style="color:#555;">${YOUTUBE_CHANNEL}</a>
    </p>
    <p>
      <strong>Önerimiz:</strong> Yapay zeka ile ilgili son 2-3 videoyu izle,
      hangi konuların seni yakaladığını gör — seminerde bu konuları çok daha
      derin ele alacağız.
    </p>
    <p>
      Seminer linkin sana ayrı bir mailde gönderildi. Aklına takılan bir şey
      olursa <a href="mailto:info@aiscale.app" style="color:#2563eb;">info@aiscale.app</a>
      adresinden bize ulaşabilirsin.
    </p>
    <p>Seminerde görüşmek üzere!<br /><strong>AI Scale Ekibi</strong></p>
  `;
}

export async function sendWebinarYoutubeEmail(
  to: string,
  firstName?: string,
  // Sabit tarihli etkinlik (örn. /katil) için "6 Haziran 2026 Cumartesi
  // 20:00 (TR)" gibi string. Belirtilmezse mailde tarih bloğu gizlenir
  // (ana funnel her gün auto-webinar yaptığı için tarih sabit değil).
  eventDateString?: string
) {
  // Subject de tarihliyse netleşsin
  const subject = eventDateString
    ? `🎬 Seminerine Hazırlık — ${eventDateString}`
    : "🎬 Seminere Kadar — Sana Özel Yapay Zeka Videoları";

  // /katil kayıtları (eventDateString'li) için seminer detay/geri sayım
  // sayfasına kişiye özel link. VIP alsın almasın herkese gider.
  const tesekkurUrl = eventDateString
    ? `https://www.aiscaleapp.com/katil/kayitbasarili/tesekkurler?name=${encodeURIComponent(
        firstName || ""
      )}&email=${encodeURIComponent(to)}`
    : undefined;

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [to],
    subject,
    html: shell(webinarWelcomeBody(firstName || "", eventDateString, tesekkurUrl)),
  });
  if (error) throw error;
  return data;
}
