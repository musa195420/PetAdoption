const pool = require("../../config/database");

module.exports = {
    createPet: (data, callBack) => {
        pool.query(
            `INSERT INTO pet (donor_id, name, animal_type, breed_id, age, gender, description, is_approved, rejection_reason, is_live, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
                data.donor_id,
                data.name,
                data.animal_type,
                data.breed_id,
                data.age,
                data.gender,
                data.description,
                data.is_approved,
                data.rejection_reason,
                data.is_live
            ],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    getAllPets: callBack => {
        pool.query(`SELECT * FROM pet`, [], (error, results) => {
            if (error) return callBack(error);
            return callBack(null, results);
        });
    },

    getPetById: (id, callBack) => {
        pool.query(`SELECT * FROM pet WHERE pet_id = ?`, [id], (error, results) => {
            if (error) return callBack(error);
            return callBack(null, results[0]);
        });
    },
    deletePet: (pet_id, callBack) => {
        const sql = `DELETE FROM pet WHERE pet_id = ?`;
        pool.query(sql, [pet_id], (error, results) => {
            if (error) return callBack(error);
            return callBack(null, results);
        });
    }

};
