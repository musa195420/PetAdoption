const router = require("express").Router();
const { createNewPet, fetchAllPets, fetchPetById,deletePetById,fetchPetsByDonorId } = require("./pet.controller");
const { addPetValidation } = require("../../validation/pet/pet.validation");
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, addPetValidation, createNewPet);
router.get("/", checkToken, fetchAllPets);
router.get("/id/", checkToken, fetchPetById);
router.delete("/", checkToken, deletePetById);
router.delete("/donor/", checkToken, fetchPetsByDonorId);

module.exports = router;