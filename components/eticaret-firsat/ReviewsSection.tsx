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
    name: "Mehmet Arslan",
    initial: "M",
    reviewCount: "1 yorum",
    country: "TR",
    date: "18 Şub 2025",
    title: "Amazon FBA ile ilk 3 ayda 8.000$ ciro yaptım",
    text: "E-Commerce eğitimine katılmadan önce nereden başlayacağımı bilmiyordum. Ürün bulma stratejileri ve keyword araştırma modülleri sayesinde doğru ürünü buldum. İlk 3 ayda 8.000$ ciro elde ettim.",
    hasAvatar: true,
  },
  {
    name: "Zeynep Yıldız",
    initial: "Z",
    reviewCount: "2 yorum",
    country: "TR",
    date: "5 Mar 2025",
    title: "Shopify mağazamdan aylık 15.000 TL kazanıyorum",
    text: "Dropshipping eğitimi sayesinde Shopify mağazamı kurdum. TikTok Ads modülü ile organik ve reklamlı satışları birleştirdim. 4 aydır aylık 15.000 TL üzerinde kazanıyorum.",
    hasAvatar: false,
  },
  {
    name: "Can Özdemir",
    initial: "C",
    reviewCount: "1 yorum",
    country: "DE",
    date: "12 Mar 2025",
    title: "ETSY dükkanım 2 ayda 50+ satış yaptı",
    text: "Almanya'dan katıldım. ETSY eğitimindeki ürün listeleme ve keyword stratejileri sayesinde dükkanım açıldıktan 2 ay sonra 50'den fazla satış yaptı. Topluluk desteği çok değerli.",
    hasAvatar: true,
  },
  {
    name: "Elif Kara",
    initial: "E",
    reviewCount: "1 yorum",
    country: "TR",
    date: "20 Mar 2025",
    title: "E-ticaret ile evden çalışarak gelir elde ediyorum",
    text: "Anne olarak evden çalışmak istiyordum. Bu eğitim sayesinde hem Amazon FBA hem de ETSY'de mağazalarım var. AI araçlarını kullanarak ürün açıklamalarımı hızlıca yazıyorum. Hayatım değişti.",
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

export default function EticaretReviewsSection() {
  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 italic mb-4">
            ÜYELERİN YORUMLARI
          </h2>
          <div className="flex items-center justify-center gap-3">
            <StarRating />
            <span className="text-gray-900 font-bold text-lg">5.0</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
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
              <div className="flex items-center justify-between mb-3">
                <StarRating />
                <span className="text-gray-400 text-xs">{review.date}</span>
              </div>
              <h4 className="text-gray-900 font-bold text-sm mb-2">{review.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
