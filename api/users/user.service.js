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
      .select('user_id, email, phone_number, role, device_id, created_at')
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
};
