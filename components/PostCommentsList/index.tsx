import { prisma } from "@/prisma/prisma";
import { Button } from "../Button";
import { revalidatePath } from "next/cache";
import { CommentForm } from "../CommentForm";
import { PostCommentsListClient } from "./client";

export async function PostCommentsList({
  postId,
  slug,
}: {
  postId: string;
  slug: string;
}) {
  const comments = await prisma.comments.findMany({
    where: { post_id: postId },
    orderBy: { created_at: "desc" },
  });

  async function postComment(formData: FormData) {
    "use server";

    const comment = {
      author_name: formData.get("author_name") as string,
      content: formData.get("content") as string,
    };

    const createdComment = await prisma.comments.create({
      data: {
        ...comment,
        posts: { connect: { id: postId } },
      },
    });
    revalidatePath(`/${slug}`);
    return createdComment;
  }

  return (
    <PostCommentsListClient
      post_id={postId}
      comments={comments}
      postComment={postComment}
    />
  );
}
