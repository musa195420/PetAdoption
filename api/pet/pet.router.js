const router = require("express").Router();
const { createNewPet, fetchAllPets, fetchPetById,deletePetById } = require("./pet.controller");
const { addPetValidation } = require("../../validation/pet/pet.validation");
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, addPetValidation, createNewPet);
router.get("/", checkToken, fetchAllPets);
router.get("/:id", checkToken, fetchPetById);
router.delete("/:id", checkToken, deletePetById);

module.exports = router;