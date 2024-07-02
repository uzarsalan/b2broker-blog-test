import { Loader } from "@/components/Loader";
import { PageMainContainer } from "@/components/PageMainContainer";
import { PageTitle } from "@/components/PageTitle";
import { PostCommentsList } from "@/components/PostCommentsList";
import { PostTags } from "@/components/PostTags";
import { prisma } from "@/prisma/prisma";
import { ImagePlaceholder } from "@/svg/ImagePlaceholder";
import { getDirectusFileUrl } from "@/utils/directus";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await prisma.posts.findUnique({
    include: { tags_posts: true, directus_files: true },
    where: { slug },
  });
  if (!post) {
    return notFound();
  }
  const tags = post.tags_posts.map(({ tags_title }) => tags_title);
  return (
    <PageMainContainer>
      <div className="relative w-full h-[400px]">
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
      </div>
      <PageTitle>{post.title}</PageTitle>
      <div className="text-2xl">{post.content}</div>
      <PostTags tags={tags} />
      <div className="border-b border-black border-dotted" />
      <Suspense fallback={<Loader />}>
        <PostCommentsList postId={post.id} />
      </Suspense>
    </PageMainContainer>
  );
}
