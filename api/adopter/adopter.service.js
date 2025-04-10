const pool = require("../../config/database");

module.exports = {
  createAdopterProfile: (data, callBack) => {
    pool.query(
      `INSERT INTO AdopterProfile (user_id, name, location, is_active) VALUES (?, ?, ?, ?)`,
      [data.user_id, data.name, data.location, data.is_active],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  getAdopterById: (id, callBack) => {
    pool.query(
      `SELECT * FROM AdopterProfile WHERE user_id = ?`,
      [id],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results[0]);
      }
    );
  },

  getAllAdopters: (callBack) => {
    pool.query(`SELECT * FROM AdopterProfile`, [], (err, results) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },

  updateAdopter: (data, callBack) => {
    pool.query(
      `UPDATE AdopterProfile SET name = ?, location = ?, is_active = ? WHERE user_id = ?`,
      [data.name, data.location, data.is_active, data.user_id],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  deleteAdopter: (data, callBack) => {
    pool.query(
      `DELETE FROM AdopterProfile WHERE user_id = ?`,
      [data.user_id],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },
};
