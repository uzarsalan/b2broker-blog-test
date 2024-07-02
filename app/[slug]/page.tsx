import { PageProps } from "@/.next/types/app/[slug]/page";
import { Loader } from "@/components/Loader";
import { PageMainContainer } from "@/components/PageMainContainer";
import { PageTitle } from "@/components/PageTitle";
import { PostCommentsList } from "@/components/PostCommentsList";
import { PostTags } from "@/components/PostTags";
import { prisma } from "@/prisma/prisma";
import { ImagePlaceholder } from "@/svg/ImagePlaceholder";
import { getDirectusFileUrl } from "@/utils/directus";
import { getDomain } from "@/utils/getDomain";
import { truncateText } from "@/utils/truncateText";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const post = await prisma.posts.findUnique({
    where: { slug: slug },
  });

  if (!post) return notFound();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `My blog | ${post.title}`,
    description: truncateText(post.content),
    openGraph: {
      images: post.thumbnail
        ? [getDirectusFileUrl(post.thumbnail), ...previousImages]
        : previousImages,
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.posts.findMany();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await prisma.posts.findUnique({
    include: { tags_posts: true },
    where: { slug },
  });
  if (!post) {
    return notFound();
  }
  const tags = post.tags_posts.map(({ tags_title }) => tags_title);
  return (
    <PageMainContainer>
      <div className="relative w-full h-[400px]">
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
