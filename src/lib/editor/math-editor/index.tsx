import React, { useEffect, useState } from "react";

import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import "mathlive";
import { MathfieldElement } from "mathlive";
import { useDebounce } from "use-debounce";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
    }
  }
}

const MathEditorComponent = (props: { node: { attrs: { data: string } }; updateAttributes: (data: any) => void }) => {
  const [value, setValue] = useState<string>(props.node.attrs.data);

  const [debouncedEditor] = useDebounce(props.node.attrs.data, 2000);

  useEffect(() => {
    setValue(props.node.attrs.data);
  }, [debouncedEditor]);

  return (
    <NodeViewWrapper className="react-component w-full text-center text-xl">
      <math-field
        style={{ cursor: "text", width: "100%" }}
        onInput={evt => props.updateAttributes({ data: (evt.target as unknown as { value: string }).value })}
      >
        {value}
      </math-field>
    </NodeViewWrapper>
  );
};

const MathEditorNode = Node.create({
  name: "math-editor",

  content: "inline*",

  group: "block",

  defining: true,

  addAttributes() {
    return {
      data: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "math-editor",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["math-editor", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathEditorComponent);
  },
});

export default MathEditorNode;
