const {
    createMeetup,
    getMeetups,
    getMeetupById,
    updateMeetup,
    deleteMeetup,
    getMeetupsByUser,
    getMeetupsByPet,
} = require("./meetup.service");

module.exports = {
    create: async (req, res) => {
        try {
            const result = await createMeetup(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await getMeetups();
            if (!result || result.length === 0) {
                return res.status(404).json({ status: 404, success: false, message: "No meetups found." });
            }
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { meetup_id } = req.body;
            const result = await getMeetupById(meetup_id);
            if (!result) {
                return res.status(404).json({ status: 404, success: false, message: "Meetup not found." });
            }
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const result = await updateMeetup(req.body);
            if (!result || result.length === 0) {
                return res.status(404).json({ status: 404, success: false, message: "Meetup not found or update failed." });
            }
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { meetup_id } = req.body;
            const result = await deleteMeetup(meetup_id);
            if (!result || result.length === 0) {
                return res.status(404).json({ status: 404, success: false, message: "Meetup not found or delete failed." });
            }
            res.status(200).json({ success: true, message: "Deleted", data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    getByUser: async (req, res) => {
        try {
            const { user_id } = req.body;
            const result = await getMeetupsByUser(user_id);
            if (!result || result.length === 0) {
                return res.status(404).json({ status: 404, success: false, message: "No meetups found for this user." });
            }
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },

    getByPet: async (req, res) => {
        try {
            const { pet_id } = req.body;
            const result = await getMeetupsByPet(pet_id);
            if (!result || result.length === 0) {
                return res.status(404).json({ status: 404, success: false, message: "No meetups found for this pet." });
            }
            res.status(200).json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ status: 500, success: false, message: err.message });
        }
    },
};
