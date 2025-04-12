const {
    createMessage,
    getAllMessages,
    getMessagesByUserId,
    getMessagesBetweenUsers,updateMessage,deleteMessage
} = require("./message.service");

module.exports = {
    sendMessage: (req, res) => {
        const body = req.body;
        body.timestamp = new Date();
        createMessage(body, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    fetchAllMessages: (req, res) => {
        getAllMessages((err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    fetchMessagesByUserId: (req, res) => {
        const user_id = req.params.user_id;
        getMessagesByUserId(user_id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },

    fetchMessagesBetween: (req, res) => {
        const { sender_id, receiver_id } = req.params;
        getMessagesBetweenUsers(sender_id, receiver_id, (err, results) => {
            if (err) return res.status(500).json({ success: 400, message: err.message });
            return res.status(200).json({success: 200, data: results });
        });
    },
    deleteMessage: (req, res) => {
        const message_id = req.params.message_id;
        deleteMessage(message_id, (err, results) => {
            if (err) {
                console.error("Delete Error:", err);
                return res.status(500).json({ success: 400, message: "Database error" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ success: 400, message: "Message not found" });
            }
            return res.status(200).json({success: 200, message: "Message deleted successfully" });
        });
    },
    
    // Update a message
    updateMessage: (req, res) => {
        const data = req.body;
        
        updateMessage(data, (err, results) => {
            if (err) {
                console.error("Update Error:", err);
                return res.status(500).json({ success: 400, message: "Database error" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ success: 400, message: "Message not found" });
            }
            return res.status(200).json({success: 200, message: "Message updated successfully" });
        });
    }
};
