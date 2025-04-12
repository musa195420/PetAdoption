const {
    createBreed,
    getBreeds,
    getBreedById,
    updateBreed,
    deleteBreed,
    bulkInsertBreeds,
  } = require("./breed.service");
  
  module.exports = {
    addBreed: async (req, res) => {
      try {
        const result = await createBreed(req.body);
        res.status(200).json({ success: 200, data: result });
      } catch (err) {
        res.status(500).json({ success: 400, message: err.message });
      }
    },
  
    getAllBreeds: async (req, res) => {
      try {
        const result = await getBreeds();
        res.status(200).json({ success: 200, data: result });
      } catch (err) {
        res.status(500).json({ success: 400, message: err.message });
      }
    },
  
    getBreedById: async (req, res) => {
      try {
        const { breed_id } = req.body;
        const result = await getBreedById(breed_id);
        res.status(200).json({ success: 200, data: result });
      } catch (err) {
        res.status(500).json({ success: 400, message: err.message });
      }
    },
  
    updateBreed: async (req, res) => {
      try {
        const result = await updateBreed(req.body);
        res.status(200).json({ success: 200, message: "Breed updated successfully", data: result });
      } catch (err) {
        res.status(500).json({ success: 400, message: err.message });
      }
    },
  
    deleteBreed: async (req, res) => {
      try {
        const { breed_id } = req.body;
        const result = await deleteBreed(breed_id);
        res.status(200).json({ success: 200, message: "Breed deleted successfully", data: result });
      } catch (err) {
        res.status(500).json({ success: 400, message: err.message });
      }
    },
  
    bulkBreedInsert: async (req, res) => {
      try {
        const result = await bulkInsertBreeds(req.body.breeds);
        res.status(200).json({ success: 200, message: "Breeds inserted successfully", data: result });
      } catch (err) {
        res.status(500).json({ success: 400, message: err.message });
      }
    },
  };
  