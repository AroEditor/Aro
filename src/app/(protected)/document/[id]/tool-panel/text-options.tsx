// Define the new links with corresponding icons for the toolbar
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { useEditorStore } from "~/app/(protected)/document/[id]/editor";
import TextAlignSelector from "~/app/(protected)/document/[id]/tool-panel/text-align-selector";
import TextFormatSelector from "~/app/(protected)/document/[id]/tool-panel/text-format-selector";
import TextStyleSelector from "~/app/(protected)/document/[id]/tool-panel/text-style-selector";
import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";

const TextType = ({ name, isActive, command }: { name: string; isActive: boolean; command: () => void }) => (
  <Button
    variant={"outline"}
    className={cn("h-9 border-gray-300 bg-white px-3 shadow-none", isActive && "!bg-primary/10 !text-primary")}
    onClick={command}
  >
    {name}
  </Button>
);

export default function TextOptions() {
  const { editor } = useEditorStore();

  const nodeAttrs = editor?.state.selection.$anchor.node().attrs;

  const styles = [
    {
      name: "Title",
      isActive: nodeAttrs?.level === 1,
      command: () => {
        editor?.chain().focus().setNode("heading", { level: 1 }).run();
      },
    },
    {
      name: "Heading",
      isActive: nodeAttrs?.level === 2,
      command: () => {
        editor?.chain().focus().setNode("heading", { level: 2 }).run();
      },
    },
    {
      name: "Subheading",
      isActive: nodeAttrs?.level === 3,
      command: () => {
        editor?.chain().focus().setNode("heading", { level: 3 }).run();
      },
    },
    {
      name: "Subsubheading",
      isActive: nodeAttrs?.level === 4,
      command: () => {
        editor?.chain().focus().setNode("heading", { level: 4 }).run();
      },
    },
    {
      name: "Paragraph",
      isActive: !nodeAttrs?.level,
      command: () => {
        editor?.chain().focus().setNode("paragraph").run();
      },
    },
  ];

  const lists = [
    {
      name: "bulletList",
      icon: MdFormatListBulleted,
      isActive: editor?.isActive("bulletList"),
      command: () => {
        editor?.chain().focus().toggleBulletList().run();
      },
    },
    {
      name: "orderedList",
      icon: MdFormatListNumbered,
      isActive: editor?.isActive("orderedList"),
      command: () => {
        editor?.chain().focus().toggleOrderedList().run();
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className={"space-y-2"}>
        <p className={"text-sm font-semibold uppercase text-muted-foreground"}>Type</p>
        <div className={"flex flex-wrap gap-1"}>
          {styles.map(({ name, isActive, command }) => (
            <TextType key={name} name={name} isActive={!!isActive} command={command} />
          ))}
        </div>
      </div>
      <div className={"space-y-2"}>
        <p className={"text-sm font-semibold uppercase text-muted-foreground"}>Style</p>
        <TextFormatSelector editor={editor} />
        <div className={"space-y-2"}>
          <ToggleGroup type="multiple" value={lists.filter(v => v.isActive).map(({ name }) => name)}>
            {lists.map(({ name, icon: Icon, command }) => (
              <ToggleGroupItem value={name} onClick={command}>
                <Icon />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <TextAlignSelector editor={editor} />
        <TextStyleSelector editor={editor} />
      </div>
    </div>
  );
}
