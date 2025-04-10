const router = require("express").Router();
const { addBreed, getAllBreeds, getBreedById, updateBreed, deleteBreed, bulkBreedInsert } = require("./breed.controller");

router.post("/", addBreed);
router.get("/", getAllBreeds);
router.get("/:id", getBreedById);
router.patch("/", updateBreed);
router.delete("/:id", deleteBreed);
router.post("/bulk", bulkBreedInsert);

module.exports = router;
