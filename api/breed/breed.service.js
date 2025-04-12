const supabase = require("../../config/database");

module.exports = {
  createBreed: async (data) => {
    const { animal_id, name } = data;
    const { data: result, error } = await supabase
      .from("breed")
      .insert([{animal_id:data.animal_id,name: data.name }]);

    if (error) throw error;
    return result;
  },

  getBreeds: async () => {
    const { data, error } = await supabase.from("breed").select("*");
    if (error) throw error;
    return data;
  },

  getBreedById: async (breed_id) => {
    const { data, error } = await supabase
      .from("breed")
      .select("*")
      .eq("breed_id", breed_id)
      .single();

    if (error) throw error;
    return data;
  },

  updateBreed: async (data) => {
    const { breed_id, name, animal_id } = data;
    const updateData = {};
    if (name) updateData.name = name;
    if (animal_id) updateData.animal_id = animal_id;

    const { data: result, error } = await supabase
      .from("breed")
      .update(updateData)
      .eq("breed_id", breed_id);

    if (error) throw error;
    return result;
  },

  deleteBreed: async (breed_id) => {
    const { data, error } = await supabase
      .from("breed")
      .delete()
      .eq("breed_id", breed_id);

    if (error) throw error;
    return data;
  },

  bulkInsertBreeds: async (breedList) => {
    const { data, error } = await supabase.from("breed").insert(breedList);
    if (error) throw error;
    return data;
  }
};
