import { tags } from "@prisma/client";
import { Tag } from "../Tag";

export function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-4">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
