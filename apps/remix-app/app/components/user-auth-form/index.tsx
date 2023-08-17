"use client";
import { cn } from "~/lib/utils";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  useSearchParams,
  Form,
  useNavigation,
  useActionData,
} from "@remix-run/react";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigation = useNavigation();
  const [search] = useSearchParams();
  const validationErrors = useActionData();

  const authMode = search.get("mode") || "login";

  const submitBtnCaption =
    authMode === "login" ? "Sign in with Email" : "Sign up with Email";
  const isLoading = navigation.state !== "idle";

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form method="post" className="form">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              name="email"
              required
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="***********"
              type="password"
              name="password"
              minLength={7}
              disabled={isLoading}
            />
          </div>
          {validationErrors && (
            <ul>
              {Object.values(validationErrors as { [key: string]: string }).map(
                (error) => (
                  <li key={error}>{error}</li>
                )
              )}
            </ul>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {submitBtnCaption}
          </Button>
        </div>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.GitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
