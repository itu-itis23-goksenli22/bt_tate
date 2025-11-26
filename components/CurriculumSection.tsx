"use client";

import { useState } from "react";

interface Lesson {
  title: string;
  subsections?: string[];
}

interface Module {
  title: string;
  lessons: (string | Lesson)[];
}

interface Campus {
  name: string;
  icon: string;
  color: string;
  modules: Module[];
}

export default function CurriculumSection() {
  const [openCampus, setOpenCampus] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<{ [key: string]: boolean }>({});

  const toggleModule = (campusIndex: number, moduleIndex: number) => {
    const key = `${campusIndex}-${moduleIndex}`;
    setOpenModule(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const campuses: Campus[] = [
    {
      name: "N8N Otomasyon Ajansı",
      icon: "🤖",
      color: "from-blue-500/20 to-cyan-500/20",
      modules: [
        {
          title: "1. GİRİŞ: AJANS VİZYONU & STRATEJİK BAKIŞ",
          lessons: [
            "Yapay Zeka Eğitimi ile Geleceği Şekillendirin",
            "Dijital Otomasyon Ajansı ve Başarı Stratejileri",
            "Dijital Otomasyon Ajansı Modeli ve Yeni Fırsatlar",
            "Yapay Zeka ile Geleceği Yakalamak",
            "Başarılı Ajans Sahiplerinin Sahip Olduğu Zihniyet",
            "Otomasyon Süreçlerinde Satışın Önemi ve Stratejileri"
          ]
        },
        {
          title: "2. STRATEJİ VE PLANLAMA",
          lessons: [
            "Doğru Niş Seçimi ve Yüksek Gelir Elde Etme Stratejileri",
            "Ajans Modeli Oluşturma Stratejileri",
            "Girişimciler Neden Başarısız Olur? En Sık Yapılan Hatalar",
            "30 Günlük Yol Haritası: Öğren, Uygula, Sat"
          ]
        },
        {
          title: "3. TEKNİK UYGULAMA (TOOLKIT VE PROJELER)",
          lessons: [
            "N8N Nedir?",
            "N8N Bilgisayara Kurulumu, Ücretsiz Kullanımı ve Üyelik Sistemi",
            "N8N ile Neler Yapılabilir?",
            "N8N Workflows Sayfasından Template Kullanımı",
            "N8N Node Türleri",
            "Google (Drive, Calendar, Gmail) API Key Almak",
            "OPENAI API Nasıl Alınır? N8N İçerisinde GPT Kullanmak",
            "RapidAPI API Almak, Servis Bulmak, N8N Aktarımı",
            "API Key / HTTP Tool / Google Access Token Alma",
            "Veri Yapıları Ve Borsa Analiz Otomasyonu",
            "N8N Webhook Nedir?",
            "Instagram İçerik Analiz Otomasyonu",
            "Telegram Chatbot Yapay Zeka Randevu Sistemi",
            "TAVILY API Nasıl Alınır? (Web Search Tool)",
            "Telegram Web Agent Chatbot Otomasyonu",
            "N8N Mail Filter, Summarize Otomasyonu"
          ]
        },
        {
          title: "MASTERCLASS (PRO ÜYELERİMİZE ÖZEL)",
          lessons: [
            "Yapay Zeka ile Akıllı Chatbot Oluşturma",
            "Bolt ile SaaS Platformu Kurmak (N8N, Supabase, Stripe)",
            "Bolt ve N8N Kullanarak Müşterileriniz İçin Kendi Danışmanlık Sitenizi Yaratın!",
            "Bolt ve N8N Kullanarak Restoranlara Website Yaratmak!",
            "N8N Haberleri Görselleştiren, Açıklama Yazan Otomasyon",
            "Fal.ai ile Telegramda Kendi Photoshop Agentinizi Yaratmak!",
            "Karmaşık Workflow Oluşturma ve Yönetme Yöntemleri",
            "Kıyafet Giydirme Görsel ve Video Otomasyonu",
            "Claude'un MCP Özelliği ile Chatleşerek Workflow Oluşturma"
          ]
        },
        {
          title: "4. ÜRÜNLEŞTİRME VE PAKETLEME",
          lessons: [
            "Ürünleştirme Adımları? Fiyatlandırma Mantığı: Saat değil, değer sat",
            "Müşteri Onboarding Süreci (Brief, Hedef, Beklenti)",
            "Ürünleştirme"
          ]
        },
        {
          title: "5. SATIŞ STRATEJİLERİ",
          lessons: [
            "Satış Kısmı ve N8N",
            "Exa.ai ile N8N kullanarak Linkedin Üzerinden Müşterilerinizi Bulun ve Raporlayın!",
            "Instantly",
            "Apollo"
          ]
        },
        {
          title: "6. BÜYÜTME VE GLOBALLEŞTİRME",
          lessons: [
            "Altyapıyı Büyütmek: Ekip kurmak, görev devri, freelance kullanımı",
            "İngiltere Şirket Kurulumu",
            "Şirket Wise&Stripe Kurulumu",
            "Ekip Yönetimi İçin Etkili Araçlar"
          ]
        },
        {
          title: "7. ADS STRATEJİSİ",
          lessons: [
            "Ads Giriş",
            "Ads Account Isındırma",
            "Ads Strategy Yapılacaklar",
            "Ads Kurulumu",
            "Instagram Funnel 3 Aşamada",
            "ABC Ads Stratejisi",
            "KPI Takip Reklam Sonrası",
            "Kazananları Bulma ve Ölçeklendirme"
          ]
        },
        {
          title: "8. SETTER",
          lessons: [
            "Setter Önemi",
            "Reklam Dm Scripti",
            "10M$ Setting Protokolü"
          ]
        },
        {
          title: "9. KAYNAK KİTİ",
          lessons: [
            "Hazır Otomasyon Sistemleri (N8N)",
            "Otomatik mail cevaplayıcı txt",
            "Hazır GPT Prompt Paketleri (E-ticaret, Danışmanlık, Müşteri Hizmetleri)",
            "Otomasyon tüm dokümanlar txt"
          ]
        },
        {
          title: "YAYINLAR",
          lessons: [
            "YAYIN 1 - N8N TEKNİK YAYINI",
            "YAYIN 2 - N8N TEKNİK YAYINI",
            "YAYIN 3 - N8N TEKNİK YAYINI",
            "YAYIN 4 - N8N TEKNİK YAYINI",
            "YAYIN 5 - 24 EKİM 2025 N8N TEKNİK YAYINI",
            "YAYIN 6 BATURALP SATIŞ&PAZARLAMA 28 EKİM",
            "YAYIN 7/8 - 2 KASIM 2025 N8N TEKNİK YAYINI",
            "YAYIN 9 - N8N TEKNİK YAYINI 14 KASIM",
            "YAYIN 10 BATURALP SATIŞ&PAZARLAMA 18 KASIM",
            "YAYIN 11 BATURALP VE TEKNİK (SİZDEN GELENLER)"
          ]
        }
      ]
    },
    {
      name: "E-Commerce & Amazon FBA",
      icon: "📦",
      color: "from-purple-500/20 to-pink-500/20",
      modules: [
        {
          title: "AKADEMİYE HOŞGELDİN",
          lessons: [
            "AKADEMİYE HOŞGELDİNİZ",
            "E-COMMERCE DÜNYASI",
            "EĞİTİM MÜFREDATI",
            "EĞİTİMLE İLGİLİ TAVSİYELER",
            "TÜRKİYENİN YENİ DÜZENDENKİ STRATEJİK KONUMU"
          ]
        },
        {
          title: "1. GİRİŞ",
          lessons: [
            "E-COMMERCE",
            "HESAP AÇMA HAKKINDA",
            "TR ŞAHIS ŞİRKETİ İLE AMAZON AVRUPA HESAP AÇILIŞI",
            "PAYONEER HESAP AÇILIŞI",
            "HESAP AÇMA BELGELERİ PDF TO WORD METHOD",
            "DEPOSIT METHOD",
            "ARBITRAGE WHOLESALE BUSINESS MODEL",
            "FBA VS FBM",
            "WHOLESALE GİRİŞ",
            "BUYBOX",
            "PRIVATE LABEL",
            "TEDARİKÇİ WEBSİTELERİNE KAYIT",
            "ANALİZ PROGRAMLARI İNCELEME",
            "KEYWORD GİRİŞ",
            "AFFILIATE MARKETING",
            "BAŞLANGIÇ ÖZET",
            "BAŞLANGIÇ BÖLÜM KAPANIŞ"
          ]
        },
        {
          title: "2. ÜRÜN BUL / KEYWORD",
          lessons: [
            "BUL BÖLÜM GİRİŞ",
            "KEYWORD 2",
            "ÜRÜN BULMA TÜRKİYE STRATEJİSİ",
            "AMAZON'U TANIMAK",
            "AMAZON MÜŞTERİ STRATEJİSİ",
            "AMAZON KRİTİK VERİ ANALİZİ",
            "BLACK BOX ÜRÜN ARAMA",
            "BLACK BOX KEYWORD ARAMA",
            "PINTEREST İLE ÜRÜN VE KEYWORD BULMA",
            "GELENEKSEL ÜRÜN ARAMA YÖNTEMİ",
            "KEYWORD ADVANCE 1",
            "KEYWORD ADVANCE 2",
            "KEYWORD ADVANCE 3",
            "KEYWORD ÖZET",
            "SEZONSAL ÜRÜNLERDE GLOBAL ÜRÜN STRATEJİSİ",
            "FUARLAR TEDARİKÇİYLE DİREK İLETİŞİME GEÇMEK",
            "AVRUPA GÖNDERİM VAT STRATEJİSİ GÜMRÜK SÜRECİ PAN-EUROPEAN",
            "ÇİNLİ SATICILARIN ÜRÜN STRATEJİLERİ",
            "30 DAKİKADA ÜRÜN BUL",
            "EGROW GLOBAL PAZAR ANALİZİ KEŞFEDİLMEMİŞ PAZARLAR",
            "RETAIL ARBITRAGE 1",
            "RETAIL ARBITRAGE TOPTANCI ÜZERİNDEN ÜRÜN ARAMA",
            "RETAIL ARBITRAGE ÜRÜN ARAMA BLACK BOX",
            "RETAIL ARBITRAGE GLOBAL STRATEJİ ADVANCE"
          ]
        },
        {
          title: "3. ÜRÜNÜ YAPILANDIR / MARKA",
          lessons: [
            "Minimum Order Quantity ve Tedarikçi İletişimi",
            "7 Adımda Markalaşma Brand Management",
            "Marketing Advance Marka ve Paket",
            "Marketing Advance 2 ve Nöromarketing Dizayn",
            "Nöromarketing analiz ve Eyetracking",
            "Tedarikçi İletişimi ve Pazarlık",
            "Tedarikçilerle Pazarlık Advance",
            "Tedarikçi ve Nakliye Kontrat Detayları",
            "Alibaba Tedarikçi Dikkat Edilmesi Gerekenler",
            "Retail Arbitraj&Wholesale Listing Oluşturma",
            "Product Approval Süreci",
            "Listing Oluşturma Keyword Strateji",
            "Listing Oluşturma Keyword Strateji 2",
            "FBA Shipping Plan"
          ]
        },
        {
          title: "4. SATIŞA BAŞLA",
          lessons: [
            "Satış Bölüm Özeti",
            "Giveaway Keyword Index",
            "Giveaway Yorum",
            "Exact PPC Lansman",
            "PPC Advance",
            "PPC 2",
            "Kupon Kodu"
          ]
        },
        {
          title: "5. POZİSYONUNU KORU VE BÜYÜ",
          lessons: [
            "Tüketici Davranışı ve Fiyat",
            "Satış Bölüm Sonu",
            "Super Url GEM",
            "Müşteri Negatif Yorum Değiştirme",
            "Günlük İş Takibi",
            "İade Ayarları",
            "Removal Order",
            "Negatif Dükkan Yorumları Silme",
            "Marka Koruma Adımları",
            "Kitle Oluşturma"
          ]
        }
      ]
    },
    {
      name: "Kripto Para Yatırımı",
      icon: "₿",
      color: "from-yellow-500/20 to-orange-500/20",
      modules: [
        {
          title: "KRİPTO PARA",
          lessons: [
            "Emir Tipleri",
            "Hesap Güvenliği",
            "Kripto Para Borsası Nedir?",
            "Kripto Para Cüzdanı Nedir?"
          ]
        },
        {
          title: "TEMEL ANALİZ",
          lessons: [
            "Coinmarketcal",
            "Coinmarketcap",
            "Crypto Panik",
            "Temel Analize Giriş"
          ]
        },
        {
          title: "TRADING VIEW",
          lessons: [
            "Alarm Kurma",
            "Araç Çubukları",
            "Grafik Seçimi ve İzleme Listesi",
            "Indikatör Kullanımı",
            "Paper Trading",
            "Periyotlar",
            "Trading View Üyelik"
          ]
        },
        {
          title: "MUM GRAFİKLERİ",
          lessons: [
            "Beyaz Asker",
            "Yutan Ayı",
            "Siyah Karga",
            "Asılı Adam",
            "Ayı Harami",
            "Boğa Harami",
            "Çekiç Formasyonu",
            "Doji Mumu",
            "Kayan Yıldız",
            "Mum Formasyonları",
            "Mum Yapısı",
            "Yutan Boğa"
          ]
        },
        {
          title: "DESTEK VE DİRENÇ",
          lessons: [
            "Destek ve Direnç Değişkenleri",
            "Destek ve Direnç Nedir",
            "Eğimli Destek ve Dirençler",
            "Yatay Destek ve Dirençler"
          ]
        },
        {
          title: "TRENDLER",
          lessons: [
            "Düşen Trend",
            "Trend Kanalı",
            "Trend Nedir",
            "Trend Türleri",
            "Yatay Trend",
            "Yükselen Trend"
          ]
        },
        {
          title: "İNDİKATÖRLER",
          lessons: [
            "ATR",
            "Bollinger Bands",
            "CCI",
            "MACD",
            "RSI",
            "StochRSI"
          ]
        },
        {
          title: "FIBONACCI",
          lessons: ["Fibonacci"]
        },
        {
          title: "SETUP OLUŞTURMA",
          lessons: [
            "Stop Loss ve Hedef Belirleme",
            "Trade Setup"
          ]
        },
        {
          title: "RİSK VE PORTFÖY YÖNETİMİ",
          lessons: [
            "Kademeli Alış",
            "Kademeli Satış",
            "Portföy Yönetimi",
            "Risk Unsurları",
            "Yatırımcı Tipi"
          ]
        },
        {
          title: "UYGULAMA",
          lessons: [
            "Analiz Örneği 1",
            "Analiz Örneği 2",
            "Market Tarama"
          ]
        }
      ]
    },
    {
      name: "ETSY & Shopify Dropshipping",
      icon: "🛍️",
      color: "from-green-500/20 to-emerald-500/20",
      modules: [
        {
          title: "1. GİRİŞ (ETSY)",
          lessons: [
            "GİRİŞ",
            "Başlangıç",
            "Neden ETSY?",
            "Etsy.com İnceleme",
            "ETSY Fee'leri",
            "ETSY Hikayem"
          ]
        },
        {
          title: "2. HESAP OLUŞTURMA",
          lessons: ["KULLANICI HESABI NASIL OLUŞTURULUR"]
        },
        {
          title: "3. DÜKKAN AÇMAK",
          lessons: ["Satış Dükkanı Nasıl Oluşturulur? Hesap Bilgileri, Logo, Banner ve İpuçları"]
        },
        {
          title: "4. ÜRÜN BULMAK",
          lessons: [
            "Keyword ile Ürün Bulma",
            "Sezonsal Ürün Bulma",
            "Online Ürün Bulma",
            "Fiziksel Ürün Bulma ve Tedarikçi İletişimi"
          ]
        },
        {
          title: "5. ÜRÜN LİSTELEME",
          lessons: [
            "Fotoğraf ve Video",
            "Size Chart",
            "Tag Description",
            "Fiyat Planı Excel",
            "Kargo ve Genel Listeleme"
          ]
        },
        {
          title: "6. SATIŞ VE PAZARLAMA",
          lessons: [
            "Sipariş Almak",
            "Sipariş Ödemesi",
            "Sipariş Kontrolü ve Yorum",
            "Sipariş Takibi Ek",
            "Reklam Sosyal Medya",
            "Kuponlar ve İndirimler",
            "Sayfa Düzeni"
          ]
        },
        {
          title: "7. KARGO",
          lessons: [
            "Free Shipping",
            "Shipping Profile Kargo Firmaları",
            "Kargo İade"
          ]
        },
        {
          title: "8. DÜKKANI KORUMAK VE BÜYÜTMEK",
          lessons: [
            "Günlük İş Takibi",
            "Müşteri Takibi",
            "Tagler",
            "Yeni Listeleme",
            "Yorum ve Feedback"
          ]
        },
        {
          title: "9. SIKÇA SORULAN SORULAR",
          lessons: [
            "Genel Tekrar",
            "Excel Çalışması",
            "TOPTANCI LİSTESİ"
          ]
        },
        {
          title: "GİRİŞ MINDSET (SHOPIFY)",
          lessons: [
            "HOŞGELDİNİZ",
            "MINDSET VE RECESSION",
            "EĞLENCELİ HALE GETİR",
            "NELER ÖĞRENECEĞİZ",
            "SHOPIFY KAYIT",
            "DROPSHIPPING VS FBA"
          ]
        },
        {
          title: "SHOPIFY STORE KURULUMU",
          lessons: [
            "SHOPIFY GENEL BAKIŞ",
            "MAĞAZA ADI SEÇİMİ GENEL NICHE",
            "CANVA LOGO OLUŞTURMA",
            "SHOPIFY POLICIES",
            "KULLANILACAK UYGULAMALAR",
            "DESIGN VE ÜRÜN YÜKLEME",
            "ÖDEME SİSTEMLERİ",
            "SİPARİŞ TAKİBİ",
            "TEDARİKÇİ VE LİNKLER"
          ]
        },
        {
          title: "ÜRÜN ARAŞTIRMA",
          lessons: [
            "MOTİVASYON SNIPER MINDSET",
            "ÜRÜN SEÇİM KRİTERİ",
            "ÜRÜN SEÇİM METHOD 1-5",
            "DİJİTAL ÜRÜNLÜ MAĞZA ÖRNEĞİ"
          ]
        },
        {
          title: "ŞİRKET WISE&STRIPE KURULUMU",
          lessons: ["1ST FORMATION"]
        },
        {
          title: "TIKTOK ADS",
          lessons: [
            "TIKTOK ADS GENEL BAKIŞ",
            "TIKTOK PIXEL EKLEME",
            "TIKTOK İÇERİK",
            "TIKTOK REKLAM AYARLARI",
            "TIKTOK TEST REKLAM STRATEJİSİ",
            "TIKTOK ADS SONUÇ ANALİZİ"
          ]
        },
        {
          title: "TIKTOK ORGANIC",
          lessons: [
            "ÖZET TIKTOK ORGANIC",
            "TIKTOK ORGANİK ÜRÜN VİRAL ALGORİTMASI",
            "SHADOW BAN",
            "ORGANİK TEST AŞAMASI",
            "WİNNER ÜRÜNDEN SONRA VE KAPANIS"
          ]
        },
        {
          title: "CANLI YAYINLAR",
          lessons: [
            "CANLI YAYINLAR 1",
            "CANLI YAYINLAR 2",
            "CANLI YAYINLAR 3",
            "CANLI YAYINLAR 4"
          ]
        }
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary to-primary-light">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            EĞİTİM <span className="text-accent-light">MÜFREDATI</span>
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            6 farklı kampüste 200+ ders ile kapsamlı eğitim içeriği
          </p>
        </div>

        {/* Campuses Accordion */}
        <div className="space-y-4">
          {campuses.map((campus, campusIndex) => (
            <div key={campusIndex} className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-primary-light/50 to-primary-dark/50 backdrop-blur-sm">
              {/* Campus Header */}
              <button
                onClick={() => setOpenCampus(openCampus === campusIndex ? null : campusIndex)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{campus.icon}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">{campus.name}</h3>
                    <p className="text-white/60 text-sm">{campus.modules.length} modül</p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-accent transition-transform duration-300 ${
                    openCampus === campusIndex ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Campus Content */}
              {openCampus === campusIndex && (
                <div className="px-6 pb-6 space-y-3 animate-fadeIn">
                  {campus.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="rounded-xl bg-primary/30 border border-white/5 overflow-hidden">
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(campusIndex, moduleIndex)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-accent font-bold text-sm">{moduleIndex + 1}</span>
                          </div>
                          <span className="text-white font-semibold text-left text-sm">{module.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 text-xs">{module.lessons.length} ders</span>
                          <svg
                            className={`w-5 h-5 text-accent transition-transform duration-300 ${
                              openModule[`${campusIndex}-${moduleIndex}`] ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Lessons List */}
                      {openModule[`${campusIndex}-${moduleIndex}`] && (
                        <div className="px-4 pb-4 space-y-2 animate-fadeIn">
                          {module.lessons.map((lesson, lessonIndex) => {
                            const lessonTitle = typeof lesson === 'string' ? lesson : lesson.title;
                            return (
                              <div
                                key={lessonIndex}
                                className="flex items-start gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
                              >
                                <svg className="w-5 h-5 text-accent-light flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                </svg>
                                <span className="text-white/70 text-sm">{lessonTitle}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              document.getElementById('pricing-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="btn-primary text-lg px-12 py-4 shadow-glow-strong hover:shadow-glow-hover"
          >
            Tüm Eğitimlere Erişim Sağla →
          </button>
        </div>
      </div>
    </section>
  );
}
