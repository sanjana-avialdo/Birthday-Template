"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PhotoLightbox } from "./PhotoLightbox";

interface PhotoItem {
  id: string;
  storagePath: string;
  caption?: string | null;
}

export function PhotoGallery({ photos }: { photos: PhotoItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0f0a14] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-3xl">📸</span>
          <h2 className="font-baloo text-3xl font-semibold">Photo Gallery</h2>
          <p className="max-w-md text-white/60">Some of our favorite moments together.</p>
        </div>

        {photos.length === 0 ? (
          <p className="text-sm text-white/40">Photos will appear here.</p>
        ) : (
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
            {photos.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.storagePath}
                  alt={item.caption ?? ""}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                {item.caption && (
                  <span className="absolute inset-x-0 bottom-0 truncate bg-linear-to-t from-black/70 to-transparent px-2 pt-4 pb-1.5 text-left text-xs text-white/90">
                    {item.caption}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
