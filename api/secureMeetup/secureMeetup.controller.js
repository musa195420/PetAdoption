
const {
    createSecureMeetup,
    getAllSecureMeetups,
    getSecureMeetupById,
    updateSecureMeetup,
    deleteSecureMeetup
} = require("./secureMeetup.service");

module.exports = {
    create: (req, res) => {
        createSecureMeetup(req.body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: "DB Error", error: err });
            return res.status(200).json({success: 200, data: results });
        });
    },

    getAll: (req, res) => {
        getAllSecureMeetups((err, results) => {
            if (err) return res.status(500).json({ success: 400, message: "DB Error", error: err });
            return res.status(200).json({success: 200, data: results });
        });
    },

    getById: (req, res) => {
        const id = req.params.id;
        getSecureMeetupById(id, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: "DB Error", error: err });
            if (!result) return res.status(404).json({ success: 400, message: "Not Found" });
            return res.status(200).json({success: 200, data: result });
        });
    },

    update: (req, res) => {
        updateSecureMeetup(req.body, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: "DB Error", error: err });
            return res.status(200).json({success: 200, data: result });
        });
    },

    deleteId: (req, res) => {
        const id = req.params.id;
        deleteSecureMeetup(id, (err, result) => {
            if (err) return res.status(500).json({ success: 400, message: "DB Error", error: err });
            return res.status(200).json({success: 200, message: "Deleted" });
        });
    }
};
