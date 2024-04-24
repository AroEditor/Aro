"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import saveDocTitle from "~/lib/actions/saveDocTitle";

const formSchema = z.object({
  title: z.string().min(1, "Required."),
});

export default function TitleEditor({ title }: { title: string }) {
  const { id } = useParams<{ id: string }>();

  const [prevTitle, setPrevTitle] = useState(title);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
    },
  });

  const editedTitle = form.watch("title");

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setPrevTitle(data.title);
    setIsEditorOpen(false);

    await saveDocTitle({ id, title: data.title });
  }

  return (
    <Popover
      open={isEditorOpen}
      onOpenChange={open => {
        if (open) setIsEditorOpen(true);
        else {
          form.setValue("title", prevTitle);
          setIsEditorOpen(false);
        }
      }}
    >
      <PopoverTrigger asChild>
        <p onClick={() => setIsEditorOpen(true)} className={"font-bold"}>
          {editedTitle}
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
