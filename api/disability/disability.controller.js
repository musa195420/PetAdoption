const {
    createDisability,
    getAllDisabilities,
    getDisabilityById,
    updateDisability,
    deleteDisability,
    getDisabilitiesByAnimalId,
    bulkInsertDisabilities,
} = require("./disability.service");

module.exports = {
    create: (req, res) => {
        const body = req.body;
        createDisability(body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    getAll: (req, res) => {
        getAllDisabilities((err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    getById: (req, res) => {
        const id = req.params.id;
        getDisabilityById(id, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            if (!result) return res.status(404).json({ success: 400, message: "Disability not found" });
            return res.status(200).json({success: 200, data: result });
        });
    },

    update: (req, res) => {
        const data = req.body;
        updateDisability(data, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, message: "Updated successfully" });
        });
    },

    remove: (req, res) => {
        const id = req.body.disability_id;
        deleteDisability(id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, message: "Deleted successfully" });
        });
    },

    getByAnimalId: (req, res) => {
        const animal_id = req.params.animal_id;
        getDisabilitiesByAnimalId(animal_id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },
    bulkInsert: (req, res) => {
        const body = req.body.disabilities;
        if (!Array.isArray(body)) {
            return res.status(400).json({ success: 400, message: "Disabilities must be an array" });
        }

        bulkInsertDisabilities(body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, message: "Bulk insert successful", data: results });
        });
    },
};
