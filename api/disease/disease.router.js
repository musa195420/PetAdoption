const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const {create,list,getById,update,bulk,deleteDisease,getByAnimalId} = require("./disease.controller");

router.post("/", checkToken,create);
router.get("/", checkToken, list);
router.get("/:id", checkToken, getById);
router.patch("/", checkToken, update);
router.delete("/:id", checkToken, deleteDisease);
router.post("/bulk", checkToken, bulk);
router.get("/animal/:animal_id",getByAnimalId);
module.exports = router;
