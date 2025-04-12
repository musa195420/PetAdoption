const supabase = require("../../config/database");

module.exports = {
    createMessage: async (data) => {
        const { sender_id, receiver_id, content, timestamp } = data;
        const { data: result, error } = await supabase
            .from("message")
            .insert([{ sender_id, receiver_id, content, timestamp }])
            .select();

        if (error) throw new Error(error.message);
        return result;
    },

    getAllMessages: async () => {
        const { data: result, error } = await supabase
            .from("message")
            .select("*");

        if (error) throw new Error(error.message);
        return result;
    },

    getMessagesByUserId: async (user_id) => {
        const { data: result, error } = await supabase
            .from("message")
            .select("*")
            .or(`sender_id.eq.${user_id},receiver_id.eq.${user_id}`)
            .order("timestamp", { ascending: true });

        if (error) throw new Error(error.message);
        return result;
    },

    getMessagesBetweenUsers: async (sender_id, receiver_id) => {
        const { data: result, error } = await supabase
            .from("message")
            .select("*")
            .or(
                `and(sender_id.eq.${sender_id},receiver_id.eq.${receiver_id}),and(sender_id.eq.${receiver_id},receiver_id.eq.${sender_id})`
            )
            .order("timestamp", { ascending: true });
    
        if (error) throw new Error(error.message);
        return result;
    },

    deleteMessage: async (message_id) => {
        const { data: result, error } = await supabase
            .from("message")
            .delete()
            .eq("message_id", message_id);

        if (error) throw new Error(error.message);
        return result;
    },

    updateMessage: async (data) => {
        const { message_id, content } = data;

        const { data: result, error } = await supabase
            .from("message")
            .update({ content })
            .eq("message_id", message_id)
            .select();

        if (error) throw new Error(error.message);
        return result;
    },
};
