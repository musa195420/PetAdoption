const supabase = require("../../config/database");

module.exports = {
  createPet: async (data) => {
    try {
      const { error, data: result } = await supabase
        .from("pet")
        .insert([
          {
            donor_id: data.donor_id,
            name: data.name,
            animal_id: data.animal_id,
            breed_id: data.breed_id,
            age: data.age,
            gender: data.gender,
            description: data.description,
            is_approved: data.is_approved,
            rejection_reason: data.rejection_reason,
            is_live: data.is_live,
            created_at: new Date(),
          },
        ])
        .select("*") // 👈 This tells Supabase to return the inserted row(s)
  
      if (error) throw error;
      return result?.[0]; // Return the first inserted pet
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getAllPets: async () => {
    try {
      const { data: results, error } = await supabase
        .from("pet")
        .select("*");

      if (error) throw error;
      return results;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getAllPetsWithUserEmail: async () => {
    try {
      // Step 1: Fetch all pets
      const { data: pets, error: petError } = await supabase
        .from("pet")
        .select("*");
  
      if (petError) throw petError;
  
      // Step 2: Fetch all users with user_id and email
      const { data: users, error: userError } = await supabase
        .from("users")
        .select("user_id, email");
  
      if (userError) throw userError;
  
      // Step 3: Merge user email into pets
      const petsWithEmail = pets.map(pet => {
        const user = users.find(u => u.user_id === pet.donor_id);
        return {
          ...pet,
          user_email: user ? user.email : null
        };
      });
  
      return petsWithEmail;
    } catch (err) {
      throw new Error("Failed to fetch pets with emails: " + err.message);
    }
  },
  

  getPetById: async (id) => {
    try {
      const { data: result, error } = await supabase
        .from("pet")
        .select("*")
        .eq("pet_id", id)
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  deletePet: async (pet_id) => {
    try {
      const { error, data: result } = await supabase
        .from("pet")
        .delete()
        .eq("pet_id", pet_id);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getPetsByDonorId: async (donor_id) => {
    try {
      const { data: results, error } = await supabase
        .from("pet")
        .select(`
          pet_id,
          donor_id,
          name,
          age,
          gender,
          description,
          is_approved,
          rejection_reason,
          is_live,
          created_at,
          image,
          breed_id,
          animaltype:animal_id!inner(animal_id, name),
          breed:breed_id!inner(name)
        `)
        .eq("donor_id", donor_id);
  
      if (error) throw error;
  
      const pets = results.map(pet => ({
        pet_id: pet.pet_id,
        donor_id: pet.donor_id,
        name: pet.name,
        age: pet.age,
        gender: pet.gender,
        description: pet.description,
        is_approved: pet.is_approved,
        rejection_reason: pet.rejection_reason,
        is_live: pet.is_live,
        created_at: pet.created_at,
        image: pet.image,
        breed_id: pet.breed_id,
        animal_id: pet.animaltype.animal_id, // UUID
        animal: pet.animaltype.name,         // e.g. "Dog"
        breed: pet.breed.name                // e.g. "Golden Retriever"
      }));
  
      return pets;
    } catch (err) {
      console.error("Error fetching pets by donor:", err);
      throw err;
    }
  },
  uploadPetImageService: async (file, petId) => {
    const fileName = `${petId}/${Date.now()}_${file.originalname}`;

    const { data, error } = await supabase.storage
      .from('petimage')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw new Error("Supabase upload failed");
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('petimage')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase
      .from('pet')
      .update({ image: imageUrl })
      .eq('pet_id', petId);

    if (dbError) {
      console.error("Supabase DB update error:", dbError);
      throw new Error("Failed to update pet image URL");
    }

    return imageUrl;
  },

};
