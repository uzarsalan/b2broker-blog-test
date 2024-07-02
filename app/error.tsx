"use client";

import { PageMainContainer } from "@/components/PageMainContainer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageMainContainer>
      <div className="flex flex-col items-center"></div>
      <h2 className="text-center text-2xl">Something went wrong!</h2>
      <div className="flex justify-center">
        <button className="bg-blue-600 p-4 text-white" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </PageMainContainer>
  );
}
