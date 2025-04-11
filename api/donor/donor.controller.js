const {
    createDonorProfile,
    getDonorById,
    getAllDonors,
    updateDonor,
    deleteDonor,
  } = require("./donor.service");
  
  module.exports = {
    createDonor: (req, res) => {
      const body = req.body;
      createDonorProfile(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error "+err });
        }
        return res.status(200).json({ success: 1, data: results });
      });
    },
  
    getDonorById: (req, res) => {
      
      const id = req.params.id;
      getDonorById(id, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error" });
        }
        if (!result) {
          return res.status(404).json({ success: 0, message: "Donor not found" });
        }
        return res.status(200).json({ success: 1, data: result });
      });
    },
  
    getAllDonors: (req, res) => {
      getAllDonors((err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error" });
        }
        return res.status(200).json({ success: 1, data: results });
      });
    },
  
    updateDonor: (req, res) => {
      const body = req.body;
      updateDonor(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error" });
        }
        return res.status(200).json({ success: 1, message: "Donor updated successfully" });
      });
    },
  
    deleteDonor: (req, res) => {
        console.log(`id => `);
      const data = req.body;
     
      deleteDonor(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error" });
        }
        return res.status(200).json({ success: 1, message: "Donor deleted successfully" });
      });
    },
  };
  