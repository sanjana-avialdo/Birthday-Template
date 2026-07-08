"use client";

import { StepFooter } from "@/components/create/StepFooter";
import { useCreateForm } from "@/components/create/CreateFormContext";

export default function CaptionsStepPage() {
  const { form, updateMediaCaption } = useCreateForm();
  const photos = form.media.filter(({ file }) => !file.type.startsWith("video"));

  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">
        Add an optional caption to each photo — it&apos;ll show up under the photo in the gallery.
      </p>

      {photos.length === 0 ? (
        <p className="rounded-lg border border-black/10 px-4 py-3 text-sm text-foreground/60 dark:border-white/15">
          No photos uploaded yet. Go back to the Photos step to add some.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {photos.map(({ file, previewUrl, caption }) => (
            <li key={previewUrl} className="flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt={file.name} className="h-full w-full object-cover" />
              </div>
              <input
                type="text"
                value={caption}
                onChange={(e) => updateMediaCaption(previewUrl, e.target.value)}
                placeholder="Add a caption (optional)"
                className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/15"
              />
            </li>
          ))}
        </ul>
      )}

      <StepFooter currentSlug="captions" />
    </div>
  );
}
