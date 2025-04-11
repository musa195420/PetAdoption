const router = require("express").Router();
const {create,getAll,getById,update,remove,getByUser,getByPet} = require("./meetup.controller");

router.post("/", create);
router.get("/", getAll);
router.get("/:meetup_id", getById);
router.patch("/", update);
router.delete("/:meetup_id", remove);
router.get("/user/:user_id", getByUser);
router.get("/pet/:pet_id", getByPet);

module.exports = router;
