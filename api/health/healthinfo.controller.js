const {
    create,
    getAll,
    getById,
    update,
    deleteHealthInfo,
    getByPetId
} = require("./healthinfo.service");

module.exports = {
    createHealthInfo: async (req, res) => {
        try {
            const result = await create(req.body);
            res.status(200).json({ success: true, message: "Health record created", data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    getAllHealthInfo: async (req, res) => {
        try {
            const result = await getAll();
            res.status(200).json({ success: true, data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    getHealthInfoById: async (req, res) => {
        try {
            const { health_id } = req.body;
            const result = await getById(health_id);
            res.status(200).json({ success: true, data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    updateHealthInfo: async (req, res) => {
        try {
            const result = await update(req.body);
            res.status(200).json({ success: true, message: "Health record updated", data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    deleteHealthInfo: async (req, res) => {
        try {
            const { health_id } = req.body;
            const result = await deleteHealthInfo(health_id);
            res.status(200).json({ success: true, message: "Health record deleted", data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    getHealthInfoByPetId: async (req, res) => {
        try {
            const { pet_id } = req.body;
            const result = await getByPetId(pet_id);
            res.status(200).json({ success: true, data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },
};
