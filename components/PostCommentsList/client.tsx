"use client";

import { comments } from "@prisma/client";
import { useOptimistic } from "react";
import { CommentForm } from "../CommentForm";

export function PostCommentsListClient({
  post_id,
  comments,
  postComment,
}: {
  post_id: string;
  comments: comments[];
  postComment: (formData: FormData) => Promise<comments>;
}) {
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    comments[],
    Pick<comments, "author_name" | "content">
  >(comments, (state, newComment) => [
    {
      ...newComment,
      created_at: new Date(),
      post_id,
      id: "",
    },
    ...state,
  ]);

  return (
    <div className="flex flex-col gap-10">
      <CommentForm
        postComment={postComment}
        optimisticPostComment={addOptimisticComment}
      />
      <h2 className="text-3xl">Comments:</h2>
      <div className="flex flex-col gap-10">
        {optimisticComments && optimisticComments.length > 0 ? (
          optimisticComments.map((comment) => {
            const date = new Date(comment.created_at).toLocaleString();
            return (
              <div key={comment.id} className="flex flex-col gap-4">
                <div className="text-xl font-bold">
                  {comment.author_name}{" "}
                  <span className="text-gray-500">{date}</span>
                </div>
                <div className="text-xl">{comment.content}</div>
              </div>
            );
          })
        ) : (
          <div className="text-xl">No comments</div>
        )}
      </div>
    </div>
  );
}
