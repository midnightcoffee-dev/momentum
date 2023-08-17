import { Link, useSearchParams } from "@remix-run/react";
import { UserAuthForm } from "~/components/user-auth-form";
import { validateCredentials } from "~/data/validation.server";
import { signup, login } from "~/data/auth.server";
import type { ActionArgs } from "@remix-run/node";

export default function MarketingAuthPage() {
  const [search] = useSearchParams();

  const authMode = search.get("mode") || "login";
  const toggleHeaderCaption =
    authMode === "login" ? "Sign in" : "Create an account";
  const toggleSubtitleCaption =
    authMode === "login"
      ? "Enter your email below to sign in"
      : "Enter your email below to create your account";
  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:text-white text-black border-r lg:flex">
          <div className="absolute inset-0 dark:bg-zinc-900 bg-zinc-100" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Momentum
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This course platform has transformed my coding skills.
                It's accelerated my progress and helped me understand complex
                software engineering concepts more efficiently than any other
                resources I've used. I'm now confident in my ability to tackle
                real-world programming challenges.&rdquo;
              </p>
              <footer className="text-sm">
                John Doe, Aspiring Software Engineer
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {toggleHeaderCaption}
              </h1>
              <p className="text-sm text-muted-foreground">
                {toggleSubtitleCaption}
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

type Credentials = {
  email: string;
  password: string;
};

export async function action({ request }: ActionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials: Credentials = Object.fromEntries(formData) as Credentials;

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }
  try {
    if (authMode === "login") {
      return await login(credentials);
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if (error instanceof Error) {
      if ("status" in error && error.status === 422) {
        return {
          credentials: error.message,
        };
      }
    }
  }
}
