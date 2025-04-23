const { createPet, getAllPets, getPetById, deletePet,getPetsByDonorId,uploadPetImageService,getAllPetsWithUserEmail,updatePet } = require("./pet.service");

module.exports = {
  createNewPet: async (req, res) => {
    const body = req.body;

    try {
      const result = await createPet(body);
      return res.status(200).json({
        success:true,status: 200, 
        message: "Pet created successfully",
        data: result
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success:false,status: 400,
        message: "Database Error: " + err.message
      });
    }
  },
  updatePetById: async (req, res) => {
    const data = req.body;
  
    if (!data.pet_id) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Pet ID is required for update",
      });
    }
  
    try {
      const result = await updatePet(data);
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Pet updated successfully",
        data: result,
      });
    } catch (err) {
      console.error("Update Error:", err.message);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Failed to update pet: " + err.message,
      });
    }
  },
  fetchAllPets: async (req, res) => {
    try {
      const results = await getAllPets();
      return res.json({
        success:true,status: 200, 
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success:false,status: 400,
        message: "Failed to fetch pets"
      });
    }
  },
  fetchAllPetsWithEmail: async (req, res) => {
    try {
      const results = await getAllPetsWithUserEmail();
      return res.json({
        success: true,
        status: 200,
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        status: 400,
        message: "Failed to fetch pets with emails "+err,
      });
    }
  },
  fetchPetById: async (req, res) => {
    const pet_id = req.body.pet_id;

    try {
      const result = await getPetById(pet_id);
      if (!result) {
        return res.json({ success:false,status: 400, message: "Pet not found" });
      }
      return res.json({
        success:true,status: 200, 
        data: result
      });
    } catch (err) {
      return res.status(500).json({
        success:false,status: 400,
        message: "Error fetching pet"
      });
    }
  },

  deletePetById: async (req, res) => {
    const pet_id = req.body.pet_id;
  
    try {
     // Log the pet_id being deleted
  
      const result = await deletePet(pet_id);
     
  
      return res.json({
        success: true,
        status: 200, 
        message: "Pet deleted successfully"
      });
    } catch (err) {
      console.error("Error in deletePetById: ", err.message); // Log the error in the route handler
      return res.status(500).json({
        success: false,
        status: 500,  // Corrected status code for internal server error
        message: "Database Error: " + err.message
      });
    }
  },
  
  fetchPetsByDonorId: async (req, res) => {
    let donorId = req.body.donor_id;
    if (!donorId) {
      donorId = req.body.user_id;
    }

    try {
      const results = await getPetsByDonorId(donorId);

      if (!results || results.length === 0) {
        return res.status(404).json({
          success:false,status: 400,
          message: "No pets found for this donor"
        });
      }

      return res.status(200).json({
        success:true,status: 200, 
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success:false,status: 400,
        message: "Error fetching pets for donor: " + err.message
      });
    }
  },
  uploadPetImage: async (req, res) => {
    try {
      const file = req.file;
      const petId = req.body.pet_id;

      if (!file || !petId) {
        return res.status(400).json({ success: false, message: "Image or Pet ID missing" });
      }

      const imageUrl = await uploadPetImageService(file, petId);
      return res.status(200).json({ success: true, imageUrl });
    } catch (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
    }
  }
};
