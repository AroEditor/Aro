import { LinkIcon, PhotoIcon } from "@heroicons/react/16/solid";
import { VariableIcon } from "@heroicons/react/24/outline";
import { TableIcon, TextIcon } from "@radix-ui/react-icons";
import { useEditorStore } from "~/app/(protected)/document/[id]/editor";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

export default function ElementsPanel() {
  const { editor } = useEditorStore();

  const links = [
    {
      title: "Text",
      icon: TextIcon,
      id: "/text",
      command: () => {
        editor?.commands.insertContent({ type: "paragraph" });
      },
    },
    {
      title: "Table",
      icon: TableIcon,
      id: "/table",
      command: () => {
        editor?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
      },
    },
    {
      title: "Equation",
      icon: VariableIcon,
      id: "/equation",
      command: () => {
        editor?.commands.insertContent({ type: "math-editor" });
      },
    },
    {
      title: "Link",
      icon: LinkIcon,
      id: "/link",
      command: null,
    },
    {
      title: "Image",
      icon: PhotoIcon,
      id: "/image",
      command: null,
    },
  ];

  return (
    <div className="w-full flex-grow space-y-4">
      <div className={"space-y-1"}>
        <p className="mb-2 mt-4 font-semibold">Elements</p>
        <p className={"text-sm"}>Select an element to add to your document.</p>
      </div>
      <div className={"w-full flex-grow space-y-3"}>
        {links.map(({ title, icon: Icon, id, command }, i) => {
          const button = (
            <button
              key={id}
              className={cn(
                "flex w-full items-center gap-2 rounded-md border border-primary bg-white p-2 font-medium text-black shadow transition-all",
                command ? "group hover:bg-primary" : "opacity-50"
              )}
              disabled={!command}
              onClick={() => command?.()}
            >
              <div className={"rounded-sm border border-primary bg-primary/10 p-1"}>
                <Icon className={"w-4 group-hover:text-white"} />
              </div>
              <div className={"flex flex-1 justify-between"}>
                <p className={"font-medium text-primary group-hover:text-white"}>{title}</p>
                <p className={"font-medium text-gray-400"}>{id}</p>
              </div>
            </button>
          );

          return command ? (
            button
          ) : (
            <TooltipProvider key={id} delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side={"right"}>
                  <p>Coming soon!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}
