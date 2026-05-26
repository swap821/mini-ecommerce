import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { cart } = req.body;

    // Transform our frontend cart items into the format Stripe expects
    const lineItems = cart.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl], // Shows the product image on the Stripe page!
        },
        unit_amount: Math.round(item.price * 100), // Stripe calculates in cents, so $129.99 becomes 12999
      },
      quantity: item.quantity,
    }));

    // Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
    });

    // Send the secure Stripe URL back to the frontend
    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

export default router;