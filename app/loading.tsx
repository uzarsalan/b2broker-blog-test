import { Loader } from "@/components/Loader";
import { PageMainContainer } from "@/components/PageMainContainer";

export default async function Loading() {
  return (
    <PageMainContainer>
      <div className="h-[calc(100vh-65px-80px)] flex flex-col justify-center items-center">
        <Loader />
      </div>
    </PageMainContainer>
  );
}
