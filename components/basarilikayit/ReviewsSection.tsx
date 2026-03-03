"use client";

interface Review {
  name: string;
  initial: string;
  reviewCount: string;
  country: string;
  date: string;
  title: string;
  text: string;
  hasAvatar: boolean;
}

const reviews: Review[] = [
  {
    name: "Emre Yılmaz",
    initial: "E",
    reviewCount: "1 yorum",
    country: "TR",
    date: "12 Şub 2025",
    title: "N8N ile 15+ işletmeye otomasyon sattım",
    text: "AI Scale App'e katılmadan önce N8N'in ne olduğunu bile bilmiyordum. 4 ay içinde 15'ten fazla işletmeye otomasyon çözümü sattım. Özellikle B2B satış stratejileri modülü benim için oyun değiştirici oldu.",
    hasAvatar: true,
  },
  {
    name: "Selin Kaya",
    initial: "S",
    reviewCount: "2 yorum",
    country: "TR",
    date: "28 Şub 2025",
    title: "Claude Code öğrenip 3 ayda AI ajansı kurdum",
    text: "Teknik arka planım yoktu ama Claude Code masterclass sayesinde müşterilerime özel AI çözümleri sunabiliyorum. 3 ayda kendi AI ajansımı kurdum ve ilk aydan itibaren gelir elde etmeye başladım.",
    hasAvatar: false,
  },
  {
    name: "Burak Demir",
    initial: "B",
    reviewCount: "1 yorum",
    country: "DE",
    date: "5 Mar 2025",
    title: "B2B SaaS stratejileri sayesinde aylık 50K+ TL",
    text: "Almanya'dan katıldım. Setter eğitimi ve B2B satış modülleri sayesinde Avrupa'daki KOBİ'lere AI otomasyon paketleri satıyorum. Aylık gelirim 50.000 TL'yi geçti. Topluluk desteği inanılmaz.",
    hasAvatar: true,
  },
  {
    name: "Ayşe Çelik",
    initial: "A",
    reviewCount: "1 yorum",
    country: "TR",
    date: "15 Mar 2025",
    title: "Müşteri edinme maliyetimi %70 düşürdüm",
    text: "Ads stratejisi ve setter eğitimi ile müşteri edinme maliyetimi %70 düşürdüm. N8N workflow şablonları sayesinde her yeni müşteriye kurulum sürem yarı yarıya azaldı. Kesinlikle en iyi yatırım.",
    hasAvatar: false,
  },
];

function StarRating({ count = 5, size = "w-4 h-4" }: { count?: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className={`${size} text-gold`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 italic mb-4">
            ÜYELERİN YORUMLARI
          </h2>
          <div className="flex items-center justify-center gap-3">
            <StarRating />
            <span className="text-gray-900 font-bold text-lg">5.0</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
            >
              {/* Reviewer info */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  review.hasAvatar ? 'bg-gradient-to-br from-gray-400 to-gray-600' : 'bg-blue-500'
                }`}>
                  {review.initial}
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">{review.name}</p>
                  <p className="text-gray-500 text-xs">{review.reviewCount} - {review.country}</p>
                </div>
              </div>

              {/* Stars + Date */}
              <div className="flex items-center justify-between mb-3">
                <StarRating />
                <span className="text-gray-400 text-xs">{review.date}</span>
              </div>

              {/* Review content */}
              <h4 className="text-gray-900 font-bold text-sm mb-2">{review.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
