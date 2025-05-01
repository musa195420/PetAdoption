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
      const { data: pets, error } = await supabase
  .from("pets_with_donor_details")
  .select("*");

if (error) throw error;

const petsWithDetails = pets.map(pet => ({
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
  animal_id: pet.animal_id,
  animal: pet.animal_name,
  breed: pet.breed_name,
  user_email: pet.user_email,
  location: pet.donor_location
}));
      return petsWithDetails;
    } catch (err) {
      throw new Error("Failed to fetch pets with emails and location: " + err.message);
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
  
      if (error) {
        console.error("Supabase Error: ", error); // Log the error if it occurs
        throw error;
      }
  
      // Log the result to check if it's null or empty
      
  
      // If result is null or empty, return null (no rows deleted)
      if (!result || result.length === 0) {
        return null;  // No pet found to delete
      }
  
      return result;
    } catch (err) {
      console.error("Error deleting pet: ", err.message); // Log the full error
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
  updatePet: async (data) => {
    try {
      const petId = data.pet_id;
  
      // Dynamically construct updateData by removing null or undefined fields
      const updateData = Object.fromEntries(
        Object.entries({
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
          
        }).filter(([_, value]) => value !== null && value !== undefined)
      );
  
      const { error, data: result } = await supabase
        .from("pet")
        .update(updateData)
        .eq("pet_id", petId)
        .select("*");
  
      if (error) throw error;
      return result?.[0]; // Return the updated pet
    } catch (err) {
      throw new Error("Failed to update pet: " + err.message);
    }
  }
  ,
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
