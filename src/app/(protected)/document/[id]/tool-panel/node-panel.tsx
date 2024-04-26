import { ReactNode } from "react";

import { useEditorStore } from "~/app/(protected)/document/[id]/editor";

import TableOptions from "./table-options";
import TextOptions from "./text-options";

export default function NodePanel() {
  const { editor } = useEditorStore();

  let name: string;
  let Component: () => ReactNode;

  if (editor?.can().deleteTable()) {
    name = "Table Style";
    Component = TableOptions;
  } else {
    name = "Text";
    Component = TextOptions;
  }

  return (
    <div className="w-full flex-grow space-y-4">
      <div className={"space-y-1"}>
        <p className="mb-2 mt-4 font-semibold">{name}</p>
      </div>
      <div className={"w-full flex-grow space-y-3"}>
        <Component />
      </div>
    </div>
  );
}
