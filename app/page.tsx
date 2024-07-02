import { FullPostsList } from "@/components/FullPostsList";
import { Loader } from "@/components/Loader";
import { PageMainContainer } from "@/components/PageMainContainer";
import { PageTitle } from "@/components/PageTitle";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Home() {
  return (
    <PageMainContainer>
      <PageTitle>Latest Posts</PageTitle>
      <Suspense fallback={<Loader />}>
        <FullPostsList />
      </Suspense>
    </PageMainContainer>
  );
}
