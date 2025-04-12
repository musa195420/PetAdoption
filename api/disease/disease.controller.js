const {
    createDisease,
    getDiseases,
    getDiseaseById,
    updateDisease,
    deleteDisease,
    bulkInsertDiseases
} = require("./disease.service");

module.exports = {
    create: (req, res) => {
        createDisease(req.body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    list: (req, res) => {
        getDiseases((err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    getById: (req, res) => {
        getDiseaseById(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            if (!result) return res.status(404).json({ success: 400, message: "Not found" });
            return res.status(200).json({success: 200, data: result });
        });
    },

    update: (req, res) => {
        updateDisease(req.body, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, message: "Updated successfully" });
        });
    },

    deleteDisease: (req, res) => {
        deleteDisease(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, message: "Deleted successfully" });
        });
    },

    bulk: (req, res) => {
        bulkInsertDiseases(req.body.diseases, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, message: "Bulk inserted", data: result });
        });
    },
    getByAnimalId: (req, res) => {
        const animal_id = req.params.animal_id;
        if (!animal_id) {
            return res.status(400).json({ success: 400, message: "Animal ID is required" });
        }
    
        require("./disease.service").getDiseasesByAnimalId(animal_id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },
};
