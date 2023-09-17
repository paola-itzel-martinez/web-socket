const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) throw new Error("Add desktop");

const socket = io();
const desktop = searchParams.get("escritorio");
const desktopLbl = document.querySelector("#desktopLbl");
const actualTicket = document.querySelector("#actualTicket");
const nextButton = document.querySelector("#nextButton");
const withoutTicketLbl = document.querySelector("#withoutTicketLbl");
const toDoLbl = document.querySelector("#toDoLbl");

desktopLbl.innerHTML = `Desktop ${desktop}`;
withoutTicketLbl.style.display = "none";

socket.on("connect", () => {
  nextButton.disabled = false;
});

socket.on("actual-status", ({ tickets }) => {
  toDoLbl.innerHTML = tickets.length;
});

socket.on("disconnect", () => {
  nextButton.disabled = true;
});

nextButton.addEventListener("click", () => {
  socket.emit("take-ticket", { desktop }, (payload) => {
    const { ok, message, ticket } = payload;

    if (!ok) {
      actualTicket.innerHTML = "Anybody";
      withoutTicketLbl.innerHTML = message;
      withoutTicketLbl.style.display = "block";

      return;
    }

    actualTicket.innerHTML = ticket.number;
  });
});
