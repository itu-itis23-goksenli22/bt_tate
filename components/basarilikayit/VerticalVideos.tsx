interface VideoItem {
  id: string;
  title: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "nWvImM9U2NQ",
    title: "Başarı Hikayesi — Yapay Zeka",
  },
];

interface VerticalVideosProps {
  videos?: VideoItem[];
}

export default function VerticalVideos({
  videos = DEFAULT_VIDEOS,
}: VerticalVideosProps = {}) {
  const isSingle = videos.length === 1;

  return (
    <section className="pt-8 pb-2 md:pt-12 md:pb-2 bg-primary px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <h2 className="text-center text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
          <span className="text-gold">Başarı Hikayeleri</span>
        </h2>

        {/* Tek video → merkez hizalı flex; çoklu video → mobile carousel + desktop grid */}
        {isSingle ? (
          <div className="flex justify-center">
            {videos.map((video) => (
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
        ) : (
          <div
            className="
              flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
              md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0
              lg:grid-cols-4
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            "
          >
            {videos.map((video) => (
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
        )}
      </div>
    </section>
  );
}
