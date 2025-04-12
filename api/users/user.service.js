const supabase = require("../../config/database");

module.exports = {
  createUser: async (data) => {
    const { email, phone_number, password, role, device_id } = data;
    const { data: result, error } = await supabase
      .from('users')
      .insert([{ email, phone_number, password, role, device_id }])
      .select();

    if (error) throw new Error(error.message);
    return result;
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

  getUsers: async () => {
    const { data: users, error } = await supabase
      .from('users')
      .select('user_id, email, phone_number, role, created_at');

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
};
