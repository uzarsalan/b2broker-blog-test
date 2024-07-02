import { BlogPostsList } from "@/components/BlogPostsList";
import { PageMainContainer } from "@/components/PageMainContainer";
import { PageTitle } from "@/components/PageTitle";
import { prisma } from "@/prisma/prisma";

export default async function Home() {
  const posts = await prisma.posts.findMany({
    include: { tags_posts: true },
    orderBy: { created_at: "desc" },
  });
  return (
    <PageMainContainer>
      <PageTitle>Latest Posts</PageTitle>
      <BlogPostsList posts={posts} />
    </PageMainContainer>
  );
}
