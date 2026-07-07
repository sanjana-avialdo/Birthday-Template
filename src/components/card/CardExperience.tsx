"use client";

import { useEffect, useState } from "react";
import { ConfettiBurst } from "./ConfettiBurst";

interface PublicCard {
  recipientName: string;
  senderName: string;
  musicUrl: string | null;
  pinHint: string | null;
  locked: boolean;
}

interface UnlockedContent {
  message: string | null;
  media: { id: string; storagePath: string; mediaType: "image" | "video" }[];
}

export function CardExperience({ slug }: { slug: string }) {
  const [card, setCard] = useState<PublicCard | null>(null);
  const [unlocked, setUnlocked] = useState<UnlockedContent | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/cards/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setCard)
      .catch(() => setError("This card could not be found."));
  }, [slug]);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch(`/api/cards/${slug}/unlock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    setSubmitting(false);

    if (!res.ok) {
      setError("That PIN didn't work — try again.");
      return;
    }

    setUnlocked(await res.json());
  }

  if (error && !card) {
    return <p className="text-foreground/70">{error}</p>;
  }

  if (!card) {
    return <p className="text-foreground/70">Loading card…</p>;
  }

  if (!unlocked) {
    return (
      <form onSubmit={handleUnlock} className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-semibold">A card for {card.recipientName}</h1>
        <p className="text-foreground/70">From {card.senderName}</p>

        {card.locked && (
          <>
            <input
              type="text"
              inputMode="numeric"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="rounded-lg border border-black/10 px-3 py-2 text-center dark:border-white/15"
            />
            {card.pinHint && <p className="text-xs text-foreground/50">Hint: {card.pinHint}</p>}
          </>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {submitting ? "Opening…" : "Open"}
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <ConfettiBurst />
      <h1 className="text-3xl font-semibold">Happy birthday, {card.recipientName}!</h1>
      {unlocked.message && <p className="max-w-prose whitespace-pre-wrap text-foreground/80">{unlocked.message}</p>}

      {unlocked.media.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {unlocked.media.map((item) => (
            <li key={item.id} className="aspect-square overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
              {item.mediaType === "video" ? (
                <video src={item.storagePath} className="h-full w-full object-cover" controls />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.storagePath} alt="" className="h-full w-full object-cover" />
              )}
            </li>
          ))}
        </ul>
      )}

      {card.musicUrl && <audio src={card.musicUrl} autoPlay loop controls />}
    </div>
  );
}
