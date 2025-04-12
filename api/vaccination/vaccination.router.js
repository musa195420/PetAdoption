const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const { create, findAll, findOne, update, remove, bulkInsert } = require("./vaccination.controller");

router.post("/", checkToken, create);
router.get("/", checkToken, findAll);
router.post("/id/", checkToken, findOne); // Changed to POST for find
router.patch("/", checkToken, update); // Update route doesn't change, but handling via body now
router.delete("/", checkToken, remove); // Delete route doesn't change, but handling via body now
router.post("/bulk", checkToken, bulkInsert);

module.exports = router;