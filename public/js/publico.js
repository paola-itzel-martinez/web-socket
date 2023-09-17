const socket = io();
const lblTicket1 = document.querySelector("#lblTicket1");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");

socket.on("actual-status", ({ lastFour }) => {
  const audio = new Audio("./audio/new-ticket.mp3");

  if (audio) audio.play();

  const [ticket1, ticket2, ticket3, ticket4] = lastFour;

  if (ticket1) {
    lblTicket1.innerHTML = ticket1.number;
    lblEscritorio1.innerHTML = `Desktop: ${ticket1.desktop}`;
  }

  if (ticket2) {
    lblTicket2.innerHTML = ticket2.number;
    lblEscritorio2.innerHTML = `Desktop: ${ticket2.desktop}`;
  }

  if (ticket3) {
    lblTicket3.innerHTML = ticket3.number;
    lblEscritorio3.innerHTML = `Desktop: ${ticket3.desktop}`;
  }

  if (ticket4) {
    lblTicket4.innerHTML = ticket4.number;
    lblEscritorio4.innerHTML = `Desktop: ${ticket4.desktop}`;
  }
});
