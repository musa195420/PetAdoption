const  supabase  = require("../../config/database");

module.exports = {
    create: async (data) => {
        const { error, data: result } = await supabase
            .from("healthinfo")
            .insert([data])
            .select();

        if (error) throw error;
        return result[0];
    },

    getAll: async () => {
        const { data, error } = await supabase
            .from("healthinfo")
            .select("*");

        if (error) throw error;
        return data;
    },

    getById: async (health_id) => {
        const { data, error } = await supabase
            .from("healthinfo")
            .select("*")
            .eq("health_id", health_id)
            .single();

        if (error) throw error;
        return data;
    },

    update: async (data) => {
        const { health_id, ...updates } = data;

        const { data: result, error } = await supabase
            .from("healthinfo")
            .update(updates)
            .eq("health_id", health_id)
            .select();

        if (error) throw error;
        return result[0];
    },

    deleteHealthInfo: async (health_id) => {
        const { data, error } = await supabase
            .from("healthinfo")
            .delete()
            .eq("health_id", health_id)
            .select();

        if (error) throw error;
        return data;
    },

    getByPetId: async (pet_id) => {
        const { data, error } = await supabase
            .from("healthinfo")
            .select("*")
            .eq("pet_id", pet_id);

        if (error) throw error;
        return data;
    },
};
