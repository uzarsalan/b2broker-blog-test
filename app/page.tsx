import { BlogPostsList } from "@/components/BlogPostsList";
import { PageMainContainer } from "@/components/PageMainContainer";
import { PageTitle } from "@/components/PageTitle";
import { prisma } from "@/prisma/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My blog",
  description: "Cool story of my life!",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "My blog",
    description: "Cool story of my life!",
    images: [
      {
        url: "https://example.com/image.png",
        width: 2467,
        height: 2765,
      },
    ],
  },
};

export default async function Home() {
  const posts = await prisma.posts.findMany({
    include: { directus_files: true, tags_posts: true },
    orderBy: { created_at: "desc" },
  });
  return (
    <PageMainContainer>
      <PageTitle>Latest Posts</PageTitle>
      <BlogPostsList posts={posts} />
    </PageMainContainer>
  );
}
