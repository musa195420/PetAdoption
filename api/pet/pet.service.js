const supabase = require("../../config/database");

module.exports = {
  createPet: async (data) => {
    try {
      const { error, data: result } = await supabase
        .from("pet")
        .insert([
          {
            donor_id: data.donor_id,
            name: data.name,
            animal_type: data.animal_type,
            breed_id: data.breed_id,
            age: data.age,
            gender: data.gender,
            description: data.description,
            is_approved: data.is_approved,
            rejection_reason: data.rejection_reason,
            is_live: data.is_live,
            created_at: new Date(),
          },
        ]);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getAllPets: async () => {
    try {
      const { data: results, error } = await supabase
        .from("pet")
        .select("*");

      if (error) throw error;
      return results;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getPetById: async (id) => {
    try {
      const { data: result, error } = await supabase
        .from("pet")
        .select("*")
        .eq("pet_id", id)
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  deletePet: async (pet_id) => {
    try {
      const { error, data: result } = await supabase
        .from("pet")
        .delete()
        .eq("pet_id", pet_id);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getPetsByDonorId: async (donor_id) => {
    try {
      const { data: results, error } = await supabase
        .from("pet")
        .select("*")
        .eq("donor_id", donor_id);

      if (error) throw error;
      return results;
    } catch (err) {
      throw err;
    }
  },
  uploadPetImageService: async (file, petId) => {
    const fileName = `${petId}/${Date.now()}_${file.originalname}`;

    const { data, error } = await supabase.storage
      .from('petimage')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error("Supabase upload failed");
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('petimage')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase
      .from('pet')
      .update({ image: imageUrl })
      .eq('pet_id', petId);

    if (dbError) {
      console.error("Supabase DB update error:", dbError);
      throw new Error("Failed to update pet image URL");
    }

    return imageUrl;
  },

};
