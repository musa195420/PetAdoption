const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const { create, list, getById, update, bulk, deleteDisease, getByAnimalId } = require("./disease.controller");

router.post("/", checkToken, create);
router.get("/", checkToken, list);
router.post("/id", checkToken, getById); // Changed to POST for find
router.patch("/", checkToken, update); // Update route handles via body now
router.delete("/", checkToken, deleteDisease); // Delete route handles via body now
router.post("/bulk", checkToken, bulk);
router.post("/animal/", checkToken, getByAnimalId); // For getting diseases by animal ID

module.exports = router;