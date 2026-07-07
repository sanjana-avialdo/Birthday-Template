import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const supabase = createAdminClient();

  const { data: card, error } = await supabase
    .from("cards")
    .select("id, slug, recipient_name, sender_name, theme, music_url, pin_hint, pin_hash")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: card.id,
    slug: card.slug,
    recipientName: card.recipient_name,
    senderName: card.sender_name,
    theme: card.theme,
    musicUrl: card.music_url,
    pinHint: card.pin_hint,
    locked: Boolean(card.pin_hash),
  });
}
