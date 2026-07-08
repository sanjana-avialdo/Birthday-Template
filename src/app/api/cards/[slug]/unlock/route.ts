import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyPin } from "@/lib/pin";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { pin } = (await request.json()) as { pin?: string };
  const supabase = createAdminClient();

  const { data: card, error } = await supabase
    .from("cards")
    .select("id, message, pin_hash, timeline, reasons, love_letter, final_message")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  if (card.pin_hash) {
    if (!pin || !(await verifyPin(pin, card.pin_hash))) {
      return NextResponse.json({ error: "Incorrect PIN" }, { status: 401 });
    }
  }

  const { data: media } = await supabase
    .from("card_media")
    .select("id, storage_path, media_type, position, caption")
    .eq("card_id", card.id)
    .order("position", { ascending: true });

  return NextResponse.json({
    message: card.message,
    media: (media ?? []).map((item) => ({
      id: item.id,
      storagePath: item.storage_path,
      mediaType: item.media_type,
      position: item.position,
      caption: item.caption,
    })),
    timeline: card.timeline ?? [],
    reasons: card.reasons ?? [],
    loveLetter: card.love_letter,
    finalMessage: card.final_message,
  });
}
