// Define the new links with corresponding icons for the toolbar
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useEditorStore } from "~/app/(protected)/document/[id]/editor";
import TextFormatSelector from "~/app/(protected)/document/[id]/tool-panel/text-format-selector";
import { Button } from "~/components/ui/button";

const RowsIcon = (
  <svg viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="38" y1="27.4826" y2="27.4826" stroke="#34347B" strokeWidth="1.33333" strokeDasharray="3.33 3.33" />
    <rect
      x="0.333333"
      y="21.1491"
      width="15.3333"
      height="37.3333"
      rx="1.66667"
      transform="rotate(-90 0.333333 21.1491)"
      fill="#34347B"
      fillOpacity="0.2"
      stroke="#34347B"
      strokeWidth="0.666667"
    />
    <line x1="38" y1="0.816081" y2="0.816081" stroke="#34347B" strokeWidth="1.33333" strokeDasharray="3.33 3.33" />
  </svg>
);

export default function TableOptions() {
  const { editor } = useEditorStore();

  const nodeAttrs = editor?.state.selection.$anchor.node().attrs;

  return (
    <div className="space-y-6">
      <div className={"space-y-2"}>
        <p className={"text-sm font-semibold uppercase text-muted-foreground"}>Cells</p>

        <div className={"flex flex-col flex-wrap gap-2"}>
          <div className={"flex items-center"}>
            <div className={"flex flex-1 items-center justify-start gap-4"}>
              <div className={"flex h-8 w-8 items-center"}>{RowsIcon}</div>
              <p className={"text-sm font-bold text-[#39394E]"}>Rows</p>
            </div>
            <div>
              <Button
                variant={"secondary"}
                size={"sm"}
                className={"!rounded-r-none border border-gray-400 bg-gray-200 px-1 shadow-none"}
                onClick={() => editor?.chain().focus().deleteRow().fixTables().run()}
              >
                <MinusIcon className={"w-4"} />
              </Button>
              <Button
                variant={"secondary"}
                size={"sm"}
                className={"!rounded-l-none border border-l-0 border-gray-400 bg-gray-200 px-1 shadow-none"}
                onClick={() => editor?.chain().focus().addRowAfter().fixTables().run()}
              >
                <PlusIcon className={"w-4"} />
              </Button>
            </div>
          </div>
          <div className={"flex items-center"}>
            <div className={"flex flex-1 items-center justify-start gap-4"}>
              <div className={"flex h-8 w-8 rotate-90 items-start"}>{RowsIcon}</div>
              <p className={"text-sm font-bold text-[#39394E]"}>Columns</p>
            </div>
            <div>
              <Button
                variant={"secondary"}
                size={"sm"}
                className={"!rounded-r-none border border-gray-400 bg-gray-200 px-1 shadow-none"}
                onClick={() => {
                  editor?.chain().focus().deleteColumn().run();
                  editor?.chain().focus().fixTables().run();
                }}
              >
                <MinusIcon className={"w-4"} />
              </Button>
              <Button
                variant={"secondary"}
                size={"sm"}
                className={"!rounded-l-none border border-l-0 border-gray-400 bg-gray-200 px-1 shadow-none"}
                onClick={() => editor?.chain().focus().addColumnAfter().fixTables().run()}
              >
                <PlusIcon className={"w-4"} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={"space-y-2"}>
        <p className={"text-sm font-semibold uppercase text-muted-foreground"}>Text Style</p>

        <TextFormatSelector editor={editor} />
      </div>
    </div>
  );
}
