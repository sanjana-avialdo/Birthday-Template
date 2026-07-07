"use client";

import { motion } from "framer-motion";

export function FinalMessage({ message }: { message: string }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(160deg,#7c5cff_0%,#c15fd1_50%,#ff6f91_100%)] px-6 py-20 text-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6 }}
        className="flex max-w-xl flex-col items-center gap-5"
      >
        <span className="text-4xl">🎁</span>
        <h2 className="font-baloo text-3xl font-semibold sm:text-4xl">One last thing…</h2>
        <p className="text-lg leading-relaxed text-white/90">{message}</p>
      </motion.div>
    </section>
  );
}
