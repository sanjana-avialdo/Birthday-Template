"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PIN_LENGTH = 4;
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"];

interface PinScreenProps {
  hint: string | null;
  submitting: boolean;
  error: string | null;
  onSubmit: (pin: string) => void;
}

export function PinScreen({ hint, submitting, error, onSubmit }: PinScreenProps) {
  const [pin, setPin] = useState("");
  const [shakeCount, setShakeCount] = useState(0);
  const [prevError, setPrevError] = useState(error);

  if (error !== prevError) {
    setPrevError(error);
    if (error) {
      setPin("");
      setShakeCount((count) => count + 1);
    }
  }

  function pressKey(key: string) {
    if (submitting) return;

    if (key === "back") {
      setPin((current) => current.slice(0, -1));
      return;
    }
    if (key === "clear") {
      setPin("");
      return;
    }
    if (pin.length >= PIN_LENGTH) return;

    const next = pin + key;
    setPin(next);

    if (next.length === PIN_LENGTH) {
      onSubmit(next);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_20%,#3a0d10_0%,#1a0407_55%,#0b0203_100%)] px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:repeating-radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0,transparent_60%)]" />

      <div className="relative flex w-full max-w-xs flex-col items-center gap-6 text-center">
        <span className="animate-float text-5xl">🐹</span>

        <h1 className="font-baloo text-2xl font-semibold tracking-wide text-rose-50">
          A surprise is waiting
        </h1>

        <p className="text-xs font-medium tracking-[0.2em] text-rose-200/70 uppercase">
          Enter the secret code
        </p>

        {hint && (
          <p className="rounded-full bg-amber-400/10 px-4 py-1.5 text-xs text-amber-300">
            💡 {hint}
          </p>
        )}

        <div key={shakeCount} className={`flex gap-3 ${shakeCount > 0 ? "animate-shake" : ""}`}>
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <span
              key={i}
              className={`h-3.5 w-3.5 rounded-full border border-rose-300/50 transition-colors ${
                i < pin.length ? "bg-rose-400" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-2 grid grid-cols-3 gap-4">
          {KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => pressKey(key)}
              disabled={submitting}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-lg font-medium text-rose-50 backdrop-blur transition-colors hover:bg-white/10 disabled:opacity-40"
            >
              {key === "back" ? "⌫" : key === "clear" ? "✕" : key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
