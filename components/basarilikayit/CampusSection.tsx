"use client";

import { useState } from "react";

interface Module {
  title: string;
  lessons: string[];
}

interface Campus {
  name: string;
  icon: string;
  color: string;
  modules: Module[];
}

const campuses: Campus[] = [
  {
    name: "N8N ile Yapay Zeka",
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
          "Otomasyon Süreçlerinde Satışın Önemi ve Stratejileri",
        ],
      },
      {
        title: "2. STRATEJİ VE PLANLAMA",
        lessons: [
          "Doğru Niş Seçimi ve Yüksek Gelir Elde Etme Stratejileri",
          "Ajans Modeli Oluşturma Stratejileri",
          "Girişimciler Neden Başarısız Olur? En Sık Yapılan Hatalar",
          "30 Günlük Yol Haritası: Öğren, Uygula, Sat",
        ],
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
          "N8N Mail Filter, Summarize Otomasyonu",
        ],
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
          "Claude'un MCP Özelliği ile Chatleşerek Workflow Oluşturma",
        ],
      },
      {
        title: "4. ÜRÜNLEŞTİRME VE PAKETLEME",
        lessons: [
          "Ürünleştirme Adımları? Fiyatlandırma Mantığı: Saat değil, değer sat",
          "Müşteri Onboarding Süreci (Brief, Hedef, Beklenti)",
          "Ürünleştirme",
        ],
      },
      {
        title: "5. SATIŞ STRATEJİLERİ",
        lessons: [
          "Satış Kısmı ve N8N",
          "Exa.ai ile N8N kullanarak Linkedin Üzerinden Müşterilerinizi Bulun ve Raporlayın!",
          "Instantly",
          "Apollo",
        ],
      },
      {
        title: "6. BÜYÜTME VE GLOBALLEŞTİRME",
        lessons: [
          "Altyapıyı Büyütmek: Ekip kurmak, görev devri, freelance kullanımı",
          "İngiltere Şirket Kurulumu",
          "Şirket Wise&Stripe Kurulumu",
          "Ekip Yönetimi İçin Etkili Araçlar",
        ],
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
          "Kazananları Bulma ve Ölçeklendirme",
        ],
      },
      {
        title: "8. SETTER",
        lessons: [
          "Setter Önemi",
          "Reklam Dm Scripti",
          "10M$ Setting Protokolü",
        ],
      },
      {
        title: "9. KAYNAK KİTİ",
        lessons: [
          "Hazır Otomasyon Sistemleri (N8N)",
          "Otomatik mail cevaplayıcı",
          "Hazır GPT Prompt Paketleri (E-ticaret, Danışmanlık, Müşteri Hizmetleri)",
          "Otomasyon tüm dokümanlar",
        ],
      },
      {
        title: "YAYINLAR",
        lessons: [
          "YAYIN 1-5: N8N TEKNİK YAYINLARI",
          "YAYIN 6: SATIŞ & PAZARLAMA",
          "YAYIN 7-11: İLERİ SEVİYE TEKNİK VE SATIŞ YAYINLARI",
        ],
      },
    ],
  },
  {
    name: "E-Commerce & Amazon FBA",
    icon: "📦",
    color: "from-purple-500/20 to-pink-500/20",
    modules: [
      {
        title: "1. GİRİŞ",
        lessons: [
          "E-Commerce Dünyası",
          "Hesap Açma ve Belge Hazırlığı",
          "FBA vs FBM Karşılaştırması",
          "Private Label ve Wholesale Modelleri",
          "Tedarikçi Websitelerine Kayıt",
          "Analiz Programları İnceleme",
        ],
      },
      {
        title: "2. ÜRÜN BUL / KEYWORD",
        lessons: [
          "Ürün Bulma Türkiye Stratejisi",
          "Amazon Müşteri Stratejisi ve Kritik Veri Analizi",
          "Black Box ile Ürün ve Keyword Arama",
          "Pinterest ile Ürün ve Keyword Bulma",
          "Keyword Advance Stratejileri",
          "Global Pazar Analizi ve Keşfedilmemiş Pazarlar",
          "Retail Arbitrage Stratejileri",
        ],
      },
      {
        title: "3. ÜRÜNÜ YAPILANDIR / MARKA",
        lessons: [
          "7 Adımda Markalaşma ve Brand Management",
          "Nöromarketing Dizayn ve Analiz",
          "Tedarikçi İletişimi ve Pazarlık",
          "Listing Oluşturma ve Keyword Strateji",
          "FBA Shipping Plan",
        ],
      },
      {
        title: "4. SATIŞA BAŞLA",
        lessons: [
          "Giveaway, Keyword Index ve Yorum Stratejileri",
          "PPC Lansman ve İleri Seviye PPC",
          "Kupon Kodu Stratejileri",
        ],
      },
      {
        title: "5. POZİSYONUNU KORU VE BÜYÜ",
        lessons: [
          "Tüketici Davranışı ve Fiyatlandırma",
          "Günlük İş Takibi ve İade Ayarları",
          "Marka Koruma ve Kitle Oluşturma",
        ],
      },
    ],
  },
  {
    name: "Kripto Para Yatırımı",
    icon: "₿",
    color: "from-yellow-500/20 to-orange-500/20",
    modules: [
      {
        title: "KRİPTO PARA TEMELLERİ",
        lessons: [
          "Kripto Para Borsası ve Cüzdan Nedir?",
          "Emir Tipleri ve Hesap Güvenliği",
        ],
      },
      {
        title: "TEMEL VE TEKNİK ANALİZ",
        lessons: [
          "Coinmarketcap, Coinmarketcal ve Temel Analiz",
          "TradingView Kullanımı (Grafikler, Alarm, İndikatör)",
          "Mum Grafikleri ve Formasyonlar",
          "Destek ve Direnç Seviyeleri",
        ],
      },
      {
        title: "TRENDLER VE İNDİKATÖRLER",
        lessons: [
          "Trend Türleri (Yükselen, Düşen, Yatay)",
          "MACD, RSI, Bollinger Bands, StochRSI",
          "Fibonacci Seviyeleri",
        ],
      },
      {
        title: "STRATEJİ VE UYGULAMA",
        lessons: [
          "Trade Setup ve Stop Loss Belirleme",
          "Risk ve Portföy Yönetimi",
          "Market Tarama ve Analiz Örnekleri",
        ],
      },
    ],
  },
  {
    name: "ETSY",
    icon: "🛍️",
    color: "from-green-500/20 to-emerald-500/20",
    modules: [
      {
        title: "1. GİRİŞ VE HESAP KURULUMU",
        lessons: [
          "Neden ETSY? Platform İnceleme ve Fee Yapısı",
          "Kullanıcı Hesabı ve Satış Dükkanı Oluşturma",
        ],
      },
      {
        title: "2. ÜRÜN BULMA VE LİSTELEME",
        lessons: [
          "Keyword, Sezonsal ve Online Ürün Bulma",
          "Fiziksel Ürün Bulma ve Tedarikçi İletişimi",
          "Fotoğraf, Video, Tag ve Fiyat Planı",
          "Kargo Ayarları ve Listeleme",
        ],
      },
      {
        title: "3. SATIŞ, PAZARLAMA VE BÜYÜME",
        lessons: [
          "Sipariş Yönetimi ve Müşteri Takibi",
          "Reklam, Sosyal Medya ve Kupon Stratejileri",
          "Dükkanı Korumak ve Büyütmek",
        ],
      },
    ],
  },
  {
    name: "Shopify Dropshipping",
    icon: "🏪",
    color: "from-indigo-500/20 to-purple-500/20",
    modules: [
      {
        title: "GİRİŞ VE MAĞAZA KURULUMU",
        lessons: [
          "Dropshipping vs FBA Karşılaştırması",
          "Shopify Mağaza Kurulumu (Logo, Design, Ödeme)",
          "Ürün Araştırma Yöntemleri",
          "Şirket Wise & Stripe Kurulumu",
        ],
      },
      {
        title: "TIKTOK ADS STRATEJİSİ",
        lessons: [
          "TikTok Pixel ve Reklam Ayarları",
          "TikTok İçerik ve Test Reklam Stratejisi",
          "Sonuç Analizi ve Ölçeklendirme",
        ],
      },
      {
        title: "TIKTOK ORGANİK VE CANLI YAYINLAR",
        lessons: [
          "Organik Viral Algoritması ve Test Aşaması",
          "Shadow Ban ve Winner Ürün Stratejisi",
          "Canlı Yayın Teknikleri",
        ],
      },
    ],
  },
];

export default function CampusSection() {
  const [openCampus, setOpenCampus] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<Record<string, boolean>>({});

  const toggleModule = (campusIndex: number, moduleIndex: number) => {
    const key = `${campusIndex}-${moduleIndex}`;
    setOpenModule((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalLessons = campuses.reduce(
    (sum, c) => sum + c.modules.reduce((s, m) => s + m.lessons.length, 0),
    0
  );

  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white italic uppercase tracking-wide mb-4">
            EĞİTİM MÜFREDATI
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            {campuses.length} kampüste {totalLessons}+ ders ile kapsamlı eğitim içeriği
          </p>
        </div>

        {/* Campuses Accordion */}
        <div className="space-y-4">
          {campuses.map((campus, campusIndex) => (
            <div
              key={campusIndex}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm"
            >
              {/* Campus Header */}
              <button
                onClick={() =>
                  setOpenCampus(openCampus === campusIndex ? null : campusIndex)
                }
                className="w-full px-5 py-4 md:px-6 md:py-5 flex items-center justify-between hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-2xl md:text-3xl">{campus.icon}</span>
                  <div className="text-left">
                    <h3 className="text-base md:text-xl font-bold text-white">
                      {campus.name}
                    </h3>
                    <p className="text-white/50 text-xs md:text-sm">
                      {campus.modules.length} modül
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 text-gold transition-transform duration-300 ${
                    openCampus === campusIndex ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Campus Content */}
              {openCampus === campusIndex && (
                <div className="px-4 pb-4 md:px-6 md:pb-6 space-y-3">
                  {campus.modules.map((module, moduleIndex) => (
                    <div
                      key={moduleIndex}
                      className="rounded-xl bg-primary/40 border border-white/5 overflow-hidden"
                    >
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(campusIndex, moduleIndex)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-gold font-bold text-xs md:text-sm">
                              {moduleIndex + 1}
                            </span>
                          </div>
                          <span className="text-white font-semibold text-left text-xs md:text-sm">
                            {module.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 text-[10px] md:text-xs">
                            {module.lessons.length} ders
                          </span>
                          <svg
                            className={`w-4 h-4 md:w-5 md:h-5 text-gold transition-transform duration-300 ${
                              openModule[`${campusIndex}-${moduleIndex}`]
                                ? "rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>

                      {/* Lessons List */}
                      {openModule[`${campusIndex}-${moduleIndex}`] && (
                        <div className="px-3 pb-3 md:px-4 md:pb-4 space-y-1.5">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-start gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                            >
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                              </svg>
                              <span className="text-white/60 text-xs md:text-sm">
                                {lesson}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
