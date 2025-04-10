const pool = require("../../config/database");

module.exports = {
    createVaccination: (data, callBack) => {
        pool.query(
            `INSERT INTO Vaccination (animal_id, name, description) VALUES (?, ?, ?)`,
            [data.animal_id, data.name, data.description],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getVaccinations: callBack => {
        pool.query(
            `SELECT * FROM Vaccination`,
            [],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getVaccinationById: (id, callBack) => {
        pool.query(
            `SELECT * FROM Vaccination WHERE vaccine_id = ?`,
            [id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results[0]);
            }
        );
    },

    updateVaccination: (data, callBack) => {
        let fields = [];
        let values = [];

        if (data.name) {
            fields.push("name = ?");
            values.push(data.name);
        }
        if (data.description) {
            fields.push("description = ?");
            values.push(data.description);
        }
        if (data.animal_id) {
            fields.push("animal_id = ?");
            values.push(data.animal_id);
        }

        if (!data.vaccine_id) {
            return callBack(new Error("vaccine_id is required"));
        }

        values.push(data.vaccine_id);

        const sql = `UPDATE Vaccination SET ${fields.join(", ")} WHERE vaccine_id = ?`;
        pool.query(sql, values, (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    deleteVaccination: (id, callBack) => {
        pool.query(
            `DELETE FROM Vaccination WHERE vaccine_id = ?`,
            [id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
    bulkInsertVaccinations: (vaccines, callBack) => {
        if (!Array.isArray(vaccines) || vaccines.length === 0) {
            return callBack(new Error("No data provided"));
        }

        const values = vaccines.map(v => [v.animal_id, v.name, v.description]);
        pool.query(
            `INSERT INTO Vaccination (animal_id, name, description) VALUES ?`,
            [values],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
};
