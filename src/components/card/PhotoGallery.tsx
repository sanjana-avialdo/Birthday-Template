"use client";

import { motion } from "framer-motion";

interface PhotoItem {
  id: string;
  storagePath: string;
}

export function PhotoGallery({ photos }: { photos: PhotoItem[] }) {
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
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="aspect-square overflow-hidden rounded-2xl bg-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.storagePath} alt="" className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
