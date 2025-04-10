const pool = require("../../config/database");

module.exports = {
  createDonorProfile: (data, callBack) => {
    pool.query(
      `INSERT INTO DonorProfile (user_id, name, location, is_active) VALUES (?, ?, ?, ?)`,
      [data.user_id, data.name, data.location, data.is_active],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  getDonorById: (id, callBack) => {
    
    pool.query(
      `SELECT * FROM DonorProfile WHERE user_id = ?`,
      [id],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results[0]);
      }
    );
  },

  getAllDonors: (callBack) => {
    pool.query(`SELECT * FROM DonorProfile`, [], (err, results) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },

  updateDonor: (data, callBack) => {
    pool.query(
      `UPDATE DonorProfile SET name = ?, location = ?, is_active = ? WHERE user_id = ?`,
      [data.name, data.location, data.is_active, data.user_id],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  deleteDonor: (data, callBack) => {
    pool.query(
      `DELETE FROM DonorProfile WHERE user_id = ?`,
      [data.user_id],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },
};
