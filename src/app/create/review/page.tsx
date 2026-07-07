"use client";

import { useState } from "react";
import { useCreateForm } from "@/components/create/CreateFormContext";

export default function ReviewStepPage() {
  const { form } = useCreateForm();
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const canPublish = form.recipientName.trim() !== "" && form.senderName.trim() !== "";

  async function handlePublish() {
    setPublishing(true);
    setError(null);

    const body = new FormData();
    body.set("recipientName", form.recipientName);
    body.set("senderName", form.senderName);
    body.set("message", form.message);
    body.set("musicUrl", form.musicUrl);
    body.set("pin", form.pin);
    body.set("pinHint", form.pinHint);
    form.media.forEach(({ file }) => body.append("media", file));

    try {
      const res = await fetch("/api/cards", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong publishing this card.");
        return;
      }

      const site = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
      setShareUrl(`${site}/c/${data.slug}`);
    } catch {
      setError("Something went wrong publishing this card.");
    } finally {
      setPublishing(false);
    }
  }

  if (shareUrl) {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <span className="text-4xl">🎉</span>
        <h2 className="text-xl font-semibold">Your card is live!</h2>
        <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-black/10 px-3 py-2 dark:border-white/15">
          <input readOnly value={shareUrl} className="flex-1 bg-transparent text-sm outline-none" />
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background"
          >
            Copy
          </button>
        </div>
        <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">
          View the card
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">Review everything, then publish to get a shareable link.</p>

      <dl className="flex flex-col gap-3 rounded-lg border border-black/10 px-4 py-4 text-sm dark:border-white/15">
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/60">Recipient</dt>
          <dd>{form.recipientName || "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/60">From</dt>
          <dd>{form.senderName || "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/60">PIN protected</dt>
          <dd>{form.pin ? `Yes (${form.pin})` : "No"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/60">Message</dt>
          <dd className="max-w-[70%] truncate text-right">{form.message || "—"}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/60">Photos/videos</dt>
          <dd>{form.media.length}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground/60">Music</dt>
          <dd className="max-w-[70%] truncate text-right">{form.musicUrl || "—"}</dd>
        </div>
      </dl>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-6 dark:border-white/15">
        <a href="/create/wishes" className="text-sm underline underline-offset-4">
          Back to Wishes
        </a>
        <button
          type="button"
          onClick={handlePublish}
          disabled={!canPublish || publishing}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {publishing ? "Publishing…" : "Publish card"}
        </button>
      </div>
    </div>
  );
}
