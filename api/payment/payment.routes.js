const router = require("express").Router();
const {
  createNewPayment,
  fetchAllPayments,
  fetchPaymentsByUserId,
  deletePayment,createIntent
} = require("./payment.controller");

const { checkToken } = require("../auth/token_validation");
router.post('/intent', createIntent);
// POST: Create a payment
router.post("/", checkToken, createNewPayment);

// GET: All payments
router.get("/", checkToken, fetchAllPayments);

// POST: Payments for a specific user
router.post("/user", checkToken, fetchPaymentsByUserId);

// DELETE: Remove a payment
router.delete("/", checkToken, deletePayment);

module.exports = router;
