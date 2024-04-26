import Link from "next/link";
import { useEditorStore } from "~/app/(protected)/document/[id]/editor";
import { Button, buttonVariants } from "~/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import convertNodeToLatex from "~/lib/convert-node-to-latex";
import createOverleafUrl from "~/lib/create-overleaf-url";
import downloadLatexFile from "~/lib/download-latex-file";
import { cn } from "~/lib/utils";

export default function ExportModal() {
  const { editor } = useEditorStore();

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Export document</DialogTitle>
        <DialogDescription>Choose the export destination for your document.</DialogDescription>
      </DialogHeader>
      <div className={"w-full space-y-2"}>
        <Link
          href={createOverleafUrl(convertNodeToLatex((editor?.getJSON() || {}) as any))}
          target={"_blank"}
          className={cn(buttonVariants(), "w-full bg-green-700 hover:bg-green-800")}
        >
          Export to Overleaf
        </Link>
        <Button
          className={"w-full bg-gray-700 text-primary-foreground hover:bg-gray-800"}
          onClick={() => downloadLatexFile((editor?.getJSON() || {}) as any)}
        >
          Download .tex file
        </Button>
      </div>
    </DialogContent>
  );
}
