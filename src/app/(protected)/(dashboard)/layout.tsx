import { ReactNode } from "react";

import Header from "./header";
import Sidebar from "./sidebar";

export const revalidate = 0;

export default async function Home({ children }: { children: ReactNode }) {
  return (
    <div className={"flex h-screen w-full"}>
      <Sidebar />
      <main className={"flex-grow overflow-y-auto bg-white"}>
        <Header />
        {children}
      </main>
    </div>
  );
}
