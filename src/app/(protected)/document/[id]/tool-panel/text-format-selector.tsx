import { FontBoldIcon, FontItalicIcon, StrikethroughIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/core";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export default function TextFormatSelector({ editor }: { editor: Editor | null }) {
  const formats = [
    {
      name: "Bold",
      icon: FontBoldIcon,
      isActive: editor?.isActive("bold"),
      command: () => {
        editor?.chain().focus().toggleBold().run();
      },
    },
    {
      name: "Italic",
      icon: FontItalicIcon,
      isActive: editor?.isActive("italic"),
      command: () => {
        editor?.chain().focus().toggleItalic().run();
      },
    },
    {
      name: "Strikethrough",
      icon: StrikethroughIcon,
      isActive: editor?.isActive("strike"),
      command: () => {
        editor?.chain().focus().toggleStrike().run();
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
