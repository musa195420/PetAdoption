const router = require("express").Router();
const {create,getAll,getById,update,remove,getByAnimalId,bulkInsert} = require("./disability.controller");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.patch("/", update);
router.delete("/", remove);
router.get("/animal/:animal_id", getByAnimalId);
router.post("/bulk", bulkInsert);

module.exports = router;
