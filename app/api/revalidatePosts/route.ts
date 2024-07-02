import { revalidatePath } from "next/cache";

export function GET(request: Request) {
  if (request.headers.get("token") !== process.env.REVALIDATE_TOKEN)
    return null;
  revalidatePath("/");
}
