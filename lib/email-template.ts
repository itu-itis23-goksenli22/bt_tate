export const generateWebinarEmailHTML = (name?: string) => {
  const displayName = name || 'Değerli Katılımcı';

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Scale Ücretsiz Webinar - Kaydınız Alındı</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2);">

          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: -0.5px;">
                🎉 Hoş Geldiniz!
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                AI Scale Ücretsiz Webinar
              </p>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #ffffff; font-size: 18px; line-height: 1.6;">
                Merhaba <strong>${displayName}</strong>,
              </p>

              <p style="margin: 0 0 20px 0; color: rgba(255, 255, 255, 0.8); font-size: 16px; line-height: 1.6;">
                <strong>Ücretsiz canlı webinar'a kaydınız başarıyla alındı!</strong> 🚀
              </p>

              <p style="margin: 0 0 30px 0; color: rgba(255, 255, 255, 0.7); font-size: 15px; line-height: 1.6;">
                Webinar gününde size Zoom katılım linkini içeren bir hatırlatma e-postası göndereceğiz. Takvime eklemeyi unutmayın!
              </p>

              <!-- Info Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 20px; background: rgba(59, 130, 246, 0.15); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.3);">
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: bold;">
                      📅 Her Gün — Saat 19:00 (Türkiye Saati)
                    </p>
                    <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.7); font-size: 13px;">
                      Saat 19:00'den sonra kaydolduysan, seminerin ertesi gün 19:00'de.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Features -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 30px;">
                <tr>
                  <td style="padding: 20px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px;">
                    <p style="margin: 0 0 15px 0; color: #3b82f6; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                      Webinar'da Neler Öğreneceksiniz:
                    </p>

                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #3b82f6; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: rgba(255, 255, 255, 0.9); font-size: 15px;">AI ile pasif gelir elde etme yöntemleri</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #3b82f6; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: rgba(255, 255, 255, 0.9); font-size: 15px;">12+ zenginlik yaratma modeli</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #3b82f6; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: rgba(255, 255, 255, 0.9); font-size: 15px;">Gerçek başarı hikayeleri ve stratejiler</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #3b82f6; font-size: 18px; margin-right: 10px;">✓</span>
                          <span style="color: rgba(255, 255, 255, 0.9); font-size: 15px;">Soru-cevap oturumu</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Stats -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 30px;">
                <tr>
                  <td width="33%" style="text-align: center; padding: 15px;">
                    <p style="margin: 0; color: #3b82f6; font-size: 28px; font-weight: bold;">10K+</p>
                    <p style="margin: 5px 0 0 0; color: rgba(255, 255, 255, 0.6); font-size: 13px;">Öğrenci</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 15px; border-left: 1px solid rgba(59, 130, 246, 0.2); border-right: 1px solid rgba(59, 130, 246, 0.2);">
                    <p style="margin: 0; color: #3b82f6; font-size: 28px; font-weight: bold;">6+</p>
                    <p style="margin: 5px 0 0 0; color: rgba(255, 255, 255, 0.6); font-size: 13px;">Modül</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 15px;">
                    <p style="margin: 0; color: #3b82f6; font-size: 28px; font-weight: bold;">24/7</p>
                    <p style="margin: 5px 0 0 0; color: rgba(255, 255, 255, 0.6); font-size: 13px;">Destek</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background: rgba(59, 130, 246, 0.05); border-top: 1px solid rgba(59, 130, 246, 0.1);">
              <p style="margin: 0 0 10px 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: bold; text-align: center;">
                AI Scale
              </p>
              <p style="margin: 0 0 15px 0; color: rgba(255, 255, 255, 0.6); font-size: 13px; text-align: center; line-height: 1.6;">
                Yapay zeka ile geleceğinizi şekillendirin
              </p>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.5); font-size: 12px; text-align: center;">
                © 2025 AI Scale. Tüm hakları saklıdır.
              </p>
            </td>
          </tr>
        </table>

        <!-- Unsubscribe link -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto 0;">
          <tr>
            <td style="text-align: center;">
              <p style="margin: 0; color: rgba(255, 255, 255, 0.4); font-size: 11px;">
                Bu e-postayı almak istemiyor musunuz?
                <a href="https://aiscale.app/unsubscribe" style="color: #3b82f6; text-decoration: underline;">Abonelikten çık</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};
