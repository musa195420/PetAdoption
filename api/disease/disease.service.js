const pool = require("../../config/database");

module.exports = {
    createDisease: (data, callBack) => {
        pool.query(
            `INSERT INTO Disease (animal_id, name, description) VALUES (?, ?, ?)`,
            [data.animal_id, data.name, data.description],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getDiseases: callBack => {
        pool.query(
            `SELECT * FROM Disease`,
            [],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getDiseaseById: (id, callBack) => {
        pool.query(
            `SELECT * FROM Disease WHERE disease_id = ?`,
            [id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results[0]);
            }
        );
    },

    updateDisease: (data, callBack) => {
        let fields = [];
        let values = [];

        if (data.animal_id) {
            fields.push("animal_id = ?");
            values.push(data.animal_id);
        }
        if (data.name) {
            fields.push("name = ?");
            values.push(data.name);
        }
        if (data.description) {
            fields.push("description = ?");
            values.push(data.description);
        }

        if (!data.disease_id) {
            return callBack(new Error("Disease ID is required"));
        }

        values.push(data.disease_id);
        const sql = `UPDATE Disease SET ${fields.join(", ")} WHERE disease_id = ?`;

        pool.query(sql, values, (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    deleteDisease: (id, callBack) => {
        pool.query(
            `DELETE FROM Disease WHERE disease_id = ?`,
            [id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    bulkInsertDiseases: (diseases, callBack) => {
        if (!Array.isArray(diseases) || diseases.length === 0) {
            return callBack(new Error("No data provided"));
        }

        const values = diseases.map(d => [d.animal_id, d.name, d.description]);
        pool.query(
            `INSERT INTO Disease (animal_id, name, description) VALUES ?`,
            [values],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
    getDiseasesByAnimalId: (animal_id, callBack) => {
        pool.query(
            `SELECT * FROM Disease WHERE animal_id = ?`,
            [animal_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    }
};
