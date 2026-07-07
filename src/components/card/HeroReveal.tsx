"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const DECORATIONS = ["🌸", "🌷", "💐", "✨", "🌻", "🌼", "🎉", "💫"];

interface HeroRevealProps {
  recipientName: string;
  message: string | null;
}

export function HeroReveal({ recipientName, message }: HeroRevealProps) {
  useEffect(() => {
    confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 } });
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#ff8bb0_0%,#ff6f91_25%,#c15fd1_55%,#7c5cff_100%)] px-6 py-20 text-center text-white">
      {DECORATIONS.map((emoji, i) => (
        <span
          key={i}
          className="animate-float absolute select-none text-3xl opacity-80 sm:text-4xl"
          style={{
            top: `${10 + ((i * 37) % 75)}%`,
            left: `${5 + ((i * 53) % 88)}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-4"
      >
        <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur">
          A birthday made just for you
        </span>

        <h1 className="font-baloo text-3xl font-semibold sm:text-4xl">Happy Birthday,</h1>
        <h2 className="font-baloo bg-linear-to-r from-yellow-200 via-pink-100 to-white bg-clip-text text-6xl font-extrabold text-transparent drop-shadow-sm sm:text-7xl">
          {recipientName}
        </h2>

        {message && (
          <p className="mt-4 max-w-md text-balance text-white/90">{message}</p>
        )}

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="mt-10 text-sm text-white/70"
        >
          Scroll down for our memories ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
