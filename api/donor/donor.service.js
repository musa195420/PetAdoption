const supabase = require("../../config/database");

module.exports = {
  createDonorProfile: async (data) => {
    try {
      const { error, data: result } = await supabase
        .from("donorprofile")
        .insert([
          {
            donor_id: data.donor_id,
            name: data.name,
            location: data.location,
            is_active: data.is_active,
          },
        ]);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getDonorById: async (id) => {
    try {
      const { data: result, error } = await supabase
        .from("donorprofile")
        .select("*")
        .eq("donor_id", id)
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getAllDonors: async () => {
    try {
      const { data: results, error } = await supabase
        .from("donorprofile")
        .select("*");

      if (error) throw error;
      return results;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  updateDonor: async (data) => {
  try {
    const updateData = {};

    if (data.name !== null && data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.location !== null && data.location !== undefined) {
      updateData.location = data.location;
    }

    if (data.is_active !== null && data.is_active !== undefined) {
      updateData.is_active = data.is_active;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields to update");
    }

    const { error, data: result } = await supabase
      .from("donorprofile")
      .update(updateData)
      .eq("donor_id", data.donor_id);

    if (error) throw error;
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
},

  deleteDonor: async (id) => {
    try {
      const { error, data: result } = await supabase
        .from("donorprofile")
        .delete()
        .eq("donor_id", id);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
