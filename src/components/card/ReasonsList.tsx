"use client";

import { motion } from "framer-motion";

export function ReasonsList({ reasons }: { reasons: string[] }) {
  if (reasons.length === 0) return null;

  return (
    <section className="bg-[#2a0e1f] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-3xl">💕</span>
          <h2 className="font-baloo text-3xl font-semibold">Reasons I Love You</h2>
        </div>

        <ol className="flex w-full flex-col gap-4">
          {reasons.map((reason, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-4 rounded-2xl bg-white/5 px-5 py-4"
            >
              <span className="font-baloo text-rose-300">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-white/85">{reason}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
