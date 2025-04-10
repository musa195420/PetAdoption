const pool = require("../../config/database");

module.exports = {
  createAnimal: (data, callBack) => {
    pool.query(
      `INSERT INTO AnimalType (name) VALUES (?)`,
      [data.name],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  getAllAnimals: (callBack) => {
    pool.query(`SELECT * FROM AnimalType`, [], (err, results) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },

  getAnimalById: (id, callBack) => {
    pool.query(`SELECT * FROM AnimalType WHERE animal_id = ?`, [id], (err, results) => {
      if (err) return callBack(err);
      return callBack(null, results[0]);
    });
  },

  updateAnimal: (data, callBack) => {
    pool.query(
      `UPDATE AnimalType SET name = ? WHERE animal_id = ?`,
      [data.name, data.animal_id],
      (err, results) => {
        if (err) return callBack(err);
        return callBack(null, results);
      }
    );
  },

  deleteAnimal: (id, callBack) => {
    pool.query(`DELETE FROM AnimalType WHERE animal_id = ?`, [id], (err, results) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  },
  addAnimalsBulk: (animalList, callBack) => {
    if (!Array.isArray(animalList) || animalList.length === 0) {
      return callBack("Invalid or empty animal list");
    }
  
    const values = animalList.map(name => [name]);
  
    const sql = `INSERT INTO AnimalType (name) VALUES ?`;
    pool.query(sql, [values], (err, results) => {
      if (err) return callBack(err);
      return callBack(null, results);
    });
  }

};
