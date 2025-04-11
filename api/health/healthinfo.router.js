const router = require("express").Router();
const {createHealthInfo,getHealthInfoByPetId,getHealthInfoById,getAllHealthInfo,updateHealthInfo,deleteHealthInfo} = require("./healthinfo.controller");

router.post("/", createHealthInfo);
router.get("/", getAllHealthInfo);
router.get("/:id", getHealthInfoById);
router.patch("/", updateHealthInfo);
router.delete("/:id", deleteHealthInfo);
router.get("/pet/:pet_id",getHealthInfoByPetId);
module.exports = router;
