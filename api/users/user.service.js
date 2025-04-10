const pool = require("../../config/database");

module.exports = {
  createUser: (data, callBack) => {
    pool.query(
      `INSERT INTO Users (email, phone_number, password, role, device_id)
       VALUES (?, ?, ?, ?, ?)`,
      [data.email, data.phone_number, data.password, data.role, data.device_id],
      (error, results) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },

  getUserById: (id, callBack) => {
    pool.query(
      `SELECT user_id, email, phone_number, role, device_id, created_at FROM Users WHERE user_id = ?`,
      [id],
      (error, results) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  },

  getUsers: (callBack) => {
    pool.query(
      `SELECT user_id, email, phone_number, role, created_at FROM Users`,
      [],
      (error, results) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },

  updateUser: (data, callBack) => {
    const { user_id, email, phone_number, role, device_id } = data;
  
    // Build fields and values dynamically
    const fields = [];
    const values = [];
  
    if (email !== null && email !== undefined) {
      fields.push('email = ?');
      values.push(email);
      console.log(`email ${email}`);
    }
    if (phone_number !== null && phone_number !== undefined) {
      fields.push('phone_number = ?');
      values.push(phone_number);
    }
    if (role !== null && role !== undefined) {
      fields.push('role = ?');
      values.push(role);
    }
    if (device_id !== null && device_id !== undefined) {
      fields.push('device_id = ?');
      values.push(device_id);
    }
  
    if (fields.length === 0) {
      return callBack(new Error('No valid fields to update.'));
    }
  
    values.push(user_id); // Add user_id for WHERE clause
  
    const sql = `UPDATE Users SET ${fields.join(', ')} WHERE user_id = ?`;
  
    pool.query(sql, values, (error, results) => {
      if (error) return callBack(error);
      return callBack(null, results);
    });
  },
  

  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM Users WHERE user_id = ?`,
      [data.user_id],
      (error, results) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },

  getUserByEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM Users WHERE email = ?`,
      [email],
      (error, results) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  },
};
