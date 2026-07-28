import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// 1. Create Checkout Session Endpoint
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { cart } = req.body;

    const lineItems = cart.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}?success=true`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// 2. Production Stripe Webhook Listener (Handles events asynchronously)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      // In development without webhook secret, attempt raw JSON parse
      event = req.body;
    } else {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle specific event types
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Payment successful for Session ID: ${session.id}`);
      // TODO: Decrease product inventory in MongoDB, send confirmation email
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error(`Payment failed for Payment Intent: ${paymentIntent.id}`);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
});

export default router;