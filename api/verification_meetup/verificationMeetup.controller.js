// controllers/verificationMeetup.controller.js
const {
  createVerificationMeetup,
  getVerificationMeetups,
  getVerificationMeetupById,
  updateVerificationMeetup,
  deleteVerificationMeetup,
} = require("./verificationMeetup.service");

module.exports = {
  /* ─────────────  C  ───────────── */
  create: async (req, res) => {
    try {
      const result = await createVerificationMeetup(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      res
        .status(500)
        .json({ status: 500, success: false, message: err.message });
    }
  },

  /* ─────────────  R  ───────────── */
  getAll: async (_req, res) => {
    try {
      const result = await getVerificationMeetups();
      if (!result || result.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "No verification records found.",
        });
      }
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res
        .status(500)
        .json({ status: 500, success: false, message: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { meetup_id } = req.body;
      const result = await getVerificationMeetupById(meetup_id);
      if (!result) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Verification record not found.",
        });
      }
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res
        .status(500)
        .json({ status: 500, success: false, message: err.message });
    }
  },

  /* ─────────────  U  ───────────── */
  update: async (req, res) => {
    try {
      const result = await updateVerificationMeetup(req.body);
      if (!result || result.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Verification record not found or update failed.",
        });
      }
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res
        .status(500)
        .json({ status: 500, success: false, message: err.message });
    }
  },

  /* ─────────────  D  ───────────── */
  remove: async (req, res) => {
    try {
      const { meetup_id } = req.body;
      const result = await deleteVerificationMeetup(meetup_id);
      if (!result || result.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Verification record not found or delete failed.",
        });
      }
      res
        .status(200)
        .json({ success: true, message: "Deleted", data: result });
    } catch (err) {
      res
        .status(500)
        .json({ status: 500, success: false, message: err.message });
    }
  },
};
