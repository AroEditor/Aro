import Appbar from "./appbar";
import Editor from "./editor";

export default function ProtectedPage() {
  return (
    <div className={"flex w-full flex-1 flex-col"}>
      <Appbar />
      <div className={"mx-auto flex w-full flex-1"}>
        <div className={"w-full max-w-xs border-r p-8"}></div>
        <div className={"flex flex-1"}>
          <div className={"flex-1 bg-white"}>
            <Editor />
          </div>
        </div>
      </div>
    </div>
  );
}
