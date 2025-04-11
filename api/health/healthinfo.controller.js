const {
    create,
    getAll,
    getById,
    update,
    deleteHealthInfo,
    getByPetId
} = require("./healthinfo.service");

module.exports = {
    createHealthInfo: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err.message });
            return res.status(200).json({ success: 1, message: "Health record created", data: results });
        });
    },

    getAllHealthInfo: (req, res) => {
        getAll((err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err.message });
            return res.status(200).json({ success: 1, data: results });
        });
    },

    getHealthInfoById: (req, res) => {
        const id = req.params.id;
        getById(id, (err, result) => {
            if (err) return res.status(500).json({ success: 0, message: err.message });
            if (!result) return res.status(404).json({ success: 0, message: "Health record not found" });
            return res.status(200).json({ success: 1, data: result });
        });
    },

    updateHealthInfo: (req, res) => {
        const body = req.body;
        update(body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err.message });
            return res.status(200).json({ success: 1, message: "Health record updated", data: results });
        });
    },

    deleteHealthInfo: (req, res) => {
        const id = req.params.id;
        deleteHealthInfo(id, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err.message });
            return res.status(200).json({ success: 1, message: "Health record deleted", data: results });
        });
    },
    getHealthInfoByPetId: (req, res) => {
        const pet_id = req.params.pet_id;
        getByPetId(pet_id, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err.message });
            return res.status(200).json({ success: 1, data: results });
        });
    },
    
};
