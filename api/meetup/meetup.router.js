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
router.post("/id", getById);       // ID in body
router.patch("/", update);
router.delete("/", remove);             // ID in body
router.post("/user", getByUser);   // user_id in body
router.post("/pet", getByPet);     // pet_id in body

module.exports = router;
