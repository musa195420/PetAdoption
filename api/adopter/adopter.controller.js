const {
    createAdopterProfile,
    getAdopterById,
    getAllAdopters,
    updateAdopter,
    deleteAdopter,
  } = require("./adopter.service");
  
  module.exports = {
    createAdopter: (req, res) => {
      const body = req.body;
      createAdopterProfile(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error "+err });
        }
        return res.status(200).json({ success: 1, data: results });
      });
    },
  
    getAdopterById: (req, res) => {
      const id = req.params.id;
      getAdopterById(id, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error" });
        }
        if (!result) {
          return res.status(404).json({ success: 0, message: "Adopter not found" });
        }
        return res.status(200).json({ success: 1, data: result });
      });
    },
  
    getAllAdopters: (req, res) => {
      getAllAdopters((err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error" });
        }
        return res.status(200).json({ success: 1, data: results });
      });
    },
  
    updateAdopter: (req, res) => {
      const body = req.body;
      updateAdopter(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error" });
        }
        return res.status(200).json({ success: 1, message: "Adopter updated successfully" });
      });
    },
  
    deleteAdopter: (req, res) => {
      const data = req.body;
      deleteAdopter(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: 0, message: "Database Error" });
        }
        return res.status(200).json({ success: 1, message: "Adopter deleted successfully" });
      });
    },
  };
  