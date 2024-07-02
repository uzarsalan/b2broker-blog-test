import { PageMainContainer } from "@/components/PageMainContainer";
import { PageTitle } from "@/components/PageTitle";
import { PostTags } from "@/components/PostTags";
import { prisma } from "@/prisma/prisma";

export default async function TagsListPage() {
  const tags = await prisma.tags.findMany();
  return (
    <PageMainContainer>
      <PageTitle>All Tags</PageTitle>
      <PostTags tags={tags.map((tag) => tag.title)} />
    </PageMainContainer>
  );
}
