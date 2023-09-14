const socketController = (socket) => {
  console.info(`client ${socket.id} connected`);

  socket.on("send-message", (payload, callback) => {
    const id = 123456;

    callback({ id, date: new Date().getTime() });

    socket.broadcast.emit("send-message", payload);
  });

  socket.on("disconnect", () => {
    console.info("disconnect");
  });
};

module.exports = {
  socketController,
};
