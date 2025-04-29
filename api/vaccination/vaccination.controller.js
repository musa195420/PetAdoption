const { createVaccination, getVaccinations, getVaccinationById, updateVaccination, deleteVaccination, bulkInsertVaccinations ,getVaccinationByAnimalId} = require("./vaccination.service");

module.exports = {
    create: async (req, res) => {
        const body = req.body;
        try {
            const results = await createVaccination(body);
            return res.status(200).json({ success:true,status: 200,  data: results });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const results = await getVaccinations();
            return res.status(200).json({ success:true,status: 200,  data: results });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    findByAnimalId: async (req, res) => {
        try {
            const { animal_id } = req.body;
    
            if (!animal_id) {
                return res.status(400).json({ success: false, status: 400, message: "animal_id is required." });
            }
    
            const results = await getVaccinationByAnimalId(animal_id);
    
            return res.status(200).json({ success: true, status: 200, data: results });
        } catch (err) {
            return res.status(500).json({ success: false, status: 500, message: err.message });
        }
    },

    findOne: async (req, res) => {
        const { vaccine_id } = req.body; // Now taking vaccine_id from the request body
        try {
            const result = await getVaccinationById(vaccine_id); // Use vaccine_id from the body
            if (!result) return res.status(404).json({ success:false,status: 400, message: "Not found" });
            return res.status(200).json({ success:true,status: 200,  data: result });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    update: async (req, res) => {
        const data = req.body;
        try {
            await updateVaccination(data);
            return res.status(200).json({ success:true,status: 200,  message: "Vaccination updated successfully" });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    remove: async (req, res) => {
        const { vaccine_id } = req.body; // Now taking vaccine_id from the request body
        try {
            await deleteVaccination(vaccine_id); // Use vaccine_id from the body
            return res.status(200).json({ success:true,status: 200,  message: "Vaccination deleted" });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },

    bulkInsert: async (req, res) => {
        const vaccines = req.body.vaccinations;
        try {
            const results = await bulkInsertVaccinations(vaccines);
            return res.status(200).json({ success:true,status: 200,  data: results });
        } catch (err) {
            return res.status(500).json({ success:false,status: 400, message: err.message });
        }
    },
};
