const pool = require("../../config/database");

module.exports = {
    createMeetup: (data, callBack) => {
        pool.query(
            `INSERT INTO MeetupRequest (pet_id, donor_id, adopter_id, location, time) VALUES (?, ?, ?, ?, ?)`,
            [data.pet_id, data.donor_id, data.adopter_id, data.location, data.time],
            callBack
        );
    },

    getMeetups: (callBack) => {
        pool.query(`SELECT * FROM MeetupRequest`, callBack);
    },

    getMeetupById: (id, callBack) => {
        pool.query(`SELECT * FROM MeetupRequest WHERE meetup_id = ?`, [id], callBack);
    },

    updateMeetup: (data, callBack) => {
        let updates = [];
        let params = [];

        if (data.pet_id !== undefined) {
            updates.push("pet_id = ?");
            params.push(data.pet_id);
        }
        if (data.donor_id !== undefined) {
            updates.push("donor_id = ?");
            params.push(data.donor_id);
        }
        if (data.adopter_id !== undefined) {
            updates.push("adopter_id = ?");
            params.push(data.adopter_id);
        }
        if (data.location !== undefined) {
            updates.push("location = ?");
            params.push(data.location);
        }
        if (data.time !== undefined) {
            updates.push("time = ?");
            params.push(data.time);
        }
        if (data.is_accepted_by_donor !== undefined) {
            updates.push("is_accepted_by_donor = ?");
            params.push(data.is_accepted_by_donor);
        }
        if (data.is_accepted_by_adopter !== undefined) {
            updates.push("is_accepted_by_adopter = ?");
            params.push(data.is_accepted_by_adopter);
        }

        params.push(data.meetup_id);

        const sql = `UPDATE MeetupRequest SET ${updates.join(", ")} WHERE meetup_id = ?`;

        pool.query(sql, params, callBack);
    },

    deleteMeetup: (id, callBack) => {
        pool.query(`DELETE FROM MeetupRequest WHERE meetup_id = ?`, [id], callBack);
    },

    getMeetupsByUser: (user_id, callBack) => {
        pool.query(
            `SELECT * FROM MeetupRequest WHERE donor_id = ? OR adopter_id = ?`,
            [user_id, user_id],
            callBack
        );
    },

    getMeetupsByPet: (pet_id, callBack) => {
        pool.query(`SELECT * FROM MeetupRequest WHERE pet_id = ?`, [pet_id], callBack);
    },
};
