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

   getPetIdsByUserId: async (user_id) => {
    const { data: result, error } = await supabase
        .from("favorites")
        .select("pet_id")
        .eq("user_id", user_id);

    if (error) throw new Error(error.message);

    const favPetIds = result.map(item => item.pet_id);

    return {
        user_id,
        fav_pets: favPetIds
    };
},

getFavoritesByUserId: async (user_id) => {
  const { data: result, error } = await supabase
    .from("favorites")
    .select(`
      fav_id,
      created_at,
      pet_id,
      pet:pet_id (
        pet_id,
        name,
        age,
        gender,
        image,
        is_live,
        description,
        created_at,
        breed:breed_id (
          name
        ),
        animal:animal_id (
          name
        )
      )
    `)
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);

  return result.map(fav => ({
    fav_id: fav.fav_id,
    created_at: fav.created_at,
    pet_id: fav.pet_id,
    pet: {
      pet_id: fav.pet.pet_id,
      name: fav.pet.name,
      age: fav.pet.age,
      gender: fav.pet.gender,
      image: fav.pet.image,
      is_live: fav.pet.is_live,
      description: fav.pet.description,
      pet_created_at: fav.pet.created_at,
      breed: fav.pet.breed?.name || null,
      animal: fav.pet.animal?.name || null
    }
  }));
},
    deleteFavorite: async (fav_id) => {
        const { data: result, error } = await supabase
            .from("favorites")
            .delete()
            .eq("fav_id", fav_id)
            .select();
        if (error) throw new Error(error.message);
        return result;
    },

    deleteFavoriteByUserAndPet: async (user_id, pet_id) => {
    const { data: result, error } = await supabase
        .from("favorites")
        .delete()
        .match({ user_id, pet_id }) // delete where both match
        .select();

    if (error) throw new Error(error.message);
    return result;
}
};
