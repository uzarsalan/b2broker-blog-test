import { ImagePlaceholder } from "@/svg/ImagePlaceholder";
import { getDirectusFileUrl } from "@/utils/directus";
import { Prisma, posts } from "@prisma/client";
import Image from "next/image";
import { Tag } from "../Tag";
import Link from "next/link";
import { PostTags } from "../PostTags";

export function BlogPostCard({
  post,
}: {
  post: Prisma.postsGetPayload<{
    include: { directus_files: true; tags_posts: true };
  }>;
}) {
  const tags = post.tags_posts.map(({ tags_title }) => tags_title);
  const date = new Date(post.created_at).toLocaleString();
  return (
    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
      <Link href={`/${post.slug}`} className="relative w-full h-full">
        {post.directus_files ? (
          <Image
            fill
            src={getDirectusFileUrl(post.directus_files?.id)}
            alt={post.title}
            className="object-contain"
          ></Image>
        ) : (
          <ImagePlaceholder />
        )}
      </Link>
      <div className="flex flex-col gap-4 lg:col-span-2">
        <Link href={`/${post.slug}`}>
          <h2 className="text-3xl font-bold">{post.title}</h2>
        </Link>
        <p className="text-2xl line-clamp-5">{post.content}</p>
        <PostTags tags={tags} />
        <p className="text-gray-500 text-xl">{date}</p>
      </div>
    </article>
  );
}
