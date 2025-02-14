import { BlogPostsList } from "@/components/BlogPostsList";
import { PageMainContainer } from "@/components/PageMainContainer";
import { PageTitle } from "@/components/PageTitle";
import { prisma } from "@/prisma/prisma";

export async function generateStaticParams() {
  const tags = await prisma.tags.findMany();

  return tags.map((tag) => ({
    slug: tag.title,
  }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await prisma.posts.findMany({
    include: { tags_posts: true },
    where: { tags_posts: { some: { tags_title: params.tag } } },
    orderBy: { created_at: "desc" },
  });
  return (
    <PageMainContainer>
      <PageTitle>Posts tagged with #{params.tag}</PageTitle>
      <BlogPostsList posts={posts} />
    </PageMainContainer>
  );
}
