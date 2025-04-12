const supabase = require("../../config/database");

module.exports = {
    createMeetup: async (data) => {
        const { data: result, error } = await supabase
            .from("meetuprequest")
            .insert([data])
            .select();

        if (error) throw new Error(error.message);
        return result;
    },

    getMeetups: async () => {
        const { data, error } = await supabase.from("meetuprequest").select("*");
        if (error) throw new Error(error.message);
        return data;
    },

    getMeetupById: async (meetup_id) => {
        const { data, error } = await supabase
            .from("meetuprequest")
            .select("*")
            .eq("meetup_id", meetup_id)
            .single();

        if (error) throw new Error(error.message);
        return data;
    },

    updateMeetup: async (data) => {
        const { meetup_id, ...fieldsToUpdate } = data;

        const { data: result, error } = await supabase
            .from("meetuprequest")
            .update(fieldsToUpdate)
            .eq("meetup_id", meetup_id)
            .select();

        if (error) throw new Error(error.message);
        return result;
    },

    deleteMeetup: async (meetup_id) => {
        const { data, error } = await supabase
            .from("meetuprequest")
            .delete()
            .eq("meetup_id", meetup_id);

        if (error) throw new Error(error.message);
        return data;
    },

    getMeetupsByUser: async (user_id) => {
        const { data, error } = await supabase
            .from("meetuprequest")
            .select("*")
            .or(`donor_id.eq.${user_id},adopter_id.eq.${user_id}`);

        if (error) throw new Error(error.message);
        return data;
    },

    getMeetupsByPet: async (pet_id) => {
        const { data, error } = await supabase
            .from("meetuprequest")
            .select("*")
            .eq("pet_id", pet_id);

        if (error) throw new Error(error.message);
        return data;
    },
};
