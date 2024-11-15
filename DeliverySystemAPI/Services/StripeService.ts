const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createStripeSession = async (
  amount: number,
  userEmail: string,
  productName: string,
  userId: number
) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url:
      "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: `http://localhost:5173/user-dashboard/${userId}`,
    customer_email: userEmail,
    line_items: [
      {
        price_data: {
          currency: "CAD",
          product_data: {
            name: productName,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
  });
  return session.url;
};

export const retrieveSession = async (sessionId: string) => {
  return await stripe.checkout.sessions.retrieve(sessionId);
};

export const retrievePaymentMethod = async (paymentIntentId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return await stripe.paymentMethods.retrieve(paymentIntent.payment_method);
};
