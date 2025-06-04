const {
    createMessage,
    getAllMessages,
    getMessagesByUserId,
    getMessagesBetweenUsers,
    updateMessage,
    deleteMessage,
    getChatUsers
} = require("./message.service");

module.exports = {
    sendMessage: async (req, res) => {
        try {
            const body = req.body;
            body.timestamp = new Date();
            const result = await createMessage(body);
            res.status(200).json({ success: true, message: "Message sent", data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    fetchAllMessages: async (req, res) => {
        try {
            const result = await getAllMessages();
            res.status(200).json({ success: true, data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    fetchMessagesByUserId: async (req, res) => {
        try {
            const { user_id } = req.body;
            const result = await getMessagesByUserId(user_id);
            res.status(200).json({ success: true, data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },
     fetchMessageInfoByUserId: async (req, res) => {
        try {
            const { user_id } = req.body;
            const result = await getChatUsers(user_id);
            res.status(200).json({ success: true, data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    fetchMessagesBetween: async (req, res) => {
        try {
            const { sender_id, receiver_id } = req.body;
            const result = await getMessagesBetweenUsers(sender_id, receiver_id);
            res.status(200).json({ success: true, data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    deleteMessage: async (req, res) => {
        try {
            const { message_id } = req.body;
            const result = await deleteMessage(message_id);
    
            if (!result || result.length === 0) {
                return res.status(404).json({ success: false, message: "Message not found", status: 404 });
            }
    
            res.status(200).json({ success: true, message: "Message deleted", data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },

    updateMessage: async (req, res) => {
        try {
            const result = await updateMessage(req.body);

            if (!result.length)
                return res.status(404).json({ success: false, message: "Message not found", status: 404 });

            res.status(200).json({ success: true, message: "Message updated", data: result, status: 200 });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, status: 500 });
        }
    },
};
