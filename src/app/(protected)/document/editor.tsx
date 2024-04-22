"use client";

import { Highlight } from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { Typography } from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      // Commands.configure({
      //   suggestion: {
      //     items: getSuggestionItems,
      //     render: renderItems,
      //   },
      // }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
    ],
    editorProps: {
      attributes: {
        class:
          "h-full p-4 !font-serif prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none !max-w-full",
      },
    },
    content: ``,
  });

  return <EditorContent editor={editor} className={"h-full"} />;
}
