"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthResponse } from "@supabase/auth-js/src/lib/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAsyncFn } from "react-use";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirm: z.string().min(6, {
      message: "Passwords must match.",
    }),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default function SignupForm({
  onSubmit,
}: {
  onSubmit: (
    data: z.infer<typeof formSchema>
  ) => Promise<{ success: boolean; data: AuthResponse["data"]; error?: string }>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const [handleSubmitState, handleSubmitFn] = useAsyncFn(
    async (data: z.infer<typeof formSchema>) => {
      const res = await onSubmit(data);

      if (res.success) {
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: res.error,
        });
      }
    },
    [onSubmit, router, toast]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitFn)}
        className="flex w-full flex-col justify-center gap-4 text-foreground animate-in"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={"submit"} className={"mt-2"} disabled={handleSubmitState.loading}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
