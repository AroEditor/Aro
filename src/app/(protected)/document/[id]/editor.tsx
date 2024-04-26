"use client";

import { useEffect, useMemo, useState } from "react";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { Highlight } from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useDebounce } from "use-debounce";
import * as Y from "yjs";
import { create } from "zustand";
import { Skeleton } from "~/components/ui/skeleton";
import saveDocContent from "~/lib/actions/saveDocContent";
import MathInline from "~/lib/editor/inline-equations";
import CustomComponentExtension from "~/lib/editor/math-editor";
import Commands from "~/lib/editor/suggestions/commands";
import getSuggestionItems from "~/lib/editor/suggestions/items";
import renderItems from "~/lib/editor/suggestions/renderItems";
import { TrailingNode } from "~/lib/editor/trailing-node";
import ProfileSchema from "~/types/ProfileSchema";

import "./editor.scss";

interface EditorState {
  editor: ReturnType<typeof useEditor> | null;
  setEditor: (editor: ReturnType<typeof useEditor> | null) => void;
}

export const useEditorStore = create<EditorState>(set => ({
  editor: null, // Initial state for editor

  // Method to update the editor state
  setEditor: editor => set({ editor }),
}));

export default function Editor({ id, content, profile }: { id: string; content: any; profile: ProfileSchema }) {
  const doc = useMemo(() => new Y.Doc({ guid: id }), []);

  const provider = useMemo(() => {
    return new TiptapCollabProvider({
      name: "documents." + id,
      appId: "ok0qpy94",
      document: doc,
      token: process.env.NEXT_PUBLIC_TIPTAP_KEY,
    });
  }, []);

  const [status, setStatus] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: doc,
      }),
      CollaborationCursor.configure({
        provider,
      }),
      Highlight,
      Typography,
      CustomComponentExtension,
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
      MathInline,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: 'Type "/" to open command menu...',
      }),
      TrailingNode,
    ],
    editorProps: {
      attributes: {
        class:
          "h-full p-16 lg:px-32 xl:px-56 !font-serif mx-auto focus:outline-none !max-w-full bg-white 2xl:border-x border-dashed",
      },
    },
  });

  useEffect(() => {
    const name = profile.name;

    editor?.chain().focus().updateUser({ name, id: profile.id, clientId: profile.id }).run();
  }, [editor]);

  useEffect(() => {
    // Update status changes
    provider.on("status", (event: { status: any }) => {
      if (event.status === "connected") setStatus(true);
    });
  }, []);

  const { setEditor } = useEditorStore();

  useEffect(() => {
    if (!editor) return;
    (editor as any).refresh = Symbol();
    setEditor(editor);
  }, [editor?.state]);

  const _content = editor?.getJSON();
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 500);

  useEffect(() => {
    if (editor) saveDocContent({ id, content: structuredClone(_content!) });
  }, [debouncedEditor]);

  if (!editor || !status) {
    return (
      <div
        className={
          "mx-auto h-full !max-w-full space-y-2 border-dashed bg-white p-16 !font-serif focus:outline-none lg:px-32 xl:px-56 2xl:border-x"
        }
      >
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-[75%]" />
        </div>
      </div>
    );
  }

  return (
    <article>
      <EditorContent editor={editor} className={"h-full"} />
    </article>
  );
}
