const { createPet, getAllPets, getPetById ,deletePet} = require("./pet.service");

module.exports = {
    createNewPet: (req, res) => {
        const body = req.body;

        createPet(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Error: " + err
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Pet created successfully",
                data: results
            });
        });
    },

    fetchAllPets: (req, res) => {
        getAllPets((err, results) => {
            if (err) {
                return res.status(500).json({ success: 0, message: "Failed to fetch pets" });
            }

            return res.json({ success: 1, data: results });
        });
    },

    fetchPetById: (req, res) => {
        const id = req.params.id;

        getPetById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ success: 0, message: "Error fetching pet" });
            }
            if (!results) {
                return res.json({ success: 0, message: "Pet not found" });
            }
            return res.json({ success: 1, data: results });
        });
    },
    deletePetById: (req, res) => {
        const id = req.params.id;
    
        deletePet(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database Error: " + err,
                });
            }
    
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Pet not found",
                });
            }
    
            return res.json({
                success: 1,
                message: "Pet deleted successfully",
            });
        });
    }

    
};
