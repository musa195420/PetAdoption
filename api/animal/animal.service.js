const supabase = require("../../config/database");

module.exports = {
  createAnimal: async (data) => {
    try {
      const { data: result, error } = await supabase
        .from("animaltype")
        .insert([{ name: data.name }]);

      if (error) throw error;
      return result;
    } catch (err) {
      throw err;
    }
  },

  getAllAnimals: async () => {
    try {
      const { data: results, error } = await supabase
        .from("animaltype")
        .select("*");

      if (error) throw error;
      return results;
    } catch (err) {
      throw err;
    }
  },

  getAnimalById: async (id) => {
    try {
      const { data: result, error } = await supabase
        .from("animaltype")
        .select("*")
        .eq("animal_id", id)
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      throw err;
    }
  },

  updateAnimal: async (data) => {
    try {
      const { data: result, error } = await supabase
        .from("animaltype")
        .update({ name: data.name })
        .eq("animal_id", data.animal_id);

      if (error) throw error;
      return result;
    } catch (err) {
      throw err;
    }
  },

  deleteAnimal: async (id) => {
    try {
      const { data: result, error } = await supabase
        .from("animaltype")
        .delete()
        .eq("animal_id", id);

      if (error) throw error;
      return result;
    } catch (err) {
      throw err;
    }
  },

  addAnimalsBulk: async (animalList) => {
    try {
      if (!Array.isArray(animalList) || animalList.length === 0) {
        throw new Error("Invalid or empty animal list");
      }

      const insertData = animalList.map(name => ({ name }));
      const { data: result, error } = await supabase
        .from("animaltype")
        .insert(insertData);

      if (error) throw error;
      return result;
    } catch (err) {
      throw err;
    }
  }
};
