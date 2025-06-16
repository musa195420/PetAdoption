const supabase = require("../../config/database");

module.exports = {
  createUser: async (data) => {
    const { email, phone_number, password, role, device_id } = data;
    const { data: result, error } = await supabase
      .from('users')
      .insert([{ email, phone_number, password, role, device_id }])
      .select();
  
    if (error) throw new Error(error.message);
  
    return result[0]; // return the object directly
  },

  getUserById: async (id) => {
    const { data: user, error } = await supabase
      .from('users')
      .select('user_id, email, phone_number, role, device_id, created_at,profile_image')
      .eq('user_id', id)
      .single();

    if (error) throw new Error(error.message);
    return user;
  },

  getProfileById : async (id) => {

    // Try to fetch adopter profile
    const { data: adopter, error: adopterError } = await supabase
      .from('adopterprofile')
      .select('*')
      .eq('adopter_id', id)
      .single();
  
    if (adopterError && adopterError.code !== 'PGRST116') {
      throw new Error(adopterError.message);
    }
  
    // If adopter found, return user + adopter profile
    if (adopter) {
      return {
        "success":true,
        "status": 200,
        "data": adopter
      };
    }
  
    // Try to fetch donor profile
    const { data: donor, error: donorError } = await supabase
      .from('donorprofile')
      .select('*')
      .eq('donor_id', id)
      .single();
  
    if (donorError) throw new Error(donorError.message);
  
    if (donor) {
      return {
        "success":true,
        "status": 200,
        "data": donor
      };
    }
  
    // Return user with no extra profile
    return {
      "success":false,
        "status": 400,
        "data": null
    };
  },

  getUsers: async () => {
    const { data: users, error } = await supabase
      .from('users')
      .select('user_id, email, phone_number, role, created_at,password,device_id,profile_image');

    if (error) throw new Error(error.message);
    return users;
  },

  updateUser: async (data) => {
    const { user_id, email, phone_number, role, device_id } = data;

    const fieldsToUpdate = {};
    if (email !== undefined) fieldsToUpdate.email = email;
    if (phone_number !== undefined) fieldsToUpdate.phone_number = phone_number;
    if (role !== undefined) fieldsToUpdate.role = role;
    if (device_id !== undefined) fieldsToUpdate.device_id = device_id;

    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error('No valid fields to update.');
    }

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(fieldsToUpdate)
      .eq('user_id', user_id)
      .select();

    if (error) throw new Error(error.message);
    return updatedUser;
  },

  deleteUser: async (data) => {
  const { user_id } = data;

  // Step 1: Get profile image URL
  const { data: user, error: fetchError } = await supabase
    .from('users')
    .select('profile_image')
    .eq('user_id', user_id)
    .single();

  if (fetchError) {
    console.error("Failed to fetch user before delete:", fetchError);
    throw new Error("Could not fetch user data");
  }

  // Step 2: Delete image from storage
  if (user?.profile_image) {
    const imagePath = user.profile_image.split('/userimage/')[1];
    if (imagePath) {
      const { error: deleteError } = await supabase.storage
        .from('userimage')
        .remove([imagePath]);
      if (deleteError) {
        console.warn("Image deletion failed:", deleteError.message);
      }
    }
  }

  // Step 3: Delete user from DB
  const { data: deletedUser, error } = await supabase
    .from('users')
    .delete()
    .eq('user_id', user_id)
    .select();

  if (error) throw new Error(error.message);
  return deletedUser;
},

  getUserByEmail: async (email) => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
  
   
    if (error) throw new Error(error.message);
    return user;
  },
  uploadUserImageService: async (file, userId) => {
  // Step 1: Get the current image URL from DB
  const { data: user, error: fetchError } = await supabase
    .from('users')
    .select('profile_image')
    .eq('user_id', userId)
    .single();

  if (fetchError) {
    console.error("Error fetching current image:", fetchError);
    throw new Error("Failed to fetch current image");
  }

  // Step 2: Delete the previous image from storage
  if (user?.profile_image) {
    const imagePath = user.profile_image.split('/userimage/')[1]; // extract path after bucket name
    if (imagePath) {
      const { error: deleteError } = await supabase.storage
        .from('userimage')
        .remove([imagePath]);
      if (deleteError) {
        console.warn("Previous image deletion failed:", deleteError.message);
        // Optional: don't throw here if you want to allow overwrite
      }
    }
  }

  // Step 3: Upload new image
  const fileName = `${userId}/${Date.now()}_${file.originalname}`;
  const { data, error } = await supabase.storage
    .from('userimage')
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
    .from('userimage')
    .getPublicUrl(fileName);

  const imageUrl = publicUrlData.publicUrl;

  const { error: dbError } = await supabase
    .from('users')
    .update({ profile_image: imageUrl })
    .eq('user_id', userId);

  if (dbError) {
    console.error("Supabase DB update error:", dbError);
    throw new Error("Failed to update user image URL");
  }

  return imageUrl;
},


getFullUserDataById: async (user_id) => {
  // Step 1: Fetch user data
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('user_id, email, phone_number, role, device_id, created_at, profile_image,verified')
    .eq('user_id', user_id)
    .single();

  if (userError || !user) {
    throw new Error(userError?.message || 'User not found');
  }

  // Step 2: Try to fetch adopter profile
  const { data: adopter, error: adopterError } = await supabase
    .from('adopterprofile')
    .select('name, location, is_active')
    .eq('adopter_id', user_id)
    .single();

  if (adopter) {
    return {
      
        ...user,
        ...adopter,
      
    };
  }

  if (adopterError && adopterError.code !== 'PGRST116') {
    throw new Error(adopterError.message);
  }

  // Step 3: Try to fetch donor profile
  const { data: donor, error: donorError } = await supabase
    .from('donorprofile')
    .select('name, location, is_active')
    .eq('donor_id', user_id)
    .single();

  if (donor) {
    return {
     
        ...user,
        ...donor,
      
    };
  }

  if (donorError && donorError.code !== 'PGRST116') {
    throw new Error(donorError.message);
  }

  // Step 4: Return user without profile if none found
  return {
    
      ...user,
      name: null,
      location: null,
      is_active: null,
    
}}

};
