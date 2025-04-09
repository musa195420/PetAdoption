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
    pool.query(
      `UPDATE Users SET email = ?, phone_number = ?, role = ?, device_id = ? WHERE user_id = ?`,
      [email, phone_number, role, device_id, user_id],
      (error, results) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },

  deleteUser: (id, callBack) => {
    pool.query(
      `DELETE FROM Users WHERE user_id = ?`,
      [id],
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
