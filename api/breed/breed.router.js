const router = require("express").Router();
const {
  addBreed,
  getAllBreeds,
  getBreedById,
  updateBreed,
  deleteBreed,
  bulkBreedInsert,
  getBreedByAnimalId
} = require("./breed.controller");
router.post("/animal", getBreedByAnimalId);
router.post("/", addBreed);
router.get("/", getAllBreeds);
router.post("/id/", getBreedById); // get by ID using body
router.patch("/", updateBreed);
router.delete("/", deleteBreed); // delete using body
router.post("/bulk", bulkBreedInsert);

module.exports = router;
