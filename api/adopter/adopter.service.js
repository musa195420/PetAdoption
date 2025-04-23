const supabase = require("../../config/database");

module.exports = {
  createAdopterProfile: async (data) => {
    const { error, data: result } = await supabase
      .from("adopterprofile")
      .insert([
        {
         adopter_id: data.adopter_id,
          name: data.name,
          location: data.location,
          is_active: data.is_active,
        },
      ]);

    if (error) throw error;
    return result;
  },

  getAdopterById: async (adopterId) => {
    const { data, error } = await supabase
      .from("adopterprofile")
      .select("*")
      .eq("adopter_id", adopterId)
      .single(); // since we expect one result

    if (error) throw error;
    return data;
  },

  getAllAdopters: async () => {
    const { data, error } = await supabase.from("adopterprofile").select("*");

    if (error) throw error;
    return data;
  },

  updateAdopter: async (data) => {
    const { error, data: result } = await supabase
      .from("adopterprofile")
      .update({
        name: data.name,
        location: data.location,
        is_active: data.is_active,
      })
      .eq("adopter_id", data.adopter_id);

    if (error) throw error;
    return result;
  },

  deleteAdopter: async (user_id) => {
    const { error, data } = await supabase
      .from("adopterprofile")
      .delete()
      .eq("adopter_id", user_id);

    if (error) throw error;
    return data;
  },
};
