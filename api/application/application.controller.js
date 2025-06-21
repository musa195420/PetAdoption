const {
  createApplication,
  getAllApplications,
  getApplicationByUserId,
  deleteApplicationById,updateApplicationById
} = require("./application.service");

module.exports = {
  createNewApplication: async (req, res) => {
    try {
      const { user_id, profession, reason, verification_status } = req.body;

      if (!user_id || !profession || !reason) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await createApplication({
        user_id,
        profession,
        reason,
        verification_status
      });

        res.status(201).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  fetchAllApplications: async (req, res) => {
    try {
      const result = await getAllApplications();
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  fetchApplicationsByUserId: async (req, res) => {
    try {
      const { user_id } = req.body;
      const result = await getApplicationByUserId(user_id);
      res.status(200).json({ success: true, data: result[0] });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteApplication: async (req, res) => {
    try {
      const { application_id } = req.body;
      const success = await deleteApplicationById(application_id);
       res
        .status(200)
        .json({ success: true, message: "Deleted", data: success });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateApplication: async (req, res) => {
  try {
    const { application_id, profession, reason, verification_status } = req.body;

    if (!application_id) {
      return res.status(400).json({ message: "application_id is required" });
    }

    const result = await updateApplicationById(application_id, {
      profession,
      reason,
      verification_status
    });

     res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
};
