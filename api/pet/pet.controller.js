const { createPet, getAllPets, getPetById, deletePet,getPetsByDonorId } = require("./pet.service");

module.exports = {
  createNewPet: async (req, res) => {
    const body = req.body;

    try {
      const result = await createPet(body);
      return res.status(200).json({
        success: 200,
        message: "Pet created successfully",
        data: result
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 400,
        message: "Database Error: " + err.message
      });
    }
  },

  fetchAllPets: async (req, res) => {
    try {
      const results = await getAllPets();
      return res.json({
        success: 200,
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 400,
        message: "Failed to fetch pets"
      });
    }
  },

  fetchPetById: async (req, res) => {
    const pet_id = req.body.pet_id;

    try {
      const result = await getPetById(pet_id);
      if (!result) {
        return res.json({ success: 400, message: "Pet not found" });
      }
      return res.json({
        success: 200,
        data: result
      });
    } catch (err) {
      return res.status(500).json({
        success: 400,
        message: "Error fetching pet"
      });
    }
  },

  deletePetById: async (req, res) => {
    const pet_id = req.body.pet_id;


    try {
      const result = await deletePet(pet_id);
      if (!result || result.length === 0) {
        return res.status(404).json({
          success: 400,
          message: "Pet not found"
        });
      }
      return res.json({
        success: 200,
        message: "Pet deleted successfully"
      });
    } catch (err) {
      return res.status(500).json({
        success: 400,
        message: "Database Error: " + err.message
      });
    }
  },
  fetchPetsByDonorId: async (req, res) => {
    const donorId = req.params.donor_id;

    try {
      const results = await getPetsByDonorId(donorId);

      if (!results || results.length === 0) {
        return res.status(404).json({
          success: 400,
          message: "No pets found for this donor"
        });
      }

      return res.status(200).json({
        success: 200,
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 400,
        message: "Error fetching pets for donor: " + err.message
      });
    }
  }
};
