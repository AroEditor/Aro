"use server";

import Link from "next/link";
import signIn from "~/app/auth/login/action";
import LoginForm from "~/app/auth/login/form";
import { Logo } from "~/components/logo";

export default async function SignUp() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-8 px-8 py-8 sm:max-w-md">
      <Logo className={"w-48 text-primary"} />
      <h1 className={"text-2xl font-bold"}>Sign in to your account</h1>
      <LoginForm onSubmit={signIn} />
      <p className={"text-sm"}>
        Don't have an account?{" "}
        <Link className={"text-primary underline"} href={"/auth/signup"}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
