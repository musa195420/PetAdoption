const { createDisease, getDiseases, getDiseaseById, updateDisease, deleteDisease, bulkInsertDiseases, getDiseasesByAnimalId } = require("./disease.service");

module.exports = {
    create: async (req, res) => {
        const data = req.body;
        try {
            const result = await createDisease(data);
            return res.status(200).json({ success:true,status: 200,  data: result });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    list: async (req, res) => {
        try {
            const results = await getDiseases();
            return res.status(200).json({ success:true,status: 200,  data: results });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    getById: async (req, res) => {
        const { disease_id } = req.body; // Now using body to get disease_id
        try {
            const result = await getDiseaseById(disease_id);
            if (!result) return res.status(404).json({ success:false,status: 400, message: "Not found" });
            return res.status(200).json({ success:true,status: 200,  data: result });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    update: async (req, res) => {
        const data = req.body;
        try {
            await updateDisease(data);
            return res.status(200).json({ success:true,status: 200,  message: "Updated successfully" });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    deleteDisease: async (req, res) => {
        const { disease_id } = req.body; // Now using body to get disease_id
        try {
            await deleteDisease(disease_id);
            return res.status(200).json({ success:true,status: 200,  message: "Deleted successfully" });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    bulk: async (req, res) => {
        const diseases = req.body.diseases;
        try {
            const result = await bulkInsertDiseases(diseases);
            return res.status(200).json({ success:true,status: 200,  message: "Bulk inserted", data: result });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    getByAnimalId: async (req, res) => {
        const { animal_id } = req.body; // Using body to get animal_id
        if (!animal_id) {
            return res.status(400).json({ success:false,status: 400, message: "Animal ID is required" });
        }
        try {
            const results = await getDiseasesByAnimalId(animal_id);
            return res.status(200).json({ success:true,status: 200,  data: results });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },
};
