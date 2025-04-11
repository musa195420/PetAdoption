const pool = require("../../config/database");

module.exports = {
    addFavorite: (data, callBack) => {
        pool.query(
            `INSERT INTO Favorites (user_id, pet_id, created_at) VALUES (?, ?, NOW())`,
            [data.user_id, data.pet_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getFavorites: (callBack) => {
        pool.query(
            `SELECT * FROM Favorites`,
            [],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getFavoriteById: (fav_id, callBack) => {
        pool.query(
            `SELECT * FROM Favorites WHERE fav_id = ?`,
            [fav_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results[0]);
            }
        );
    },

    getFavoritesByUserId: (user_id, callBack) => {
        pool.query(
            `SELECT * FROM Favorites WHERE user_id = ?`,
            [user_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    deleteFavorite: (fav_id, callBack) => {
        pool.query(
            `DELETE FROM Favorites WHERE fav_id = ?`,
            [fav_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    }
};
