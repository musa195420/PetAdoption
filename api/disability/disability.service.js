const supabase = require("../../config/database");

module.exports = {
    createDisability: async (data) => {
        const { animal_id, name, description } = data;
        const { data: disability, error } = await supabase
            .from('disability')
            .insert([
                { animal_id, name, description }
            ])
            .single();

        if (error) throw new Error(error.message);
        return disability;
    },

    getAllDisabilities: async () => {
        const { data, error } = await supabase
            .from('disability')
            .select('*');

        if (error) throw new Error(error.message);
        return data;
    },

    getDisabilityById: async (disability_id) => {
        const { data, error } = await supabase
            .from('disability')
            .select('*')
            .eq('disability_id', disability_id)
            .single();

        if (error) throw new Error(error.message);
        return data;
    },

    updateDisability: async (data) => {
        const { disability_id, animal_id, name, description } = data;
        const { error } = await supabase
            .from('disability')
            .update({ animal_id, name, description })
            .eq('disability_id', disability_id);

        if (error) throw new Error(error.message);
        return { message: 'Updated successfully' };
    },

    deleteDisability: async (disability_id) => {
        const { error } = await supabase
            .from('disability')
            .delete()
            .eq('disability_id', disability_id);

        if (error) throw new Error(error.message);
        return { message: 'Deleted successfully' };
    },

    getDisabilitiesByAnimalId: async (animal_id) => {
        const { data, error } = await supabase
            .from('disability')
            .select('*')
            .eq('animal_id', animal_id);

        if (error) throw new Error(error.message);
        return data;
    },

    bulkInsertDisabilities: async (data) => {
        const { error } = await supabase
            .from('disability')
            .upsert(data, { onConflict: ['disability_id'] });

        if (error) throw new Error(error.message);
        return { message: 'Bulk insert successful' };
    },
};
