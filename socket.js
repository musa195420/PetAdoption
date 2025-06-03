const { supabase } = require('./config/database');

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their personal room`);
    });

    socket.on("send_message", async (message) => {
      const { sender_id, receiver_id, content } = message;
      const timestamp = new Date();

      const { data, error } = await supabase.from("message").insert([
        { sender_id, receiver_id, content, timestamp },
      ]);

      if (error) {
        socket.emit("error_message", error.message);
        return;
      }

      io.to(receiver_id).emit("receive_message", {
        sender_id,
        content,
        timestamp,
      });

      socket.emit("message_sent", { success: true });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = { initSocket };
