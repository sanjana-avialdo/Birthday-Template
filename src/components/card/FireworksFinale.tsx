"use client";

import { useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

function launchFireworks() {
  const duration = 3000;
  const end = performance.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors: ["#ff6f91", "#ffd166", "#7c5cff"],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors: ["#ff6f91", "#ffd166", "#7c5cff"],
    });

    if (performance.now() < end) requestAnimationFrame(frame);
  })();
}

export function FireworksFinale({ recipientName }: { recipientName: string }) {
  const hasFired = useRef(false);

  const fire = useCallback(() => {
    launchFireworks();
  }, []);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    fire();
  }, [fire]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0b0203] px-6 py-20 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <span className="text-5xl">🎆</span>
        <h2 className="font-baloo text-3xl font-semibold sm:text-4xl">
          Happy Birthday, {recipientName}!
        </h2>
        <p className="max-w-sm text-white/60">Here&apos;s to celebrating you, today and always.</p>

        <button
          type="button"
          onClick={fire}
          className="mt-4 rounded-full bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
        >
          🎇 Replay fireworks
        </button>
      </motion.div>
    </section>
  );
}
