const router = require("express").Router();
const {
    create,
    getAll,
    getById,
    update,
    remove,
    getByUser,
    getByPet,
} = require("./meetup.controller");

router.post("/", create);
router.get("/", getAll);
router.get("/id", getById);       // ID in body
router.patch("/", update);
router.delete("/", remove);             // ID in body
router.get("/user", getByUser);   // user_id in body
router.get("/pet", getByPet);     // pet_id in body

module.exports = router;
