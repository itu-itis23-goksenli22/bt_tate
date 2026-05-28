const VIDEOS = [
  {
    id: "nWvImM9U2NQ",
    title: "Başarı Hikayesi — Yapay Zeka",
  },
];

export default function VerticalVideos() {
  return (
    <section className="pt-8 pb-2 md:pt-12 md:pb-2 bg-primary px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <h2 className="text-center text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
          <span className="text-gold">Başarı Hikayeleri</span>
        </h2>

        {/* Tek video kaldı — merkezde, makul genişlikte gösteriliyor.
            Eski 3 video grid layout'u yerine flex justify-center kullanıyoruz. */}
        <div className="flex justify-center">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="w-full max-w-[320px] md:max-w-[360px]"
            >
              <div
                className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black"
                style={{ paddingBottom: "177.78%" }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
