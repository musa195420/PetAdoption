const supabase = require("../../config/database");

module.exports = {
  createApplication: async (data) => {
    try {
      const { data: result, error } = await supabase
        .from("application")
        .insert([{
          user_id: data.user_id,
          profession: data.profession,
          reason: data.reason,
          verification_status: data.verification_status || "Pending"
        }])
        .select("*");

      if (error) throw error;
      return result?.[0];
    } catch (err) {
      throw new Error("Failed to create application: " + err.message);
    }
  },

  getAllApplications: async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .select("*");

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error("Failed to fetch applications: " + err.message);
    }
  },

  getApplicationByUserId: async (userId) => {
    try {
      const { data, error } = await supabase
        .from("application")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error("Failed to fetch applications for user: " + err.message);
    }
  },

  deleteApplicationById: async (applicationId) => {
    try {
      const { error } = await supabase
        .from("application")
        .delete()
        .eq("application_id", applicationId);

      if (error) throw error;
      return true;
    } catch (err) {
      throw new Error("Failed to delete application: " + err.message);
    }
  },
  updateApplicationById: async (applicationId, data) => {
  try {
    const updateData = Object.fromEntries(
      Object.entries({
        profession: data.profession,
        reason: data.reason,
        verification_status: data.verification_status
      }).filter(([_, v]) => v !== undefined && v !== null)
    );

    if (Object.keys(updateData).length === 0) {
      throw new Error("Nothing to update");
    }

    const { data: result, error } = await supabase
      .from("application")
      .update(updateData)
      .eq("application_id", applicationId)
      .select("*");

    if (error) throw error;
    return result?.[0];
  } catch (err) {
    throw new Error("Failed to update application: " + err.message);
  }
}
};
