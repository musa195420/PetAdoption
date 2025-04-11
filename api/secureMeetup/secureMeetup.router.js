const router = require("express").Router();
const {create,getAll,getById,update,deleteId} = require("./secureMeetup.controller");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.patch("/", update);
router.delete("/:id", deleteId);

module.exports = router;
