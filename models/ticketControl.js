const fs = require("fs");
const { isEmpty, isNil } = require("lodash");
const path = require("path");

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour,
    };
  }

  init() {
    let db;

    try {
      db = require("../db/data.json");

      if (isEmpty(db) || db.today !== this.today) {
        this.saveDB();
      }

      this.tickets = db.tickets;
      this.last = db.last;
      this.lastFour = db.lastFour;
    } catch (error) {
      if (isNil(db)) this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, "../db/data.json");

    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  new() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveDB();

    return `Ticket ${ticket.number}`;
  }

  takeTicket(desktop) {
    if (this.tickets.length === 0) return null;

    const ticket = this.tickets.shift();

    ticket.desktop = desktop;

    this.lastFour.unshift(ticket);

    this.lastFour = this.lastFour.slice(0, 4);

    this.saveDB();

    return ticket;
  }
}

module.exports = TicketControl;
