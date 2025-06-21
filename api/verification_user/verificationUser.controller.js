// controllers/verificationUser.controller.js
const {
  createVerificationUser,
  getAllVerificationUsers,
  getVerificationUserByUserId,
  updateVerificationUser,
  deleteVerificationUser
} = require("./verificationUser.service");

module.exports = {
  /* ------------------------------------------------------------------ */
  /*  CREATE                                                            */
  /* ------------------------------------------------------------------ */
  createNewVerification: async (req, res) => {
    try {
      const result = await createVerificationUser(req.body);
      return res.status(201).json({
        success: true,
        data:    result,
        message: "Verification created successfully"
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  },

  /* ------------------------------------------------------------------ */
  /*  READ                                                              */
  /* ------------------------------------------------------------------ */
  fetchAllVerifications: async (_req, res) => {
    try {
      const results = await getAllVerificationUsers();
      return res.status(200).json({ success: true, data: results });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

 fetchVerificationByUserId: async (req, res) => {
  try {
    const { user_id } = req.body;                   // <── body not params
    const data        = await getVerificationUserByUserId(user_id);

    if (!data) {
      return res.status(404).json({ success:false, message:"Verification not found" });
    }
    return res.status(200).json({ success:true, data });
  } catch (err) {
    return res.status(500).json({ success:false, message: err.message });
  }
},
  /* ------------------------------------------------------------------ */
  /*  UPDATE                                                            */
  /* ------------------------------------------------------------------ */
  updateVerificationById: async (req, res) => {
  try {
    const { verification_id, ...fields } = req.body;
    const data = await updateVerificationUser(verification_id, fields);
    return res.status(200).json({ success:true, data, message:"Updated successfully" });
  } catch (err) {
    return res.status(500).json({ success:false, message: err.message });
  }
},

  /* ------------------------------------------------------------------ */
  /*  DELETE  (optional)                                                */
  /* ------------------------------------------------------------------ */
  deleteVerificationById: async (req, res) => {
  try {
    const { verification_id } = req.body;
    await deleteVerificationUser(verification_id);
    return res.status(200).json({ success:true, message:"Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success:false, message: err.message });
  }
},
  uploadCnicPic: async (req, res) => {
  try {
    const { user_id } = req.body;       // <── comes from body now
    const file        = req.file;       // Multer provides Buffer + meta

    if (!user_id || !file) {
      return res.status(400).json({ success:false, message:"user_id and image are required" });
    }

    const url = await verificationService.uploadCnicPicService(file, user_id);
    return res.status(200).json({ success:true, url });
  } catch (err) {
    return res.status(500).json({ success:false, message: err.message });
  }
},

/* UPLOAD PROOF -------------------------------------------------------- */
uploadProofOfResidence: async (req, res) => {
  try {
    const { user_id } = req.body;
    const file        = req.file;

    if (!user_id || !file) {
      return res.status(400).json({ success:false, message:"user_id and image are required" });
    }

    const url = await verificationService.uploadProofOfResidenceService(file, user_id);
    return res.status(200).json({ success:true, url });
  } catch (err) {
    return res.status(500).json({ success:false, message: err.message });
  }
},
};
