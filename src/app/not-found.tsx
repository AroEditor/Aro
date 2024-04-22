import Link from "next/link";
import { Logo } from "~/components/logo";
import { buttonVariants } from "~/components/ui/button";

export default async function NotFound() {
  return (
    <div className={"flex flex-1 flex-col items-center py-6"}>
      <Logo className={"w-24 text-primary"} />
      <div className={"flex flex-1 items-center justify-center"}>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
            <div className="mx-auto max-w-screen-sm space-y-8 text-center">
              <h1 className="text-primary-600 text-7xl font-extrabold tracking-tight">404</h1>
              <p className="text-3xl tracking-tight text-gray-900">Whoops! This page doesn’t exist.</p>
              <Link href={"/"} className={buttonVariants()}>
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
