const {
    addFavorite,
    getFavorites,
    getFavoriteById,
    getFavoritesByUserId,
    deleteFavorite,
    getPetIdsByUserId,
    deleteFavoriteByUserAndPet
} = require("./favourite.service");

module.exports = {
    addFavorite: async (req, res) => {
        try {
            const result = await addFavorite(req.body);
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    getFavorites: async (req, res) => {
        try {
            const result = await getFavorites();
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    getFavoriteById: async (req, res) => {
        try {
            const { fav_id } = req.body;
            const result = await getFavoriteById(fav_id);
            if (!result) return res.status(404).json({ success: false, message: "Not found" });
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
   getPetIdByUserId: async (req, res) => {
        try {
            const { user_id } = req.body;
            const result = await getPetIdsByUserId(user_id);
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    getFavoritesByUserId: async (req, res) => {
        try {
            const { user_id } = req.body;
            const result = await getFavoritesByUserId(user_id);
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    deleteFavorite: async (req, res) => {
        try {
            const { fav_id } = req.body;
            const result = await deleteFavorite(fav_id);
            if (!result.length)
                return res.status(404).json({ success: false, message: "Not found" });
            res.status(200).json({ success: true, message: "Deleted successfully", data: result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    deleteFavoriteByUserAndPet: async (req, res) => {
    try {
        const { user_id, pet_id } = req.body;
        if (!user_id || !pet_id) {
            return res.status(400).json({ success: false, message: "Missing user_id or pet_id" });
        }

        const result = await deleteFavoriteByUserAndPet(user_id, pet_id);
        if (!result.length) {
            return res.status(404).json({ success: false, message: "Favorite not found" });
        }

        res.status(200).json({ success: true, message: "Favorite deleted", data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
};
