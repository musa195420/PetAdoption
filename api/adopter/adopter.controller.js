const {
  createAdopterProfile,
  getAdopterById,
  getAllAdopters,
  updateAdopter,
  deleteAdopter,
} = require("./adopter.service");

module.exports = {
  createAdopter: async (req, res) => {
    const body = req.body;
    try {
      const results = await createAdopterProfile(body);
      return res.status(200).json({ success:true,status: 200, data: results });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error " + err.message });
    }
  },

  getAdopterById: async (req, res) => {
    const id = req.body.adopter_id;
    try {
      const result = await getAdopterById(id);
      if (!result) {
        return res.status(404).json({ success:false,status: 400, message: "Adopter not found" });
      }
      return res.status(200).json({ success:true,status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error " + err.message });
    }
  },

  getAllAdopters: async (req, res) => {
    try {
      const results = await getAllAdopters();
      return res.status(200).json({ success:true,status: 200, data: results });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error " + err.message });
    }
  },

  updateAdopter: async (req, res) => {
    const body = req.body;
    try {
      await updateAdopter(body);
      return res.status(200).json({ success:true,status: 200, message: "Adopter updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error " + err.message });
    }
  },

  deleteAdopter: async (req, res) => {
    const { adopter_id } = req.body;
    try {
      await deleteAdopter(adopter_id);
      return res.status(200).json({ success:true,status: 200,  message: "Adopter deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error " + err.message });
    }
  },
};
