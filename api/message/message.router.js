const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const {
    sendMessage,
    fetchAllMessages,
    fetchMessagesByUserId,
    fetchMessagesBetween,
    deleteMessage,
    updateMessage,
} = require("./message.controller");

router.post("/", checkToken, sendMessage);
router.get("/", checkToken, fetchAllMessages);

// IDs passed in body instead of params now:
router.get("/user", checkToken, fetchMessagesByUserId);
router.get("/between", checkToken, fetchMessagesBetween);
router.delete("/", checkToken, deleteMessage);
router.patch("/", checkToken, updateMessage);

module.exports = router;
