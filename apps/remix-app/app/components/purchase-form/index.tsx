import { Form, useSubmit, useLoaderData } from "@remix-run/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";

export default function PurchaseForm() {
  const elements = useElements();
  const stripe = useStripe();
  const { course, paymentIntent } = useLoaderData();
  const submit = useSubmit();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (stripe && elements) {
      await stripe
        .confirmPayment({
          elements,
          redirect: "if_required",
          confirmParams: {
            return_url: `http://localhost:3000/course/test-course/enroll/success`,
          },
        })
        .then((result) => {
          submit(event.target, {
            method: "post",
            action: `/course/${course.slug.current}/enroll`,
          });
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="max-w-[400px]">
      <PaymentElement />

      <input
        type="hidden"
        id="stripePaymentIntentId"
        name="stripePaymentIntentId"
        className="hidden"
        value={paymentIntent.id}
      />

      <input
        type="hidden"
        id="sanityCourseId"
        name="sanityCourseId"
        className="hidden"
        value={course.id}
      />
      <Button type="submit" className="mt-10 w-full">
        Pay
      </Button>
    </Form>
  );
}
