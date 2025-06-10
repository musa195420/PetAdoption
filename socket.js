const { setIoInstance } = require("./socketInstance");
const messageService = require("./api/message/message.service"); // update path

function initSocket(io) {
  setIoInstance(io);

  io.on("connection", (socket) => {
    //console.log("✅ Socket connected:", socket.id);

    socket.on("joinRoom", ({ senderId, receiverId }) => {
      const roomId = [senderId, receiverId].sort().join('_');
      socket.join(roomId);
     // console.log(`👥 Joined room: ${roomId}`);
    });

    socket.on("sendMessage", async (message) => {
      const { sender_id, receiver_id } = message;

      if (!sender_id || !receiver_id) {
        console.error("❌ Missing sender_id or receiver_id:", message);
        return;
      }

      const roomId = [sender_id, receiver_id].sort().join('_');

      try {
        const saved = await messageService.createMessage(message);
        io.to(roomId).emit("receiveMessage", saved[0]); // send saved version
      } catch (err) {
        console.error("❌ Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
    //  console.log("❎ Socket disconnected:", socket.id);
    });
  });
}

module.exports = { initSocket };
