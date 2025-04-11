const pool = require("../../config/database");

module.exports = {
    createDisability: (data, callBack) => {
        pool.query(
            `INSERT INTO Disability (animal_id, name, description) VALUES (?, ?, ?)`,
            [data.animal_id, data.name, data.description],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getAllDisabilities: (callBack) => {
        pool.query(`SELECT * FROM Disability`, [], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    getDisabilityById: (id, callBack) => {
        pool.query(
            `SELECT * FROM Disability WHERE disability_id = ?`,
            [id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results[0]);
            }
        );
    },

    updateDisability: (data, callBack) => {
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

        if (!data.disability_id) return callBack(new Error("Disability ID is required"));

        values.push(data.disability_id);

        const sql = `UPDATE Disability SET ${fields.join(", ")} WHERE disability_id = ?`;

        pool.query(sql, values, (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    deleteDisability: (id, callBack) => {
        pool.query(
            `DELETE FROM Disability WHERE disability_id = ?`,
            [id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getDisabilitiesByAnimalId: (animal_id, callBack) => {
        pool.query(
            `SELECT * FROM Disability WHERE animal_id = ?`,
            [animal_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
    bulkInsertDisabilities: (data, callBack) => {
        if (!data || data.length === 0) return callBack(new Error("No disability data provided"));

        const values = data.map(item => [item.animal_id, item.name, item.description]);

        pool.query(
            `INSERT INTO Disability (animal_id, name, description) VALUES ?`,
            [values],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
};
