const pool = require("../../config/database");

module.exports = {
    createSecureMeetup: (data, callBack) => {
        pool.query(
            `INSERT INTO SecureMeetup (meetup_id, proof_pic_url, adopter_id_front_url, adopter_id_back_url, phone_number, current_address, time, submitted_by)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.meetup_id,
                data.proof_pic_url,
                data.adopter_id_front_url,
                data.adopter_id_back_url,
                data.phone_number,
                data.current_address,
                data.time,
                data.submitted_by
            ],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getAllSecureMeetups: callBack => {
        pool.query(
            `SELECT * FROM SecureMeetup`,
            [],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getSecureMeetupById: (secure_meetup_id, callBack) => {
        pool.query(
            `SELECT * FROM SecureMeetup WHERE secure_meetup_id = ?`,
            [secure_meetup_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results[0]);
            }
        );
    },

    updateSecureMeetup: (data, callBack) => {
        let fields = [];
        let values = [];

        for (let key in data) {
            if (key !== "secure_meetup_id" && data[key] !== null && data[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(data[key]);
            }
        }

        values.push(data.secure_meetup_id);

        const query = `UPDATE SecureMeetup SET ${fields.join(", ")} WHERE secure_meetup_id = ?`;

        pool.query(query, values, (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    deleteSecureMeetup: (secure_meetup_id, callBack) => {
        pool.query(
            `DELETE FROM SecureMeetup WHERE secure_meetup_id = ?`,
            [secure_meetup_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    }
};
