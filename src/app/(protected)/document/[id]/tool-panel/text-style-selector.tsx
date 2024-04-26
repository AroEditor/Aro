import { Editor } from "@tiptap/core";
import { FaCode } from "react-icons/fa6";
import { TbMathFunction } from "react-icons/tb";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export default function TextStyleSelector({ editor }: { editor: Editor | null }) {
  const formats = [
    {
      name: "Code",
      icon: FaCode,
      isActive: editor?.isActive("code"),
      command: () => {
        editor?.chain().focus().toggleCode().run();
      },
    },
    {
      name: "Math",
      icon: TbMathFunction,
      isActive: editor?.isActive("math_inline"),
      command: () => {
        editor?.chain().blur().insertContent({ type: "math_inline" }).run();
      },
    },
  ];

  return (
    <div className={"flex gap-x-2"}>
      {formats.map(({ name, icon: Icon, command }) => (
        <ToggleGroup type="multiple" value={formats.filter(v => v.isActive).map(({ name }) => name)}>
          <ToggleGroupItem value={name} onClick={command}>
            <Icon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
