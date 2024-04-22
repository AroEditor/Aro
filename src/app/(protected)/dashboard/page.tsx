import Header from "./header";
import ProjectGrid from "./project-grid";
import Sidebar from "./sidebar";

export default function Dashboard() {
  return (
    <div className={"flex h-screen w-full"}>
      <Sidebar />
      <main className={"flex-grow overflow-y-auto p-5"}>
        <Header />
        <ProjectGrid />
      </main>
    </div>
  );
}
