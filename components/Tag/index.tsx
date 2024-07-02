import { tags } from "@prisma/client";
import Link from "next/link";

export function Tag({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="rounded bg-blue-600 p-2 text-lg text-white"
    >
      #{tag}
    </Link>
  );
}
