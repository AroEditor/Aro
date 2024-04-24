"use server";

import Link from "next/link";
import SignupForm from "~/app/auth/signup/form";
import { Logo } from "~/components/logo";
import signUp from "~/lib/actions/signUp";

export default async function SignUp() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-8 px-8 py-8 sm:max-w-md">
      <Logo className={"w-48 text-primary"} />
      <h1 className={"text-2xl font-bold"}>Sign up for an account</h1>
      <SignupForm onSubmit={signUp} />
      <p className={"text-sm"}>
        Already have an account?{" "}
        <Link className={"text-primary underline"} href={"/auth/login"}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
