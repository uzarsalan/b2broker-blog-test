import { PropsWithChildren } from "react";

export function PageMainContainer({ children }: PropsWithChildren) {
  return (
    <main className="container mx-auto flex flex-col gap-10 p-10">
      {children}
    </main>
  );
}
