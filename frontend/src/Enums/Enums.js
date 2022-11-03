export const ROLES = Object.freeze({
  CLIENT: "Klientas",
  COURIER: "Kurjeris",
  RESTAURANT: "Restoranas",
  ADMINISTRATOR: "Administratorius"
});

export const TRANSPORT_TYPES = Object.freeze({
  CAR: "Automobilis",
  BICYCLE: "Dviratis",
  SCOOTER: "Paspirtukas"
});

export const DISTRICTS_CITIES = Object.freeze({
  ALYTUS: {
    DISTRICT_NAME: "Alytaus", CITIES: ["Alytus", "Druskininkai"]
  },
  KAUNAS: {
    DISTRICT_NAME: "Kauno", CITIES: ["Kaunas", "Kėdainiai", "Raseiniai"]
  },
  KLAIPĖDA: {
    DISTRICT_NAME: "Klaipėdos", CITIES: ["Klaipėda", "Palanga", "Kretinga", "Šilutė"]
  },
  MARIJAMPOLĖ: {
    DISTRICT_NAME: "Marijampolės", CITIES: ["Marijampolė", "Šakiai"]
  },
  PANEVĖŽYS: {
    DISTRICT_NAME: "Panevėžio", CITIES: ["Panevėžys", "Biržai", "Rokiškis"]
  },
  ŠIAULIAI: {
    DISTRICT_NAME: "Šiaulių", CITIES: ["Šiauliai", "Kelmė", "Radviliškis"]
  },
  TAURAGĖ: {
    DISTRICT_NAME: "Tauragės", CITIES: ["Tauragė", "Jurbarkas", "Šilalė"]
  },
  TELŠIAI: {
    DISTRICT_NAME: "Telšių", CITIES: ["Telšiai", "Mažeikiai", "Rietavas"]
  },
  UTENA: {
    DISTRICT_NAME: "Utenos", CITIES: ["Utena", "Ignalina", "Zarasai"]
  },
  VILNIUS: {
    DISTRICT_NAME: "Vilniaus", CITIES: ["Vilnius", "Elektrėnai", "Trakai"]
  },
});

export const COURIER_STATES = Object.freeze({
  OFFLINE: "Atsijungęs",
  ONLINE: "Prisijungęs",
  WAITING_FOR_ORDER: "Laukia užsakymo",
  BUSY: "Atlieka užsakymą",
});

export const COURIER_STATES_FOR_COURIER = Object.freeze({
  ONLINE: {
    value: COURIER_STATES.ONLINE,
    text: "Pristatymų pasiūlymų dabar gauti nenoriu"
  },
  WAITING_FOR_ORDER: {
    value: COURIER_STATES.WAITING_FOR_ORDER,
    text: "Noriu gauti pristatymų pasiūlymus"
  }
});

export const ORDER_STATES = Object.freeze({
  INITIALIZED: "Sudaromas",
  PAYED: "Apmokėtas",
  IN_PROGRESS: "Vykdomas",
  FOOD_TAKEN: "Maistas paimtas iš restorano",
  COMPLETED: "Užbaigtas",
  CANCELLED: "Atšauktas"
});

export const ORDER_STATES_FOR_COURIER = Object.freeze({
  IN_PROGRESS: "Vykdomas",
  FOOD_TAKEN: "Maistas paimtas iš restorano",
  COMPLETED: "Pristatytas"
});