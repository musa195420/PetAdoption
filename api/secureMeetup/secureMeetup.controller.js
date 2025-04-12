const {
    createSecureMeetup,
    getAllSecureMeetups,
    getSecureMeetupById,
    updateSecureMeetup,
    deleteSecureMeetup
} = require("./secureMeetup.service");

module.exports = {
    create: async (req, res) => {
        try {
            const result = await createSecureMeetup(req.body);
            res.status(201).json({status: 200,  success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await getAllSecureMeetups();
            res.status(200).json({status: 200, success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { secure_meetup_id } = req.body; // Get id from body
            const result = await getSecureMeetupById(secure_meetup_id);
            if (!result) {
                return res.status(404).json({ status: 404, success: false, message: "Not Found" });
            }
            res.status(200).json({ status: 200,success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const result = await updateSecureMeetup(req.body);
            if (!result) {
                return res.status(404).json({ status: 404, success: false, message: "Update failed" });
            }
            res.status(200).json({ status: 200,success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    deleteId: async (req, res) => {
        try {
            const { secure_meetup_id } = req.body; // Get id from body
            const result = await deleteSecureMeetup(secure_meetup_id);
            if (!result) {
                return res.status(404).json({ status: 404, success: false, message: "Meetup not found or delete failed" });
            }
            res.status(200).json({ status: 200,success: true, message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    }
};
