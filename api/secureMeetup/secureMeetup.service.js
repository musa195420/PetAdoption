const supabase = require("../../config/database");

module.exports = {
    createSecureMeetup: async (data) => {
        try {
            const { data: result, error } = await supabase
                .from("securemeetup")
                .insert([
                    {
                        meetup_id: data.meetup_id,
                        proof_pic_url: data.proof_pic_url,
                        adopter_id_front_url: data.adopter_id_front_url,
                        adopter_id_back_url: data.adopter_id_back_url,
                        phone_number: data.phone_number,
                        current_address: data.current_address,
                        time: data.time,
                        submitted_by: data.submitted_by
                    }
                ]);
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getAllSecureMeetups: async () => {
        try {
            const { data: result, error } = await supabase
                .from("securemeetup")
                .select("*");
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getSecureMeetupById: async (secure_meetup_id) => {
        try {
            const { data: result, error } = await supabase
                .from("securemeetup")
                .select("*")
                .eq("secure_meetup_id", secure_meetup_id)
                .single(); // To fetch a single row
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    updateSecureMeetup: async (data) => {
        try {
            const { secure_meetup_id, ...updateData } = data;
            const { data: result, error } = await supabase
                .from("securemeetup")
                .update(updateData)
                .eq("secure_meetup_id", secure_meetup_id);
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    deleteSecureMeetup: async (secure_meetup_id) => {
        try {
            const { data: result, error } = await supabase
                .from("securemeetup")
                .delete()
                .eq("secure_meetup_id", secure_meetup_id);
            if (error) throw error;
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    }
};
