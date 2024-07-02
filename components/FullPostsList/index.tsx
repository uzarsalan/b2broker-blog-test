import { prisma } from "@/prisma/prisma";
import { BlogPostsList } from "../BlogPostsList";

export async function FullPostsList() {
  const posts = await prisma.posts.findMany({
    include: { tags_posts: true },
    orderBy: { created_at: "desc" },
  });
  return <BlogPostsList posts={posts} />;
}
