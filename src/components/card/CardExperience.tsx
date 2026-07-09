"use client";

import { useEffect, useState } from "react";
import { PinScreen } from "./PinScreen";
import { LoadingHeart } from "./LoadingHeart";
import { HeroReveal } from "./HeroReveal";
import { BirthdayWish } from "./BirthdayWish";
import { MemoriesTimeline } from "./MemoriesTimeline";
import { MemoriesGallery } from "./MemoriesGallery";
import { ReasonsList } from "./ReasonsList";
import { CakeCutting } from "./CakeCutting";
import { LoveLetter } from "./LoveLetter";
import { FinalMessage } from "./FinalMessage";
import { FireworksFinale } from "./FireworksFinale";
import { DEMO_CARD } from "@/lib/demo-card";
import type { TimelineEntry } from "@/lib/types";

interface PublicCard {
  recipientName: string;
  senderName: string;
  musicUrl: string | null;
  pinHint: string | null;
  locked: boolean;
}

interface MediaItem {
  id: string;
  storagePath: string;
  mediaType: "image" | "video";
  poster?: string;
  caption?: string | null;
}

interface UnlockedContent {
  message: string | null;
  media: MediaItem[];
  timeline: TimelineEntry[];
  reasons: string[];
  loveLetter: string | null;
  finalMessage: string | null;
}

type Stage = "locked" | "loading" | "revealed";

export function CardExperience({ slug }: { slug: string }) {
  const isDemo = slug === "demo";

  const [card, setCard] = useState<PublicCard | null>(isDemo ? DEMO_CARD : null);
  const [unlocked, setUnlocked] = useState<UnlockedContent | null>(null);
  const [stage, setStage] = useState<Stage>("locked");
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isDemo) return;

    fetch(`/api/cards/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setCard)
      .catch(() => setNotFound(true));
  }, [slug, isDemo]);

  async function handleUnlock(pin: string) {
    setSubmitting(true);
    setError(null);

    if (isDemo) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setSubmitting(false);
      if (pin !== DEMO_CARD.pin) {
        setError("That PIN didn't work — try again.");
        return;
      }
      setUnlocked({
        message: DEMO_CARD.message,
        media: DEMO_CARD.media,
        timeline: DEMO_CARD.timeline,
        reasons: DEMO_CARD.reasons,
        loveLetter: DEMO_CARD.loveLetter,
        finalMessage: DEMO_CARD.finalMessage,
      });
      setStage("loading");
      return;
    }

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
    setStage("loading");
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-foreground/70">This card could not be found.</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-foreground/70">Loading card…</p>
      </div>
    );
  }

  if (!card.locked && stage === "locked") {
    setStage("loading");
  }

  if (stage === "locked") {
    return (
      <PinScreen
        hint={card.pinHint}
        submitting={submitting}
        error={error}
        onSubmit={handleUnlock}
      />
    );
  }

  if (stage === "loading") {
    return <LoadingHeart onDone={() => setStage("revealed")} />;
  }

  const message = unlocked?.message ?? null;
  const media = unlocked?.media ?? [];
  const timeline = unlocked?.timeline ?? [];
  const reasons = unlocked?.reasons ?? [];
  const loveLetter = unlocked?.loveLetter ?? null;
  const finalMessage = unlocked?.finalMessage ?? null;

  return (
    <div>
      <HeroReveal recipientName={card.recipientName} message={null} />
      {message && <BirthdayWish message={message} />}
      <MemoriesTimeline entries={timeline} />
      <MemoriesGallery media={media} />
      <ReasonsList reasons={reasons} />
      <CakeCutting />
      {loveLetter && <LoveLetter letter={loveLetter} />}
      {finalMessage && <FinalMessage message={finalMessage} />}
      <FireworksFinale recipientName={card.recipientName} />
      {card.musicUrl && (
        <audio src={card.musicUrl} autoPlay loop className="fixed bottom-4 right-4" controls />
      )}
    </div>
  );
}
