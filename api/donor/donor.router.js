const router = require("express").Router();
const {
  createDonor,
  getDonorById,
  getAllDonors,
  updateDonor,
  deleteDonor,
} = require("./donor.controller");

const {addDonorValdation} = require("../../validation/donor/donor.validation");

const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken,addDonorValdation ,createDonor);
router.get("/", checkToken, getAllDonors);
router.get("/id/", checkToken, getDonorById);
router.patch("/", checkToken, updateDonor);
router.delete("/", checkToken, deleteDonor);

module.exports = router;
