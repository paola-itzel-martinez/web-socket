// Referencias del HTML
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const createButton = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  createButton.disabled = false;
});

socket.on("disconnect", () => {
  createButton.disabled = true;
});

socket.on("last-ticket", (payload) => {
  lblNuevoTicket.innerHTML = `Ticket ${payload}`;
});

createButton.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNuevoTicket.innerHTML = ticket;
  });
});
