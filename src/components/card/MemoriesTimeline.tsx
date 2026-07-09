"use client";

import { motion } from "framer-motion";
import type { TimelineEntry } from "@/lib/types";

export function MemoriesTimeline({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <section className="bg-[#12081f] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-3xl">🕰️</span>
          <h2 className="font-baloo text-3xl font-semibold">Our Story</h2>
        </div>

        <ol className="relative flex w-full flex-col gap-10 border-l border-white/15 pl-8">
          {entries.map((entry, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute top-1 -left-[2.35rem] h-3 w-3 rounded-full bg-pink-400" />
              <p className="text-xs font-semibold tracking-widest text-pink-300 uppercase">
                {entry.date}
              </p>
              <h3 className="font-baloo mt-1 text-lg font-semibold">{entry.title}</h3>
              <p className="mt-1 text-sm text-white/60">{entry.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
