import {
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export default function TextAlignSelector({ editor }: { editor: Editor | null }) {
  const formats = [
    {
      name: "Left align",
      icon: TextAlignLeftIcon,
      isActive: editor?.isActive({ textAlign: "left" }),
      command: () => {
        editor?.chain().focus().setTextAlign("left").run();
      },
    },
    {
      name: "Center align",
      icon: TextAlignCenterIcon,
      isActive: editor?.isActive({ textAlign: "center" }),
      command: () => {
        editor?.chain().focus().setTextAlign("center").run();
      },
    },
    {
      name: "Right align",
      icon: TextAlignRightIcon,
      isActive: editor?.isActive({ textAlign: "right" }),
      command: () => {
        editor?.chain().focus().setTextAlign("right").run();
      },
    },
    {
      name: "Justify align",
      icon: TextAlignJustifyIcon,
      isActive: editor?.isActive({ textAlign: "justify" }),
      command: () => {
        editor?.chain().focus().setTextAlign("justify").run();
      },
    },
  ];

  return (
    <div className={"space-y-2"}>
      <ToggleGroup type="multiple" value={formats.filter(v => v.isActive).map(({ name }) => name)}>
        {formats.map(({ name, icon: Icon, command }) => (
          <ToggleGroupItem value={name} onClick={command}>
            <Icon />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
