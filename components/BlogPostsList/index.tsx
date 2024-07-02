import { Prisma } from "@prisma/client";
import { BlogPostCard } from "../BlogPostCard";

export function BlogPostsList({
  posts,
}: {
  posts:
    | Prisma.postsGetPayload<{
        include: { directus_files: true; tags_posts: true };
      }>[]
    | null;
}) {
  return (
    <div className="flex flex-col gap-10">
      {posts && posts.length ? (
        posts.map((post) => <BlogPostCard key={post.id} post={post} />)
      ) : (
        <div className="text-4xl font-bold">There are no posts</div>
      )}
    </div>
  );
}
