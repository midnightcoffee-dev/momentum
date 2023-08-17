import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//update to accept different payments and create an enrollment.
export async function createPaymentIntent(price) {
  return await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
}

export async function retrievePaymentIntent(id) {
  return await stripe.paymentIntents.retrieve(id);
}
