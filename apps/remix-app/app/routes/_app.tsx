import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import AppNavbar from "~/components/app-navbar";
import { requireUserSession } from "~/data/auth.server";

export async function loader({ request }: LoaderArgs) {
  await requireUserSession(request);

  return json(null, {
    headers: {
      "Cache-Control": "max-age=3",
    },
  });
}

export default function AppIndex() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}
