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
        .select(`
            health_id,
            pet:pet_id (
                pet_id,
                name,
                animal:animal_id (
                    animal_id,
                    name
                )
            ),
            vaccination:vaccination_id (
                vaccine_id,
                name
            ),
            disease:disease_id (
                disease_id,
                name
            ),
            disability:disability_id (
                disability_id,
                name
            )
        `);

    if (error) throw error;

    // Flatten the nested structure
    const flattened = data.map((item) => ({
        health_id: item.health_id,

        pet_id: item.pet?.pet_id || null,
        pet_name: item.pet?.name || null,

        animal_id: item.pet?.animal?.animal_id || null,
        animal_name: item.pet?.animal?.name || null,

        vaccination_id: item.vaccination?.vaccine_id || null,
        vaccination_name: item.vaccination?.name || null,

        disease_id: item.disease?.disease_id || null,
        disease_name: item.disease?.name || null,

        disability_id: item.disability?.disability_id || null,
        disability_name: item.disability?.name || null
    }));

    return flattened;
},


    getByPetId: async (pet_id) => {
    const { data, error } = await supabase
        .from("healthinfo")
        .select(`
            health_id,
            pet:pet_id (
                pet_id,
                name,
                animal:animal_id (
                    animal_id,
                    name
                )
            ),
            vaccination:vaccination_id (
                vaccine_id,
                name
            ),
            disease:disease_id (
                disease_id,
                name
            ),
            disability:disability_id (
                disability_id,
                name
            )
        `)
        .eq("pet_id", pet_id);

    if (error) throw error;

    return data.map((item) => ({
        health_id: item.health_id,

        pet_id: item.pet?.pet_id || null,
        pet_name: item.pet?.name || null,

        animal_id: item.pet?.animal?.animal_id || null,
        animal_name: item.pet?.animal?.name || null,

        vaccination_id: item.vaccination?.vaccine_id || null,
        vaccination_name: item.vaccination?.name || null,

        disease_id: item.disease?.disease_id || null,
        disease_name: item.disease?.name || null,

        disability_id: item.disability?.disability_id || null,
        disability_name: item.disability?.name || null
    }));
},


   update: async (data) => {
    const { health_id, ...updates } = data;

    // Remove fields with null or undefined values
    const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== null && value !== undefined)
    );

    const { data: result, error } = await supabase
        .from("healthinfo")
        .update(filteredUpdates)
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

    getById: async (health_id) => {
    const { data, error } = await supabase
        .from("healthinfo")
        .select(`
            health_id,
            pet:pet_id (
                pet_id,
                name,
                animal:animal_id (
                    animal_id,
                    name
                )
            ),
            vaccination:vaccination_id (
                vaccine_id,
                name
            ),
            disease:disease_id (
                disease_id,
                name
            ),
            disability:disability_id (
                disability_id,
                name
            )
        `)
        .eq("health_id", health_id)
        .single();

    if (error) throw error;

    return {
        health_id: data.health_id,

        pet_id: data.pet?.pet_id || null,
        pet_name: data.pet?.name || null,

        animal_id: data.pet?.animal?.animal_id || null,
        animal_name: data.pet?.animal?.name || null,

        vaccination_id: data.vaccination?.vaccine_id || null,
        vaccination_name: data.vaccination?.name || null,

        disease_id: data.disease?.disease_id || null,
        disease_name: data.disease?.name || null,

        disability_id: data.disability?.disability_id || null,
        disability_name: data.disability?.name || null
    };
},

};
