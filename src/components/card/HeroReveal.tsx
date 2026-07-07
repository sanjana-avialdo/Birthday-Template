"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Balloon } from "./Balloon";

const DECORATIONS = ["✨", "💫", "🌟", "✨"];

const BALLOONS = [
  { left: "6%", size: 130, colorFrom: "#ff9ecb", colorTo: "#ff4f9a", duration: 9, delay: 0 },
  { left: "18%", size: 95, colorFrom: "#ffe9a8", colorTo: "#ffb238", duration: 11, delay: 1.5 },
  { left: "76%", size: 115, colorFrom: "#d9b3ff", colorTo: "#9b3fe0", duration: 8, delay: 0.7 },
  { left: "90%", size: 90, colorFrom: "#b8d4ff", colorTo: "#5a7dff", duration: 12, delay: 2.4 },
  { left: "34%", size: 80, colorFrom: "#ffd6e8", colorTo: "#ff7ab6", duration: 10, delay: 3.2 },
  { left: "62%", size: 85, colorFrom: "#c8fff0", colorTo: "#3ee0b0", duration: 9.5, delay: 1.1 },
];

interface HeroRevealProps {
  recipientName: string;
  message: string | null;
}

export function HeroReveal({ recipientName, message }: HeroRevealProps) {
  useEffect(() => {
    confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 } });
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(165deg,#2d0140_0%,#4a0f7b_28%,#7b2ff7_58%,#c86dd7_100%)] px-6 py-20 text-center text-white">
      {BALLOONS.map((balloon, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute bottom-0"
          style={{ left: balloon.left }}
          initial={{ y: "10vh", opacity: 0 }}
          animate={{ y: "-125vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: balloon.duration, delay: balloon.delay, repeat: Infinity, ease: "linear" }}
        >
          <Balloon colorFrom={balloon.colorFrom} colorTo={balloon.colorTo} size={balloon.size} />
        </motion.div>
      ))}

      {DECORATIONS.map((emoji, i) => (
        <span
          key={i}
          className="animate-float absolute select-none text-2xl opacity-70 sm:text-3xl"
          style={{
            top: `${12 + ((i * 41) % 70)}%`,
            left: `${8 + ((i * 61) % 84)}%`,
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
        className="relative flex flex-col items-center gap-3"
      >
        <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur">
          A birthday made just for you
        </span>

        <h1 className="font-baloo text-3xl font-semibold sm:text-4xl">Happy Birthday,</h1>
        <h2 className="font-baloo bg-linear-to-r from-yellow-200 via-pink-100 to-white bg-clip-text text-6xl font-extrabold text-transparent drop-shadow-sm sm:text-7xl">
          {recipientName}
        </h2>

        <motion.span
          initial={{ scale: 0, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 10, delay: 0.2 }}
          className="mt-2 text-9xl drop-shadow-lg sm:text-[13rem] md:text-[15rem]"
        >
          🎂
        </motion.span>

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
