// import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { destroyUserSession } from "../data/auth.server";

export async function loader({ request }: ActionArgs) {
  return await destroyUserSession(request);
}
