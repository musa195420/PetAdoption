const pool = require("../../config/database");

module.exports = {
    createMessage: (data, callBack) => {
        pool.query(
            `INSERT INTO Message (sender_id, receiver_id, content, timestamp) VALUES (?, ?, ?, ?)`,
            [data.sender_id, data.receiver_id, data.content, data.timestamp],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getAllMessages: callBack => {
        pool.query(`SELECT * FROM Message`, [], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },

    getMessagesByUserId: (user_id, callBack) => {
        pool.query(
            `SELECT * FROM Message WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp ASC`,
            [user_id, user_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },

    getMessagesBetweenUsers: (sender_id, receiver_id, callBack) => {
        pool.query(
            `SELECT * FROM Message 
             WHERE (sender_id = ? AND receiver_id = ?) 
                OR (sender_id = ? AND receiver_id = ?) 
             ORDER BY timestamp ASC`,
            [sender_id, receiver_id, receiver_id, sender_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
    deleteMessage: (message_id, callBack) => {
        pool.query(
            `DELETE FROM Message WHERE message_id = ?`,
            [message_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },
    
    // Update message content
    updateMessage: (data, callBack) => {
        const fields = [];
        const values = [];
    
        if (data.content != null) {
            fields.push("content = ?");
            values.push(data.content);
        }
    
        if (fields.length === 0) {
            return callBack(new Error("No fields provided for update."));
        }
    
        values.push(data.message_id);
    
        const query = `UPDATE Message SET ${fields.join(", ")} WHERE message_id = ?`;
    
        pool.query(query, values, (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    }
};
