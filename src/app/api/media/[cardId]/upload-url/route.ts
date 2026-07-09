import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface UploadUrlBody {
  filename?: string;
  position?: number;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const { cardId } = await params;
  const { filename, position } = (await request.json()) as UploadUrlBody;

  if (!filename) {
    return NextResponse.json({ error: "filename is required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const path = `${cardId}/${position ?? 0}-${filename}`;

  const { data, error } = await supabase.storage.from("card-media").createSignedUploadUrl(path);

  if (error || !data) {
    console.error("Failed to create signed upload URL:", error);
    return NextResponse.json({ error: "Failed to prepare upload" }, { status: 500 });
  }

  return NextResponse.json({ path: data.path, token: data.token });
}
