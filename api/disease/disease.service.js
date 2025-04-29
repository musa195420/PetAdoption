const supabase = require("../../config/database");

module.exports = {
    createDisease: async (data) => {
        const { animal_id, name, description } = data;
        try {
            const { data: results, error } = await supabase
                .from('disease')
                .insert([{ animal_id, name, description }]);
            
            if (error) throw new Error(error.message);
            return results;
        } catch (err) {
            throw err;
        }
    },

    getDiseases: async () => {
        try {
            const { data, error } = await supabase
                .from('disease')
                .select('disease_id, animal_id, name, description, animaltype(name)');
    
            if (error) throw new Error(error.message);
    
            const formattedData = data.map(disease => ({
                disease_id: disease.disease_id,
                animal_id: disease.animal_id,
                name: disease.name,
                description: disease.description,
                animal: disease.animaltype?.name || null  // Add animal name
            }));
    
            return formattedData;
        } catch (err) {
            throw err;
        }
    },

    getDiseaseById: async (disease_id) => {
        try {
            const { data, error } = await supabase
                .from('disease')
                .select('*')
                .eq('disease_id', disease_id)
                .single(); // Fetch a single record
            
            if (error) throw new Error(error.message);
            return data;
        } catch (err) {
            throw err;
        }
    },

    updateDisease: async (data) => {
        const { disease_id, animal_id, name, description } = data;
        try {
            const { error } = await supabase
                .from('disease')
                .update({ animal_id, name, description })
                .eq('disease_id', disease_id);
            
            if (error) throw new Error(error.message);
        } catch (err) {
            throw err;
        }
    },

    deleteDisease: async (disease_id) => {
        try {
            const { error } = await supabase
                .from('disease')
                .delete()
                .eq('disease_id', disease_id);
            
            if (error) throw new Error(error.message);
        } catch (err) {
            throw err;
        }
    },

    bulkInsertDiseases: async (diseases) => {
        try {
            if (!Array.isArray(diseases) || diseases.length === 0) {
                throw new Error("No data provided");
            }
            const { data, error } = await supabase
                .from('disease')
                .insert(diseases);
            
            if (error) throw new Error(error.message);
            return data;
        } catch (err) {
            throw err;
        }
    },

    getDiseasesByAnimalId: async (animal_id) => {
        try {
            const { data, error } = await supabase
                .from('disease')
                .select('*')
                .eq('animal_id', animal_id);
            
            if (error) throw new Error(error.message);
            return data;
        } catch (err) {
            throw err;
        }
    },
};
