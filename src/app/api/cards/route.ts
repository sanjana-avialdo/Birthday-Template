import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashPin } from "@/lib/pin";
import { generateSlug } from "@/lib/slug";

const MAX_SLUG_ATTEMPTS = 3;

interface CreateCardBody {
  recipientName?: string;
  senderName?: string;
  message?: string;
  musicUrl?: string;
  pin?: string;
  pinHint?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateCardBody;

  const recipientName = (body.recipientName ?? "").trim();
  const senderName = (body.senderName ?? "").trim();
  const message = (body.message ?? "").trim();
  const musicUrl = (body.musicUrl ?? "").trim();
  const pin = (body.pin ?? "").trim();
  const pinHint = (body.pinHint ?? "").trim();

  if (!recipientName || !senderName) {
    return NextResponse.json({ error: "Recipient and sender name are required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const pinHash = pin ? await hashPin(pin) : null;

  for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt++) {
    const candidateSlug = generateSlug(recipientName);
    const { data, error } = await supabase
      .from("cards")
      .insert({
        slug: candidateSlug,
        recipient_name: recipientName,
        sender_name: senderName,
        message: message || null,
        music_url: musicUrl || null,
        pin_hash: pinHash,
        pin_hint: pinHint || null,
      })
      .select("id, slug")
      .single();

    if (data) {
      return NextResponse.json({ id: data.id, slug: data.slug });
    }

    if (error?.code !== "23505") {
      console.error("Failed to insert card:", error);
      return NextResponse.json(
        { error: `Failed to create card: ${error?.message ?? "unknown error"}` },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ error: "Could not generate a unique link, try again" }, { status: 500 });
}
