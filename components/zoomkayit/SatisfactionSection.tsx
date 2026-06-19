// Müşteri memnuniyeti / 5 yıldız sosyal kanıt bölümü.
// Sayfanın en altında, footer'dan hemen önce — son güven sinyali.

const STARS = [0, 1, 2, 3, 4];

// Kısa katılımcı yorumları (sosyal kanıt). İsimler baş harf avatarıyla.
const TESTIMONIALS = [
  {
    name: "Mehmet A.",
    initials: "MA",
    text: "Kod bilmiyordum, 3 haftada ilk sistemimi sattım. Anlatım çok net.",
  },
  {
    name: "Zeynep K.",
    initials: "ZK",
    text: "Seminer ücretsiz ama içerik çoğu ücretli kursdan daha değerli.",
  },
  {
    name: "Burak T.",
    initials: "BT",
    text: "Yapay zekayı işime entegre ettim, verimliliğim ciddi arttı.",
  },
];

function StarRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {STARS.map((i) => (
        <svg
          key={i}
          className="w-5 h-5 text-gold"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.956c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.956a1 1 0 00-.363-1.118L2.07 9.373c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.956z" />
        </svg>
      ))}
    </div>
  );
}

export default function SatisfactionSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Üst başlık + ortalama puan */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <StarRow className="scale-125" />
          <p className="text-3xl md:text-4xl font-bold text-white">
            <span className="zk-text-gold-gradient">4.9/5</span> Katılımcı
            Memnuniyeti
          </p>
          <p className="text-white/50 text-sm md:text-base">
            Binlerce katılımcı semineri tamamladı ve 5 üzerinden 4.9 puan verdi.
          </p>
        </div>

        {/* Yorum kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left flex flex-col gap-3"
            >
              <StarRow />
              <p className="text-white/80 text-sm leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <div className="w-9 h-9 rounded-full bg-gold/20 text-gold font-bold text-sm flex items-center justify-center">
                  {t.initials}
                </div>
                <span className="text-white/60 text-sm font-medium">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
