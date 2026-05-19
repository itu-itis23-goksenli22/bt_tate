import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "AI Scale <info@aiscale.app>";

const NOTION_LINK =
  "https://www.notion.so/Yapay-Zeka-Ba-lang-Paketi-2aea3d46179c81f28341ea38e05b15f8?source=copy_link";

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
 * 2) VIP Upsell — $19.90 alıcıları (seminer hazırlık + topluluk teaser)
 * ───────────────────────────────────────────────────────────────────── */
function vipUpsellBody(): string {
  return `
    <p>Selam,</p>
    <p>VIP üyeliğin için teşekkürler! Harika bir karar verdin, aramıza hoş geldin. 🎉</p>
    <p>
      Sana, seminerden mümkün olan en yüksek faydayı alabilmen için özel olarak hazırladığımız
      <strong>Yapay Zeka Başlangıç Paketi Notion şablonunu</strong> gönderiyoruz.
    </p>
    <div style="background:#f0f9ff;border-left:4px solid #2563eb;padding:14px 16px;margin:20px 0;border-radius:4px;">
      <p style="margin:0 0 6px 0;"><strong>🎯 Bu pakete neden ihtiyacın var?</strong></p>
      <p style="margin:0;">
        Seminer öncesinde bu rehberleri inceleyerek temel bilgileri öğrenirsin —
        böylece seminerde ileri seviye taktiklere odaklanabilirsin.
        Hazırlanmış olarak gelen üyeler kat kat daha fazla sonuç alıyor.
      </p>
    </div>
    <p><strong>📦 İçeride neler var?</strong></p>
    <ul style="padding-left:20px;margin:12px 0;">
      <li><strong>Manychat Kurulum Rehberi ve Otomasyonlar</strong> — sistemlerini hemen kurabilirsin</li>
      <li><strong>7 Günlük Hızlandırılmış Program</strong> — ilk haftadan ivme yakala</li>
      <li><strong>Kanıtlanmış Mesajlaşma Çerçeveleri</strong> & <strong>Yapay Zeka Araçları Dizini</strong></li>
      <li><strong>Pazar Analitiği Raporu, HOOK Rehberi</strong> ve <strong>Reklam Yönetimi/Büyütme</strong> PDF'leri</li>
    </ul>
    <p style="margin:24px 0;">
      <a href="${NOTION_LINK}"
         style="display:inline-block;background:#1a1a1a;color:#ffffff;padding:14px 22px;border-radius:8px;text-decoration:none;font-weight:600;">
        👉 Yapay Zeka Başlangıç Paketi'ne Buradan Eriş
      </a>
    </p>
    <p style="color:#555;font-size:13px;">
      (Açılan sayfada sağ üstteki <strong>"Duplicate"</strong> / <strong>"Çoğalt"</strong> butonuna basarak
      şablonu kendi Notion alanına kopyalayabilirsin.)
    </p>
    <div style="background:#ecfdf5;border-left:4px solid #10b981;padding:14px 16px;margin:24px 0;border-radius:4px;">
      <p style="margin:0 0 6px 0;"><strong>🚀 Sonraki Adım</strong></p>
      <p style="margin:0;">
        Seminere mutlaka katıl ve <strong>baştan sona izle</strong> — diğer katılımcılardan
        bir adım önde başlayacaksın. Bu paketi önceden incelediğin için seminerde paylaşılan
        ileri seviye stratejileri ve sürpriz fırsatları çok daha hızlı uygulamaya
        dökebileceksin. Seminerin sonuna kadar kalanlar her zaman en çok kazananlar oluyor.
      </p>
    </div>
    <p>
      Aklına takılan bir şey olursa
      <a href="mailto:info@aiscale.app" style="color:#2563eb;">info@aiscale.app</a>
      adresinden ulaşabilirsin.
    </p>
    <p>Başarılar ve bol otomasyonlu günler!<br /><strong>AI Scale Ekibi</strong></p>
  `;
}

export async function sendVipUpsellEmail(to: string) {
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [to],
    subject: '🎁 Seminere Hazırlık Paketin Hazır! "Yapay Zeka Başlangıç Paketi" 🚀',
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

function webinarWelcomeBody(firstName: string): string {
  const safeName = firstName ? firstName.replace(/[<>]/g, "") : "";
  return `
    <p>Selam${safeName ? ` ${safeName}` : ""},</p>
    <p>
      AI Scale ücretsiz seminerine kaydolduğun için teşekkürler! 🎉
      Aramızda görüşene kadar sana faydalı olabilecek bir şey paylaşmak istedik.
    </p>
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

export async function sendWebinarYoutubeEmail(to: string, firstName?: string) {
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [to],
    subject: "🎬 Seminere Kadar — Sana Özel Yapay Zeka Videoları",
    html: shell(webinarWelcomeBody(firstName || "")),
  });
  if (error) throw error;
  return data;
}
