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
    create: async (req, res) => {
        try {
            const body = req.body;
            const results = await createDisability(body);
            return res.status(200).json({ success: 200, data: results });
        } catch (err) {
            return res.status(500).json({ success: 400, message: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const results = await getAllDisabilities();
            return res.status(200).json({ success: 200, data: results });
        } catch (err) {
            return res.status(500).json({ success: 400, message: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { disability_id } = req.body; // Use ID from the request body instead of params
            const result = await getDisabilityById(disability_id);
            if (!result) {
                return res.status(404).json({ success: 400, message: "Disability not found" });
            }
            return res.status(200).json({ success: 200, data: result });
        } catch (err) {
            return res.status(500).json({ success: 400, message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const data = req.body;
            const results = await updateDisability(data);
            return res.status(200).json({ success: 200, message: "Updated successfully" });
        } catch (err) {
            return res.status(500).json({ success: 400, message: err.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { disability_id } = req.body; // Use ID from the request body instead of params
            const results = await deleteDisability(disability_id);
            return res.status(200).json({ success: 200, message: "Deleted successfully" });
        } catch (err) {
            return res.status(500).json({ success: 400, message: err.message });
        }
    },

    getByAnimalId: async (req, res) => {
        try {
            const { animal_id } = req.body; // Get animal_id from request body
            const results = await getDisabilitiesByAnimalId(animal_id);
            return res.status(200).json({ success: 200, data: results });
        } catch (err) {
            return res.status(500).json({ success: 400, message: err.message });
        }
    },

    bulkInsert: async (req, res) => {
        try {
            const body = req.body.disabilities;
            if (!Array.isArray(body)) {
                return res.status(400).json({ success: 400, message: "Disabilities must be an array" });
            }
            const results = await bulkInsertDisabilities(body);
            return res.status(200).json({ success: 200, message: "Bulk insert successful", data: results });
        } catch (err) {
            return res.status(500).json({ success: 400, message: err.message });
        }
    },
};
