"use client";

import { motion } from "framer-motion";

interface VideoItem {
  id: string;
  storagePath: string;
  poster?: string;
}

export function VideoGallery({ videos }: { videos: VideoItem[] }) {
  if (videos.length === 0) return null;

  return (
    <section className="bg-[#150a1c] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-3xl">🎬</span>
          <h2 className="font-baloo text-3xl font-semibold">Video Gallery</h2>
          <p className="max-w-md text-white/60">A few clips worth replaying.</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {videos.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative aspect-video overflow-hidden rounded-2xl bg-white/5"
            >
              {item.storagePath ? (
                <video src={item.storagePath} poster={item.poster} className="h-full w-full object-cover" controls />
              ) : (
                <>
                  {item.poster && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.poster} alt="" className="h-full w-full object-cover opacity-70" />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center text-4xl">▶️</span>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
