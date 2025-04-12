const router = require("express").Router();
const {
  addAnimal,
  getAnimals,
  getAnimal,
  editAnimal,
  removeAnimal,
  addAnimalsBulk
} = require("./animal.controller");

const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, addAnimal);
router.get("/", checkToken, getAnimals);
router.get("/id/", checkToken, getAnimal);
router.patch("/", checkToken, editAnimal);
router.delete("/", checkToken, removeAnimal);
router.post("/bulk", checkToken, addAnimalsBulk);

module.exports = router;
