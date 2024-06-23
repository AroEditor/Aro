import Link from "next/link";
import { Logo } from "~/components/logo";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function Home() {
  return (
    <div className={"flex w-full flex-1 flex-col items-center bg-[url(/graph-paper.svg)] bg-center"}>
      <header className="fixed inset-x-0 top-0 z-50 w-full backdrop-blur-sm">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <Logo className={"w-24 text-primary"} />
            </a>
          </div>

          <div className="flex flex-1 justify-end gap-4">
            <Link
              className={cn(buttonVariants({ variant: "outline" }), "font-semibold shadow-none")}
              href={"/auth/signup"}
            >
              Get Started
            </Link>
            <Link
              className={cn(buttonVariants({ variant: "ghost" }), "bg-transparent font-semibold shadow-none")}
              href={"/auth/login"}
            >
              Log In
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative flex max-w-7xl flex-1 flex-col items-center justify-center gap-10 px-6 py-36 md:w-full md:flex-row lg:gap-12">
        <div className="flex max-w-xl flex-col justify-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full bg-primary/70 px-3 py-1 text-sm font-medium leading-6 text-primary-foreground">
              Document creation, simplified.
            </div>
          </div>
          <div className="space-y-4 text-center lg:space-y-8">
            <h1 className="font-serif text-5xl font-bold lg:text-6xl">The No-code Typesetting Editor</h1>
            <p className="mt-6 text-lg leading-8">Eliminating the need to code to compose documents and text.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link className={cn(buttonVariants({ size: "lg" }), "font-semibold")} href={"/auth/signup"}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
