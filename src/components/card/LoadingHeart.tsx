"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export function LoadingHeart({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(onDone, 1600);
    return () => clearTimeout(timeout);
  }, [onDone]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#1a0407] text-white">
      <motion.span
        className="text-6xl"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        ❤️
      </motion.span>
      <p className="font-baloo text-sm tracking-wide text-rose-100/80">
        Preparing something special…
      </p>
    </div>
  );
}
