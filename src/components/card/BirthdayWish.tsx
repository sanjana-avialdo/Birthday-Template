"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function BirthdayWish({ message }: { message: string }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#1a0b2e] px-6 py-16 text-center text-white">
      <h2 className="font-baloo mb-6 text-2xl font-semibold sm:text-3xl">A little birthday wish</h2>

      <div className="relative flex w-full flex-1 items-center justify-center">
        <motion.div
          animate={open ? { y: 30, opacity: 0.15, scale: 0.8 } : { y: [0, -14, 0] }}
          transition={
            open
              ? { duration: 0.5, ease: "easeOut" }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
          className="pointer-events-none relative z-0 leading-none select-none text-[14rem] drop-shadow-2xl sm:text-[18rem] md:text-[22rem]"
        >
          💌
        </motion.div>

        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute inset-0 flex flex-col items-center justify-center"
            aria-label="Open the letter"
          >
            <span className="absolute top-[56%] rounded-full bg-black/40 px-4 py-1.5 text-sm font-medium tracking-wide text-white backdrop-blur">
              Tap to open
            </span>
          </button>
        )}

        <AnimatePresence>
          {open && (
            <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
              <motion.div
                initial={{ y: 80, opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ y: -40, opacity: 1, scale: 1, rotate: -1.5 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-[85%] max-w-xs bg-[#fdf6ec] px-6 py-9 text-[#3a2a1a] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] sm:max-w-sm sm:px-8 sm:py-11"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(rgba(58,42,26,0.06) 0 1px, transparent 1px 28px)",
                }}
              >
                <span className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-2 bg-amber-200/70 shadow-sm" />
                <p className="font-baloo text-base leading-relaxed sm:text-lg">
                  &ldquo;{message}&rdquo;
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
