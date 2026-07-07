import { StepFooter } from "@/components/create/StepFooter";

export default function MusicStepPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">
        Add a link to a song, or upload an audio file to play in the background.
      </p>

      <label className="flex flex-col gap-1 text-sm">
        Music URL
        <input
          name="musicUrl"
          type="url"
          placeholder="https://..."
          className="rounded-lg border border-black/10 px-3 py-2 dark:border-white/15"
        />
      </label>

      <StepFooter currentSlug="music" />
    </div>
  );
}
