import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (request.headers.get("token") !== process.env.REVALIDATE_TOKEN)
    return NextResponse.json({ error: "Invalid token" });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
