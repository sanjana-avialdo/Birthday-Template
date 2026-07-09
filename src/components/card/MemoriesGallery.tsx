"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MediaLightbox } from "./MediaLightbox";

interface MediaItem {
  id: string;
  storagePath: string;
  mediaType: "image" | "video";
  poster?: string;
  caption?: string | null;
}

export function MemoriesGallery({ media }: { media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0f0a14] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-3xl">📸</span>
          <h2 className="font-baloo text-3xl font-semibold">Our Memories</h2>
          <p className="max-w-md text-white/60">Some of our favorite moments together.</p>
        </div>

        {media.length === 0 ? (
          <p className="text-sm text-white/40">Photos and videos will appear here.</p>
        ) : (
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
            {media.map((item, i) => {
              const isVideo = item.mediaType === "video";
              const playable = !isVideo || Boolean(item.storagePath);

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  disabled={!playable}
                  onClick={() => playable && setActiveIndex(i)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5 disabled:cursor-default"
                >
                  {isVideo ? (
                    item.storagePath ? (
                      <video
                        src={item.storagePath}
                        poster={item.poster}
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      item.poster && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.poster} alt="" className="h-full w-full object-cover opacity-70" />
                      )
                    )
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.storagePath}
                      alt={item.caption ?? ""}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}

                  {isVideo && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-3xl transition-colors group-hover:bg-black/30">
                      ▶️
                    </span>
                  )}

                  {!isVideo && item.caption && (
                    <span className="absolute inset-x-0 bottom-0 truncate bg-linear-to-t from-black/70 to-transparent px-2 pt-4 pb-1.5 text-left text-xs text-white/90">
                      {item.caption}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <MediaLightbox items={media} index={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
      )}
    </section>
  );
}
