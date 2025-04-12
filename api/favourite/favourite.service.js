const supabase = require("../../config/database");

module.exports = {
    addFavorite: async (data) => {
        const { data: result, error } = await supabase
            .from("favorites")
            .insert([{ user_id: data.user_id, pet_id: data.pet_id }])
            .select();
        if (error) throw new Error(error.message);
        return result;
    },

    getFavorites: async () => {
        const { data: result, error } = await supabase
            .from("favorites")
            .select("*");
        if (error) throw new Error(error.message);
        return result;
    },

    getFavoriteById: async (fav_id) => {
        const { data: result, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("fav_id", fav_id)
            .single();
        if (error) throw new Error(error.message);
        return result;
    },

    getFavoritesByUserId: async (user_id) => {
        const { data: result, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", user_id);
        if (error) throw new Error(error.message);
        return result;
    },

    deleteFavorite: async (fav_id) => {
        const { data: result, error } = await supabase
            .from("favorites")
            .delete()
            .eq("fav_id", fav_id)
            .select();
        if (error) throw new Error(error.message);
        return result;
    }
};
