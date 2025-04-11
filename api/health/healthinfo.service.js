const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO HealthInfo (pet_id, vaccination_id, disease_id, disability_id)
             VALUES (?, ?, ?, ?)`,
            [data.pet_id, data.vaccination_id, data.disease_id, data.disability_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getAll: callBack => {
        pool.query(`SELECT * FROM HealthInfo`, [], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    getById: (id, callBack) => {
        pool.query(`SELECT * FROM HealthInfo WHERE health_id = ?`, [id], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results[0]);
        });
    },

    update: (data, callBack) => {
        const fields = [];
        const values = [];
    
        if (data.pet_id !== undefined) {
            fields.push("pet_id = ?");
            values.push(data.pet_id);
        }
    
        if (data.vaccination_id !== undefined) {
            fields.push("vaccination_id = ?");
            values.push(data.vaccination_id);
        }
    
        if (data.disease_id !== undefined) {
            fields.push("disease_id = ?");
            values.push(data.disease_id);
        }
    
        if (data.disability_id !== undefined) {
            fields.push("disability_id = ?");
            values.push(data.disability_id);
        }
    
        if (!fields.length) {
            return callBack(new Error("No fields provided to update."));
        }
    
        values.push(data.health_id); // last value for WHERE clause
    
        const query = `UPDATE HealthInfo SET ${fields.join(", ")} WHERE health_id = ?`;
    
        pool.query(query, values, (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },
    
    deleteHealthInfo: (id, callBack) => {
        pool.query(`DELETE FROM HealthInfo WHERE health_id = ?`, [id], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },
    getByPetId: (pet_id, callBack) => {
        pool.query(
            `SELECT * FROM HealthInfo WHERE pet_id = ?`,
            [pet_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
    
};