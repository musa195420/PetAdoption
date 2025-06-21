const supabase = require("../../config/database");
require('dotenv').config();                   // safeguard if called directly
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
 /**
   * Creates a Stripe PaymentIntent for the amount (rupees) & meetup.
   * @param {{ amount: number, meetup_id: string }} payload
   * @returns {Promise<{ client_secret: string, amount: number }>}
   */
  createPaymentIntent: async ({ amount, meetup_id }) => {
    // Stripe wants the smallest currency unit → paisa
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'pkr',
      metadata: { meetup_id },
    });

    return {
      client_secret: intent.client_secret,
      amount, // echo so the client can double‑check
    };
  },

  createPayment: async (data) => {
    try {
      const { data: result, error } = await supabase
        .from("payments")
        .insert([{
          amount: data.amount,
          user_id: data.user_id,
          meetup_id: data.meetup_id,
        }])
        .select("*");

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error("Failed to create payment: " + err.message);
    }
  },

  getAllPayments: async () => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*");

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error("Failed to fetch payments: " + err.message);
    }
  },

  getPaymentByUserId: async (userId) => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error("Failed to fetch payments for user: " + err.message);
    }
  },

  deletePaymentById: async (paymentId) => {
    try {
      const { error } = await supabase
        .from("payments")
        .delete()
        .eq("payment_id", paymentId);

      if (error) throw error;
      return true;
    } catch (err) {
      throw new Error("Failed to delete payment: " + err.message);
    }
  }
};
