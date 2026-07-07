import { StepFooter } from "@/components/create/StepFooter";

export default function WishesStepPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">
        Share the card link with others before publishing so they can leave a wish, or skip this step.
      </p>

      <div className="rounded-lg border border-black/10 px-4 py-3 text-sm text-foreground/70 dark:border-white/15">
        Wishes left by guests will appear here once the card is published and shared.
      </div>

      <StepFooter currentSlug="wishes" />
    </div>
  );
}
