const router = require("express").Router();
const {
  createNewApplication,
  fetchAllApplications,
  fetchApplicationsByUserId,
  deleteApplication,updateApplication
} = require("./application.controller");

const { checkToken } = require("../auth/token_validation");

// POST: Create new application
router.post("/", checkToken, createNewApplication);

// GET: Fetch all applications
router.get("/", checkToken, fetchAllApplications);

// POST: Fetch applications by user_id
router.post("/user", checkToken, fetchApplicationsByUserId);

// DELETE: Delete application by ID
router.delete("/", checkToken, deleteApplication);

router.patch("/update", checkToken, updateApplication);

module.exports = router;