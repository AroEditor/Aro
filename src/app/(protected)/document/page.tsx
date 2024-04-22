import Appbar from "./appbar";
import Editor from "./editor";

export default function ProtectedPage() {
  return (
    <div className={"flex w-full flex-1 flex-col"}>
      <Appbar />
      <div className={"mx-auto flex w-full max-w-7xl flex-1 gap-8 p-6"}>
        <div className={"w-full max-w-xs bg-blue-500 p-8"}></div>
        <div className={"flex flex-1"}>
          <div className={"flex-1 rounded-lg border-2 bg-white"}>
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}
