const {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  addAnimalsBulk
} = require("./animal.service");

module.exports = {
  addAnimal: (req, res) => {
    createAnimal(req.body, (err, results) => {
      if (err) return res.status(500).json({ success: 0, message: "DB error" });
      return res.status(200).json({ success: 1, message: "Animal type added", data: results });
    });
  },

  getAnimals: (req, res) => {
    getAllAnimals((err, results) => {
      if (err) return res.status(500).json({ success: 0, message: "DB error" });
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getAnimal: (req, res) => {
    const id = req.params.id;
    getAnimalById(id, (err, result) => {
      if (err) return res.status(500).json({ success: 0, message: "DB error" });
      if (!result) return res.status(404).json({ success: 0, message: "Animal not found" });
      return res.status(200).json({ success: 1, data: result });
    });
  },

  editAnimal: (req, res) => {
    updateAnimal(req.body, (err, results) => {
      if (err) return res.status(500).json({ success: 0, message: "DB error" });
      return res.status(200).json({ success: 1, message: "Animal updated", data: results });
    });
  },

  removeAnimal: (req, res) => {
    const id = req.params.id;
    deleteAnimal(id, (err, results) => {
      if (err) return res.status(500).json({ success: 0, message: "DB error" });
      return res.status(200).json({ success: 1, message: "Animal deleted", data: results });
    });
  },
  addAnimalsBulk : (req, res) => {
    const { animals } = req.body;
  
    addAnimalsBulk(animals, (err, results) => {
      if (err) return res.status(400).json({ success: 0, message: err });
      return res.status(201).json({ success: 1, message: "Animals added in bulk", data: results });
    });
  }


};
