const TicketControl = require("../../models/ticketControl");

const ticketControl = new TicketControl();
const socketController = (socket) => {
  const setActualStatus = ({ toSelf = false, toOthers = false }) => {
    const callName = "actual-status";
    const data = {
      tickets: ticketControl.tickets,
      lastFour: ticketControl.lastFour,
    };

    if (toSelf) socket.emit(callName, data);

    if (toOthers) socket.broadcast.emit(callName, data);
  };

  socket.emit("last-ticket", ticketControl.last);

  setActualStatus({ toSelf: true });

  socket.on("next-ticket", (_, callback) => {
    callback(ticketControl.new());
    setActualStatus({ toOthers: true });
  });

  socket.on("take-ticket", ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        message: "Missing desktop",
      });
    }

    const ticket = ticketControl.takeTicket(desktop);

    if (!ticket) {
      return callback({
        ok: false,
        message: "Without tickets",
      });
    }

    setActualStatus({ toOthers: true, toSelf: true });

    callback({
      ok: true,
      ticket,
    });
  });
};

module.exports = {
  socketController,
};
