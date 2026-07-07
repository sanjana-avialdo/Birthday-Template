"use client";

import { motion } from "framer-motion";

export function BirthdayWish({ message }: { message: string }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#1a0b2e] px-6 py-20 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6 }}
        className="flex max-w-xl flex-col items-center gap-6"
      >
        <span className="text-4xl">💌</span>
        <h2 className="font-baloo text-2xl font-semibold sm:text-3xl">A little birthday wish</h2>
        <p className="text-lg leading-relaxed text-white/80">&ldquo;{message}&rdquo;</p>
      </motion.div>
    </section>
  );
}
