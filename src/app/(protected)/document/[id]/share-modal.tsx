import { useEffect, useState } from "react";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useParams } from "next/navigation";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { createClient } from "~/lib/supabase/client";
import { cn } from "~/lib/utils";
import DocumentSchema from "~/types/DocumentSchema";

export default function ShareModal() {
  const supabase = createClient();

  const { id } = useParams<{ id: string }>();

  const [emails, setEmails] = useState<string[] | null>(null);

  useEffect(() => {
    supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }: { data: DocumentSchema | null }) => {
        setEmails(data?.shared_emails ?? null);
      });
  }, [setEmails]);

  const addEmail = async (email: string) => {
    const newEmails = [...(emails || []), email];
    setEmails(newEmails);
    await supabase.from("documents").update({ shared_emails: newEmails }).eq("id", id).single();
  };

  const removeEmail = async (email: string) => {
    const newEmails = [...(emails || [])].filter(v => v !== email);
    setEmails(newEmails);
    await supabase.from("documents").update({ shared_emails: newEmails }).eq("id", id).single();
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Share document</DialogTitle>
        <DialogDescription>Enter the emails of colleagues you want to have access to this document.</DialogDescription>
      </DialogHeader>
      <div className={"w-full space-y-2"}>
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            if (email) {
              addEmail(email as string);
              e.currentTarget.reset();
            }
          }}
        >
          <Input placeholder={"Email address"} name={"email"} type={"email"} />
        </form>
        {(emails?.length || 0) > 0 && (
          <div className={"pt-2"}>
            <p className={"text-sm font-semibold opacity-50"}>Shared with</p>
            {emails?.map((email, i) => {
              return (
                <div
                  key={i}
                  className={cn("flex items-center justify-stretch gap-2 py-2", i !== emails.length - 1 && "border-b")}
                >
                  <p className={"flex-1"}>{email}</p>
                  <button onClick={() => removeEmail(email)}>
                    <XMarkIcon className={"w-6 text-red-500"} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DialogContent>
  );
}
