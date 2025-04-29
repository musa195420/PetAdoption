const router = require("express").Router();
const { create, getAll, getById, update, deleteId,uploadSecureImages } = require("./secureMeetup.controller");
const upload = require("../../config/upload");
router.post("/", create); // Create
router.get("/", getAll); // Get all meetups
router.get("/id", getById); // Get by id, now using POST with id in body
router.patch("/", update); // Update
router.delete("/", deleteId); // Delete, now using POST with id in body
router.post('/uploadimages', upload.fields([
    { name: 'proof_pic', maxCount: 1 },
    { name: 'adopter_id_front', maxCount: 1 },
    { name: 'adopter_id_back', maxCount: 1 },
  ]), uploadSecureImages);
module.exports = router;
