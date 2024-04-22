import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

const Commands = Extension.create({
  name: "mention",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        // @ts-ignore
        command: ({ editor, range, props }) => {
          console.log(props);
          props.command({ editor, range, props });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default Commands;
