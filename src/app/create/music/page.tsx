"use client";

import { StepFooter } from "@/components/create/StepFooter";
import { useCreateForm } from "@/components/create/CreateFormContext";

export default function MusicStepPage() {
  const { form, update } = useCreateForm();

  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">
        Add a link to a song to play in the background (optional).
      </p>

      <label className="flex flex-col gap-1 text-sm">
        Music URL
        <input
          name="musicUrl"
          type="url"
          value={form.musicUrl}
          onChange={(e) => update({ musicUrl: e.target.value })}
          placeholder="https://..."
          className="rounded-lg border border-black/10 px-3 py-2 dark:border-white/15"
        />
      </label>

      <StepFooter currentSlug="music" />
    </div>
  );
}
