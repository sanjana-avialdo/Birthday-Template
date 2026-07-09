"use client";

import { useState } from "react";
import { useCreateForm } from "@/components/create/CreateFormContext";
import { createClient } from "@/lib/supabase/client";

export default function ReviewStepPage() {
  const { form } = useCreateForm();
  const [publishing, setPublishing] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const canPublish = form.recipientName.trim() !== "" && form.senderName.trim() !== "";

  async function handlePublish() {
    setPublishing(true);
    setError(null);

    try {
      setProgress("Creating your card…");
      const cardRes = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: form.recipientName,
          senderName: form.senderName,
          message: form.message,
          musicUrl: form.musicUrl,
          pin: form.pin,
          pinHint: form.pinHint,
        }),
      });
      const cardData = await cardRes.json();

      if (!cardRes.ok) {
        setError(cardData.error ?? "Something went wrong publishing this card.");
        return;
      }

      const { id: cardId, slug } = cardData;
      const supabase = createClient();

      for (let i = 0; i < form.media.length; i++) {
        const { file, caption } = form.media[i];
        setProgress(`Uploading photo/video ${i + 1} of ${form.media.length}…`);

        const urlRes = await fetch(`/api/media/${cardId}/upload-url`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, position: i }),
        });
        const urlData = await urlRes.json();

        if (!urlRes.ok) {
          console.error("Failed to prepare upload for", file.name, urlData.error);
          continue;
        }

        const { error: uploadError } = await supabase.storage
          .from("card-media")
          .uploadToSignedUrl(urlData.path, urlData.token, file, { contentType: file.type });

        if (uploadError) {
          console.error("Failed to upload", file.name, uploadError);
          continue;
        }

        const { data: publicUrl } = supabase.storage.from("card-media").getPublicUrl(urlData.path);

        await fetch(`/api/media/${cardId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storagePath: publicUrl.publicUrl,
            mediaType: file.type.startsWith("video") ? "video" : "image",
            position: i,
            caption,
          }),
        });
      }

      const site = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
      setShareUrl(`${site}/c/${slug}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong publishing this card.");
    } finally {
      setPublishing(false);
      setProgress(null);
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

      {progress && <p className="text-sm text-foreground/60">{progress}</p>}
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
