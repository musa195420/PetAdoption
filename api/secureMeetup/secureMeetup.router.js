const router = require("express").Router();
const { create, getAll, getById, update, deleteId } = require("./secureMeetup.controller");

router.post("/", create); // Create
router.get("/", getAll); // Get all meetups
router.get("/id", getById); // Get by id, now using POST with id in body
router.patch("/", update); // Update
router.delete("/", deleteId); // Delete, now using POST with id in body

module.exports = router;
