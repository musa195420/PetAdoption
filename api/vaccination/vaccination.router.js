const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const { create, findAll, findOne, update, remove,bulkInsert } = require("./vaccination.controller");

router.post("/", checkToken,create);
router.get("/", checkToken, findAll);
router.get("/:id", checkToken, findOne);
router.patch("/", checkToken, update);
router.delete("/:id", checkToken, remove);
router.post("/bulk", checkToken, bulkInsert);

module.exports = router;
