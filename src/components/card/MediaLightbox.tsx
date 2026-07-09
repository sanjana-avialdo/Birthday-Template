"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MediaLightboxItem {
  id: string;
  storagePath: string;
  mediaType: "image" | "video";
  caption?: string | null;
}

interface MediaLightboxProps {
  items: MediaLightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function MediaLightbox({ items, index, onClose, onNavigate }: MediaLightboxProps) {
  const item = items[index];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 px-4 py-10"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white hover:bg-white/20"
          aria-label="Close"
        >
          ✕
        </button>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((index - 1 + items.length) % items.length);
              }}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:left-6"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((index + 1) % items.length);
              }}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:right-6"
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}

        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex max-h-full max-w-full flex-col items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {item.mediaType === "video" ? (
            <video
              src={item.storagePath}
              controls
              autoPlay
              className="max-h-[75vh] max-w-full rounded-lg"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.storagePath}
              alt={item.caption ?? ""}
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />
          )}
          {item.caption && (
            <p className="max-w-lg text-center text-sm text-white/80">{item.caption}</p>
          )}
          {items.length > 1 && (
            <p className="text-xs text-white/40">
              {index + 1} / {items.length}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
