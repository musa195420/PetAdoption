// routes/verificationMeetup.router.js
const router = require("express").Router();
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("./verificationMeetup.controller");

router.post("/", create);      // create
router.get("/", getAll);       // list all
router.post("/id", getById);   // get by meetup_id in body
router.patch("/", update);     // update by meetup_id in body
router.delete("/", remove);    // delete by meetup_id in body

module.exports = router;
