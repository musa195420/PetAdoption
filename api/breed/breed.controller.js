const { createBreed, getBreeds, getBreedById, updateBreed, deleteBreed, bulkInsertBreeds } = require("./breed.service");

module.exports = {
    addBreed: (req, res) => {
        const body = req.body;
        createBreed(body, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err });
            return res.status(200).json({ success: 1, data: results });
        });
    },

    getAllBreeds: (req, res) => {
        getBreeds((err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err });
            return res.status(200).json({ success: 1, data: results });
        });
    },

    getBreedById: (req, res) => {
        const id = req.params.id;
        getBreedById(id, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err });
            if (!results) return res.status(404).json({ success: 0, message: "Breed not found" });
            return res.status(200).json({ success: 1, data: results });
        });
    },

    updateBreed: (req, res) => {
        const data = req.body;
        updateBreed(data, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err });
            return res.status(200).json({ success: 1, message: "Breed updated successfully" });
        });
    },

    deleteBreed: (req, res) => {
        const id = req.params.id;
        deleteBreed(id, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err });
            return res.status(200).json({ success: 1, message: "Breed deleted successfully" });
        });
    },

    bulkBreedInsert: (req, res) => {
        const { breeds } = req.body; // [{name: "Labrador", animal_id: 1}, ...]
        bulkInsertBreeds(breeds, (err, results) => {
            if (err) return res.status(500).json({ success: 0, message: err });
            return res.status(200).json({ success: 1, message: "Breeds inserted successfully", data: results });
        });
    },
};
