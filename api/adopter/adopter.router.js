const router = require("express").Router();
const {
  createAdopter,
  getAdopterById,
  getAllAdopters,
  updateAdopter,
  deleteAdopter,
} = require("./adopter.controller");

const {addAdoptionValdation} = require("../../validation/adopter/adopter.validation");

const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken,addAdoptionValdation ,createAdopter);
router.get("/", checkToken, getAllAdopters);
router.get("/id/", checkToken, getAdopterById);
router.patch("/", checkToken, updateAdopter);
router.delete("/", checkToken, deleteAdopter);

module.exports = router;
