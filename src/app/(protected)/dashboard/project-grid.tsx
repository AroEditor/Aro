"use client";

import { useState } from "react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import ProjectGridItem from "~/app/(protected)/dashboard/project-grid-item";
import { buttonVariants } from "~/components/ui/button";
import { createClient } from "~/lib/supabase/client";
import { cn } from "~/lib/utils";
import DocumentSchema from "~/types/DocumentSchema";

dayjs.extend(relativeTime);

export default function ProjectGrid({
  documents: initialDocuments,
  includePlus,
}: {
  documents: DocumentSchema[];
  includePlus?: boolean;
}) {
  const [documents, setDocuments] = useState<DocumentSchema[]>(initialDocuments);

  const supabase = createClient(); // Initialize the client-side Supabase instance

  const handleDelete = async (documentId: string) => {
    try {
      const { error } = await supabase.from("documents").delete().eq("id", documentId);

      if (error) throw new Error(error.message);

      setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== documentId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className={"grid grid-cols-3 items-start justify-center gap-6 p-6"}>
      {includePlus && (
        <Link href={"/document"} className={cn(buttonVariants({ variant: "outline" }), "flex h-64 w-full bg-white")}>
          <PlusCircleIcon className={"w-16 text-muted-foreground"} />
        </Link>
      )}
      {documents.map((document, index) => (
        <ProjectGridItem key={index} document={document} onDelete={handleDelete} />
      ))}
    </div>
  );
}
