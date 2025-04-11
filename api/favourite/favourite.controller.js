const {
    addFavorite,
    getFavorites,
    getFavoriteById,
    getFavoritesByUserId,
    deleteFavorite
} = require("./favourite.service");

module.exports = {
    addFavorite: (req, res) => {
        addFavorite(req.body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "DB error", error: err });
            return res.status(200).json({ success: 1, data: results });
        });
    },

    getFavorites: (req, res) => {
        getFavorites((err, results) => {
            if (err) return res.status(500).json({ success: 0, message: "DB error", error: err });
            return res.status(200).json({ success: 1, data: results });
        });
    },

    getFavoriteById: (req, res) => {
        const id = req.params.fav_id;
        getFavoriteById(id, (err, result) => {
            if (err) return res.status(500).json({ success: 0, message: "DB error", error: err });
            if (!result) return res.status(404).json({ success: 0, message: "Not found" });
            return res.status(200).json({ success: 1, data: result });
        });
    },

    getFavoritesByUserId: (req, res) => {
        const id = req.params.user_id;
        getFavoritesByUserId(id, (err, result) => {
            if (err) return res.status(500).json({ success: 0, message: "DB error", error: err });
            return res.status(200).json({ success: 1, data: result });
        });
    },

    deleteFavorite: (req, res) => {
        const id = req.params.fav_id;
        deleteFavorite(id, (err, result) => {
            if (err) return res.status(500).json({ success: 0, message: "DB error", error: err });
            return res.status(200).json({ success: 1, message: "Deleted successfully" });
        });
    }
};
