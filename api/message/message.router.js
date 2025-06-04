const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const {
    sendMessage,
    fetchAllMessages,
    fetchMessagesByUserId,
    fetchMessagesBetween,
    deleteMessage,
    updateMessage,
    fetchMessageInfoByUserId,
    
} = require("./message.controller");

router.post("/", checkToken, sendMessage);
router.get("/", checkToken, fetchAllMessages);

// IDs passed in body instead of params now:
router.post("/user", checkToken, fetchMessagesByUserId);
router.post("/info", checkToken, fetchMessageInfoByUserId);
router.post("/between", checkToken, fetchMessagesBetween);
router.delete("/", checkToken, deleteMessage);
router.patch("/", checkToken, updateMessage);

module.exports = router;
