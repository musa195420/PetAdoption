const {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  addAnimalsBulk
} = require("./animal.service");

module.exports = {
  addAnimal: async (req, res) => {
    try {
      const results = await createAnimal(req.body);
      return res.status(200).json({
        success: 200,
        message: "Animal type added",
        data: results
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: 400, message: "DB error" });
    }
  },

  getAnimals: async (req, res) => {
    try {
      const results = await getAllAnimals();
      return res.status(200).json({ success: 200, data: results });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: 400, message: "DB error" });
    }
  },

  getAnimal: async (req, res) => {
    const id = req.body.animal_id;
    try {
      const result = await getAnimalById(id);
      if (!result) {
        return res.status(404).json({ success: 400, message: "Animal not found" });
      }
      return res.status(200).json({ success: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: 400, message: "DB error" });
    }
  },

  editAnimal: async (req, res) => {
    try {
      const results = await updateAnimal(req.body);
      return res.status(200).json({
        success: 200,
        message: "Animal updated",
        data: results
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: 400, message: "DB error" });
    }
  },

  removeAnimal: async (req, res) => {
    const animal_id = req.body.animal_id;
    try {
      const results = await deleteAnimal(animal_id);
      return res.status(200).json({
        success: 200,
        message: "Animal deleted",
        data: results
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: 400, message: "DB error" });
    }
  },

  addAnimalsBulk: async (req, res) => {
    const { animals } = req.body;
    try {
      const results = await addAnimalsBulk(animals);
      return res.status(201).json({
        success: 200,
        message: "Animals added in bulk",
        data: results
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        success: 400,
        message: err.message || "Failed to add animals"
      });
    }
  }
};
