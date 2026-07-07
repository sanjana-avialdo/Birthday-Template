"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const CANDLE_COUNT = 5;

export function CakeCutting() {
  const [blownOut, setBlownOut] = useState(false);

  function handleBlow() {
    if (blownOut) return;
    setBlownOut(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#1a0b2e] px-6 py-20 text-center text-white">
      <h2 className="font-baloo text-3xl font-semibold">Make a Wish</h2>
      <p className="max-w-sm text-white/60">
        {blownOut ? "Wish made! 🎉" : "Tap the cake to blow out the candles."}
      </p>

      <button
        type="button"
        onClick={handleBlow}
        className="relative flex flex-col items-center focus:outline-none"
        aria-label="Blow out the candles"
      >
        <div className="mb-2 flex gap-3">
          {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <AnimatePresence>
                {!blownOut && (
                  <motion.span
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="text-lg"
                  >
                    🔥
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="h-6 w-1.5 rounded-sm bg-linear-to-b from-pink-300 to-pink-500" />
            </div>
          ))}
        </div>
        <span className="text-7xl">🎂</span>
      </button>
    </section>
  );
}
