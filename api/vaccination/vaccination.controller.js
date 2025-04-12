const {
    createVaccination,
    getVaccinations,
    getVaccinationById,
    updateVaccination,
    deleteVaccination,bulkInsertVaccinations
} = require("./vaccination.service");

module.exports = {
    create: (req, res) => {
        const body = req.body;
        createVaccination(body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    findAll: (req, res) => {
        getVaccinations((err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    findOne: (req, res) => {
        const id = req.params.id;
        getVaccinationById(id, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            if (!result) return res.status(404).json({ success: 400, message: "Not found" });
            return res.status(200).json({success: 200, data: result });
        });
    },

    update: (req, res) => {
        const body = req.body;
        updateVaccination(body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, message: "Vaccination updated successfully" });
        });
    },

    remove: (req, res) => {
        const id = req.params.id;
        deleteVaccination(id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, message: "Vaccination deleted" });
        });
    },
    bulkInsert: (req, res) => {
        const vaccines = req.body.vaccinations;
        bulkInsertVaccinations(vaccines, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },
};
