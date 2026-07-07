"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoveLetter({ letter }: { letter: string }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#12081f] px-6 py-20 text-center text-white">
      <h2 className="font-baloo text-3xl font-semibold">A Letter For You</h2>

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="envelope"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-7xl">💌</span>
            <span className="text-sm text-white/60">Tap to open</span>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg rounded-2xl bg-[#fdf6ec] px-8 py-10 text-left text-[#3a2a1a] shadow-xl"
          >
            <p className="font-baloo whitespace-pre-line leading-relaxed">{letter}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
