import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { retrievePaymentIntent } from "~/data/payments.server";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("payment_intent");

  return await retrievePaymentIntent(id);
}

export default function CourseEnrollmentSuccess() {
  const paymentIntent = useLoaderData();
  return (
    <div className="max-w-lg mx-auto">
      <pre>{JSON.stringify(paymentIntent, null, 2)}</pre>
    </div>
  );
}
