import { ImagePlaceholder } from "@/svg/ImagePlaceholder";
import { getDirectusFileUrl } from "@/utils/directus";
import { Prisma, posts } from "@prisma/client";
import Image from "next/image";
import { Tag } from "../Tag";
import Link from "next/link";
import { PostTags } from "../PostTags";
import { MessageIconSvg } from "@/svg/MessageIconSvg";
import { Suspense } from "react";
import { Loader } from "../Loader";
import { prisma } from "@/prisma/prisma";

export function BlogPostCard({
  post,
}: {
  post: Prisma.postsGetPayload<{
    include: { tags_posts: true };
  }>;
}) {
  const tags = post.tags_posts.map(({ tags_title }) => tags_title);
  const date = new Date(post.created_at).toLocaleString();
  return (
    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
      <Link href={`/${post.slug}`} className="relative w-full h-full">
        {post.thumbnail ? (
          <Image
            fill
            src={getDirectusFileUrl(post.thumbnail)}
            alt={post.title}
            className="object-contain"
          ></Image>
        ) : (
          <ImagePlaceholder />
        )}
      </Link>
      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="flex gap-10 items-center">
          <Link href={`/${post.slug}`}>
            <h2 className="text-3xl font-bold">{post.title}</h2>
          </Link>
          <div className="flex gap-2 items-center text-gray-500">
            <MessageIconSvg />
            <Suspense fallback={<Loader size={6} />}>
              <MessageCount postId={post.id} />
            </Suspense>
          </div>
        </div>
        <p className="text-2xl line-clamp-5">{post.content}</p>
        <PostTags tags={tags} />
        <p className="text-gray-500 text-xl">{date}</p>
      </div>
    </article>
  );
}

async function MessageCount({ postId }: { postId: string }) {
  return await prisma.comments.count({ where: { post_id: postId } });
}
