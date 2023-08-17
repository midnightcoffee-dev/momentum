import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PurchaseForm from "~/components/purchase-form";
import { enrollStudentInCourse, getCourseBySlug } from "~/data/course.server";
import { createPaymentIntent } from "~/data/payments.server";

const stripePromise = loadStripe(
  "pk_test_51NZQHHDdyh1tgyvF4srFVjYWg93q4ZFwhapaXB7IFuNFwBlgIwjZ8piO3oBKyUfoMREehUBR8UxDliV9hAhM92Ak00JPMOrREC"
);

export async function loader({ params }: LoaderArgs) {
  const slug = params.slug;
  const course = await getCourseBySlug(slug);
  const paymentIntent = await createPaymentIntent(course.price);

  return { course, paymentIntent };
}

export async function action({ request }: ActionArgs) {
  return await enrollStudentInCourse(request);
}

export default function CourseEnrollment() {
  const { paymentIntent } = useLoaderData();

  return (
    <div className="shadow-sm rounded-lg mx-auto max-w-full p-4">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentIntent.client_secret,
        }}
      >
        <PurchaseForm />
      </Elements>
    </div>
  );
}
