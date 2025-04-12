const router = require("express").Router();
const { create, getAll, getById, update, remove, getByAnimalId, bulkInsert } = require("./disability.controller");

router.post("/", create);
router.get("/", getAll);
router.post("/id", getById); // Using POST for the ID query
router.patch("/", update);
router.delete("/", remove);
router.get("/animal", getByAnimalId); // Get by animal_id from body
router.post("/bulk", bulkInsert);

module.exports = router;
