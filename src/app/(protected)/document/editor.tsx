"use client";

import { Highlight } from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Commands from "~/lib/editor/suggestions/commands";
import getSuggestionItems from "~/lib/editor/suggestions/items";
import renderItems from "~/lib/editor/suggestions/renderItems";

import "./editor.scss";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "h-full p-4 !font-serif mx-auto focus:outline-none !max-w-full",
      },
    },
    content: ``,
  });

  return <EditorContent editor={editor} className={"h-full"} />;
}
