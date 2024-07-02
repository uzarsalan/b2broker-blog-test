import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export function GET(request: Request) {
  const response = new NextResponse();
  if (request.headers.get("token") !== process.env.REVALIDATE_TOKEN)
    return response;

  revalidatePath("/");
  return response;
}
