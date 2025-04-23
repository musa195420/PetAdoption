const {
  createDonorProfile,
  getDonorById,
  getAllDonors,
  updateDonor,
  deleteDonor,
} = require("./donor.service");

module.exports = {
  createDonor: async (req, res) => {
    const body = req.body;
    try {
      const result = await createDonorProfile(body);
      return res.status(200).json({ success:true,status: 200,  data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error " + err });
    }
  },

  getDonorById: async (req, res) => {
    let donorId = req.body.donor_id;
    if (!donorId) {
      donorId = req.body.user_id;
    }
    try {
      const result = await getDonorById(donorId);
      if (!result) {
        return res.status(404).json({ success:false,status: 400, message: "Donor not found" });
      }
      return res.status(200).json({ success:true,status: 200,  data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error" });
    }
  },

  getAllDonors: async (req, res) => {
    try {
      const results = await getAllDonors();
      return res.status(200).json({ success:true,status: 200,  data: results });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error" });
    }
  },

  updateDonor: async (req, res) => {
    let data = req.body;
  
    try {
      const result = await updateDonor(data);
      return res.status(200).json({ success:true,status: 200,  message: "Donor updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error"+err });
    }
  },

  deleteDonor: async (req, res) => {
     
    let donorId = req.body.donor_id;
    if (!donorId) {
      donorId = req.body.user_id;
    }
   
    try {
      const result = await deleteDonor(donorId);
      return res.status(200).json({ success:true,status: 200,  message: "Donor deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success:false,status: 400, message: "Database Error"+err });
    }
  },
};
