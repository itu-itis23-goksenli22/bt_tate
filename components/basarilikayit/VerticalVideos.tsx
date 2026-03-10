const VIDEOS = [
  {
    id: "U17038k3dZs",
    title: "Başarı Hikayesi 1",
  },
  {
    id: "nWvImM9U2NQ",
    title: "Başarı Hikayesi 2",
  },
  {
    id: "24sobDc1m-8",
    title: "Başarı Hikayesi 3",
  },
];

export default function VerticalVideos() {
  return (
    <section className="py-8 md:py-12 bg-primary px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <h2 className="text-center text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
          <span className="text-gold">Başarı Hikayeleri</span>
        </h2>

        {/* Desktop: grid, Mobile: horizontal scroll */}
        <div
          className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
            md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0
            lg:grid-cols-3
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
        >
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="
                snap-center shrink-0 w-[70vw] sm:w-[55vw]
                md:w-auto md:shrink
              "
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
