const router = require("express").Router();
const { createNewPet, fetchAllPets, fetchPetById,deletePetById,fetchPetsByDonorId,uploadPetImage } = require("./pet.controller");
const { addPetValidation } = require("../../validation/pet/pet.validation");
const { checkToken } = require("../auth/token_validation");
const upload = require("../../config/upload"); // already present in your user routes

router.post("/upload-image", checkToken, upload.single('image'), uploadPetImage);
router.post("/", checkToken, addPetValidation, createNewPet);
router.get("/", checkToken, fetchAllPets);
router.get("/id/", checkToken, fetchPetById);
router.delete("/", checkToken, deletePetById);
router.delete("/donor/", checkToken, fetchPetsByDonorId);

module.exports = router;