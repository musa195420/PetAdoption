const router = require("express").Router();
const {
    createHealthInfo,
    getAllHealthInfo,
    getHealthInfoById,
    updateHealthInfo,
    deleteHealthInfo,
    getHealthInfoByPetId
} = require("./healthinfo.controller");

// Routes
router.post("/", createHealthInfo);
router.get("/", getAllHealthInfo);
router.post("/get", getHealthInfoById);         // { health_id }
router.patch("/", updateHealthInfo);            // { health_id, fields... }
router.delete("/", deleteHealthInfo);           // { health_id }
router.get("/pet", getHealthInfoByPetId);      // { pet_id }

module.exports = router;