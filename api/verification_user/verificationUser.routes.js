const router  = require("express").Router();
const upload  = require("../../config/upload");      // Multer (memory storage)
const { checkToken } = require("../auth/token_validation");

const {
  createNewVerification,
  fetchAllVerifications,
  fetchVerificationByUserId,
  updateVerificationById,
  deleteVerificationById,
  uploadCnicPic,
  uploadProofOfResidence
} = require("./verificationUser.controller");

// ── IMAGE UPLOADS ──────────────────────────────────────────────────────
router.post("/upload-cnic",   checkToken, upload.single("image"), uploadCnicPic);
router.post("/upload-proof",  checkToken, upload.single("image"), uploadProofOfResidence);

// ── CRUD ───────────────────────────────────────────────────────────────
router.post("/",          checkToken, createNewVerification);         // CREATE
router.get("/",           checkToken, fetchAllVerifications);         // READ ALL
router.post("/id",        checkToken, fetchVerificationByUserId);     // READ single (body = { user_id })
router.patch("/update",   checkToken, updateVerificationById);        // UPDATE   (body = { verification_id, ... })
router.delete("/",        checkToken, deleteVerificationById);        // DELETE   (body = { verification_id })

module.exports = router;