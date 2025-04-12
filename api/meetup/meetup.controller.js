const {
    createMeetup,
    getMeetups,
    getMeetupById,
    updateMeetup,
    deleteMeetup,
    getMeetupsByUser,
    getMeetupsByPet
} = require("./meetup.service");

module.exports = {
    create: (req, res) => {
        createMeetup(req.body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: "DB error", error: err });
            return res.status(200).json({success: 200, data: results });
        });
    },
    getAll: (req, res) => {
        getMeetups((err, results) => {
            if (err) return res.status(500).json({ success: 400, message: "DB error", error: err });
            return res.status(200).json({success: 200, data: results });
        });
    },
    getById: (req, res) => {
        getMeetupById(req.params.meetup_id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, error: err });
            return res.status(200).json({success: 200, data: results });
        });
    },
    update: (req, res) => {
        updateMeetup(req.body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, error: err });
            return res.status(200).json({success: 200, data: results });
        });
    },
    remove: (req, res) => {
        deleteMeetup(req.params.meetup_id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, error: err });
            return res.status(200).json({success: 200, message: "Deleted successfully" });
        });
    },
    getByUser: (req, res) => {
        getMeetupsByUser(req.params.user_id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, error: err });
            return res.status(200).json({success: 200, data: results });
        });
    },
    getByPet: (req, res) => {
        getMeetupsByPet(req.params.pet_id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, error: err });
            return res.status(200).json({success: 200, data: results });
        });
    },
};
