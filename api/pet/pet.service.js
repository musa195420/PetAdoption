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
  }
};
