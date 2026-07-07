"use client";

import { StepFooter } from "@/components/create/StepFooter";
import { useCreateForm } from "@/components/create/CreateFormContext";

export default function NamesStepPage() {
  const { form, update } = useCreateForm();

  return (
    <div className="flex flex-col gap-6">
      <p className="text-foreground/70">
        Who is this card for, and from whom? Optionally lock it with a PIN.
      </p>

      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Recipient name
          <input
            name="recipientName"
            type="text"
            value={form.recipientName}
            onChange={(e) => update({ recipientName: e.target.value })}
            placeholder="e.g. Sanjana"
            className="rounded-lg border border-black/10 px-3 py-2 dark:border-white/15"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Sender name
          <input
            name="senderName"
            type="text"
            value={form.senderName}
            onChange={(e) => update({ senderName: e.target.value })}
            placeholder="e.g. From your team"
            className="rounded-lg border border-black/10 px-3 py-2 dark:border-white/15"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          PIN (optional, 4 digits)
          <input
            name="pin"
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={form.pin}
            onChange={(e) => update({ pin: e.target.value.replace(/\D/g, "").slice(0, 4) })}
            placeholder="4 digits"
            className="rounded-lg border border-black/10 px-3 py-2 dark:border-white/15"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          PIN hint (optional)
          <input
            name="pinHint"
            type="text"
            value={form.pinHint}
            onChange={(e) => update({ pinHint: e.target.value })}
            placeholder="e.g. our anniversary"
            className="rounded-lg border border-black/10 px-3 py-2 dark:border-white/15"
          />
        </label>
      </form>

      <StepFooter currentSlug="names" />
    </div>
  );
}
