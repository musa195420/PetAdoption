const {
  createPayment,
  getAllPayments,
  getPaymentByUserId,
  deletePaymentById,createPaymentIntent
} = require("./payment.service");

module.exports = {

  createIntent: async (req, res) => {
    try {
      const { amount, meetup_id } = req.body;
      if (!amount || !meetup_id)
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'amount & meetup_id are required',
        });

      const data = await createPaymentIntent({ amount, meetup_id });
      return res.status(201).json({ success: true, data });
    } catch (err) {
      console.error('[Stripe]', err);
      return res.status(500).json({
        status: 500,
        success: false,
        message: err.message,
      });
    }
  },
  createNewPayment: async (req, res) => {
    try {
      const { amount, user_id, meetup_id } = req.body;
      if (!amount || !user_id || !meetup_id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "All fields are required",
          data: null,
        });
      }

      const result = await createPayment({ amount, user_id, meetup_id });
      res.status(201).json({
        success: true,
        status: 201,
        message: "Payment created successfully",
        data: result[0],
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        message: err.message,
        data: null,
      });
    }
  },

  fetchAllPayments: async (req, res) => {
    try {
      const result = await getAllPayments();
      res.status(200).json({
        success: true,
        status: 200,
        message: "All payments fetched successfully",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        message: err.message,
        data: null,
      });
    }
  },

  fetchPaymentsByUserId: async (req, res) => {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "user_id is required",
          data: null,
        });
      }

      const result = await getPaymentByUserId(user_id);
      res.status(200).json({
        success: true,
        status: 200,
        message: "Payments fetched for user",
        data: result[0],
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        message: err.message,
        data: null,
      });
    }
  },

  deletePayment: async (req, res) => {
    try {
      const { payment_id } = req.body;
      if (!payment_id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: "payment_id is required",
          data: null,
        });
      }

      const result = await deletePaymentById(payment_id);
      res.status(200).json({
        success: true,
        status: 200,
        message: "Deleted",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        status: 500,
        message: err.message,
        data: null,
      });
    }
  }
};
