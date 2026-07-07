"use client";

import { StepFooter } from "@/components/create/StepFooter";
import { useCreateForm } from "@/components/create/CreateFormContext";

export default function MessageStepPage() {
  const { form, update } = useCreateForm();

  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">Write the birthday message that appears after unlocking.</p>

      <textarea
        name="message"
        rows={8}
        value={form.message}
        onChange={(e) => update({ message: e.target.value })}
        placeholder="Happy birthday! Wishing you..."
        className="rounded-lg border border-black/10 px-3 py-2 dark:border-white/15"
      />

      <StepFooter currentSlug="message" />
    </div>
  );
}
