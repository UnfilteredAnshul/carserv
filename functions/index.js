const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");
const stripeApiKey =
  process.env.STRIPE_API_KEY ||
  (functions.config().stripe && functions.config().stripe.secret);

if (!stripeApiKey) {
  throw new Error(
    "Stripe secret key not configured. Set STRIPE_API_KEY or firebase config stripe.secret"
  );
}

const stripe = require("stripe")(stripeApiKey);


const app = express();
app.use(cors({
  origin: true,
}));
app.use(express.json());

app.post("/payments/create", async (req, res) => {
  try {
    const {amount, shipping} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "inr",
    });

    res
        .status(200)
        .send(paymentIntent.client_secret);
  } catch (err) {
    res
        .status(500)
        .json({
          statusCode: 500,
          message: err.message,
        });
  }
});

app.get("*", (req, res) => {
  res
      .status(404)
      .send("404, Not Found.");
});

exports.api = functions.https.onRequest(app);
