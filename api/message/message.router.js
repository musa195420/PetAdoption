const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const {sendMessage,fetchAllMessages,fetchMessagesByUserId,fetchMessagesBetween,deleteMessage,updateMessage} = require("./message.controller");

router.post("/", checkToken,sendMessage);
router.get("/", checkToken, fetchAllMessages);
router.get("/user/:user_id" , checkToken, fetchMessagesByUserId);
router.get("/between/:sender_id/:receiver_id", checkToken, fetchMessagesBetween);
router.delete("/:message_id", checkToken, deleteMessage);
router.patch("/", checkToken, updateMessage);

module.exports = router;
