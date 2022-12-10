export const ROLES = Object.freeze({
  CLIENT: {ROLENAME: "Klientas", TABLENAME: "clients"},
  COURIER: {ROLENAME: "Kurjeris", TABLENAME: "couriers"},
  RESTAURANT: {ROLENAME: "Restoranas", TABLENAME: "restaurants"},
  ADMINISTRATOR: {ROLENAME: "Administratorius", TABLENAME: "admins"}
});

export const COURIER_STATES = Object.freeze({
  OFFLINE: "Atsijungęs",
  ONLINE: "Prisijungęs",
  WAITING_FOR_ORDER: "Laukia užsakymo",
  BUSY: "Atlieka užsakymą",
});