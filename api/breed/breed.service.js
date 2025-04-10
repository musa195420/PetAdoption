const pool = require("../../config/database");

module.exports = {
    createBreed: (data, callBack) => {
        pool.query(
            `INSERT INTO Breed (animal_id, name) VALUES (?, ?)`,
            [data.animal_id, data.name],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getBreeds: (callBack) => {
        pool.query(`SELECT * FROM Breed`, [], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    getBreedById: (id, callBack) => {
        pool.query(`SELECT * FROM Breed WHERE breed_id = ?`, [id], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results[0]);
        });
    },

    updateBreed: (data, callBack) => {
        const fields = [];
        const values = [];
    
        if (data.name !== undefined && data.name !== null) {
            fields.push("name = ?");
            values.push(data.name);
        }
    
        if (data.animal_id !== undefined && data.animal_id !== null) {
            fields.push("animal_id = ?");
            values.push(data.animal_id);
        }
    
        // If no updatable fields are provided
        if (fields.length === 0) {
            return callBack(null, { message: "No valid fields provided for update" });
        }
    
        // Always include the WHERE clause
        values.push(data.breed_id);
    
        const sql = `UPDATE Breed SET ${fields.join(", ")} WHERE breed_id = ?`;
    
        pool.query(sql, values, (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },
    

    deleteBreed: (id, callBack) => {
        pool.query(`DELETE FROM Breed WHERE breed_id = ?`, [id], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    bulkInsertBreeds: (breedList, callBack) => {
        const values = breedList.map(b => [b.animal_id, b.name]);
        pool.query(
            `INSERT INTO Breed (animal_id, name) VALUES ?`,
            [values],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
};
