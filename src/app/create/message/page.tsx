import { StepFooter } from "@/components/create/StepFooter";

export default function MessageStepPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">Write the birthday message that appears after unlocking.</p>

      <textarea
        name="message"
        rows={8}
        placeholder="Happy birthday! Wishing you..."
        className="rounded-lg border border-black/10 px-3 py-2 dark:border-white/15"
      />

      <StepFooter currentSlug="message" />
    </div>
  );
}
