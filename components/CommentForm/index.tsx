"use client";

import { comments } from "@prisma/client";
import { Button } from "../Button";
import { useFormStatus } from "react-dom";
import { FormEventHandler, useRef } from "react";

export function CommentForm({
  postComment,
  optimisticPostComment,
}: {
  postComment: (formData: FormData) => Promise<comments>;
  optimisticPostComment: (
    comment: Pick<comments, "author_name" | "content">
  ) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const data = new FormData(event.currentTarget);
    optimisticPostComment({
      author_name: data.get("author_name") as string,
      content: data.get("content") as string,
    });
  };

  const handleSubmitClient = async (formData: FormData) => {
    formRef.current?.reset();
    const response = await postComment(formData);
  };
  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 text-xl"
      action={handleSubmitClient}
      onSubmit={onSubmit}
    >
      <div className="text-3xl">Add new comment</div>
      <label className="flex flex-col gap-4 items-start">
        <span>Name</span>
        <input
          required
          className="p-4 border min-w-[400px]"
          name="author_name"
        />
      </label>
      <label className="w-full flex flex-col gap-4">
        <span>Comment</span>
        <textarea required className="p-4 border w-full" name="content" />
      </label>
      <div className="flex">
        <Button>Leave comment</Button>
      </div>
    </form>
  );
}
