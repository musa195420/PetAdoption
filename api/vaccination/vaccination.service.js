const supabase = require("../../config/database");

module.exports = {
    createVaccination: async (data) => {
        const { animal_id, name, description } = data;
        try {
            const { data: results, error } = await supabase
                .from('vaccination')
                .insert([{ animal_id, name, description }]);

            if (error) throw new Error(error.message);
            return results;
        } catch (err) {
            throw err;
        }
    },

    getVaccinations: async () => {
        try {
            const { data, error } = await supabase.from('vaccination').select('*');
            if (error) throw new Error(error.message);
            return data;
        } catch (err) {
            throw err;
        }
    },

    getVaccinationById: async (vaccine_id) => {
        try {
            const { data, error } = await supabase
                .from('vaccination')
                .select('*')
                .eq('vaccine_id', vaccine_id)
                .single(); // Fetch a single record

            if (error) throw new Error(error.message);
            return data;
        } catch (err) {
            throw err;
        }
    },

    updateVaccination: async (data) => {
        const { vaccine_id, animal_id, name, description } = data;
        try {
            const { error } = await supabase
                .from('vaccination')
                .update({ animal_id, name, description })
                .eq('vaccine_id', vaccine_id);

            if (error) throw new Error(error.message);
        } catch (err) {
            throw err;
        }
    },

    deleteVaccination: async (vaccine_id) => {
        try {
            const { error } = await supabase
                .from('vaccination')
                .delete()
                .eq('vaccine_id', vaccine_id);

            if (error) throw new Error(error.message);
        } catch (err) {
            throw err;
        }
    },

    bulkInsertVaccinations: async (vaccines) => {
        try {
            if (!Array.isArray(vaccines) || vaccines.length === 0) {
                throw new Error("No data provided");
            }

            const { data, error } = await supabase
                .from('vaccination')
                .insert(vaccines);

            if (error) throw new Error(error.message);
            return data;
        } catch (err) {
            throw err;
        }
    },
};