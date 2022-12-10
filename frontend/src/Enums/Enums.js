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

export const COUNTIES_CITIES = Object.freeze({
  ALYTUS: {
    COUNTY_NAME: "Alytaus", CITIES: ["Alytus", "Druskininkai"]
  },
  KAUNAS: {
    COUNTY_NAME: "Kauno", CITIES: ["Kaunas", "Kėdainiai", "Raseiniai"]
  },
  KLAIPĖDA: {
    COUNTY_NAME: "Klaipėdos", CITIES: ["Klaipėda", "Palanga", "Kretinga", "Šilutė"]
  },
  MARIJAMPOLĖ: {
    COUNTY_NAME: "Marijampolės", CITIES: ["Marijampolė", "Šakiai"]
  },
  PANEVĖŽYS: {
    COUNTY_NAME: "Panevėžio", CITIES: ["Panevėžys", "Biržai", "Rokiškis"]
  },
  ŠIAULIAI: {
    COUNTY_NAME: "Šiaulių", CITIES: ["Šiauliai", "Kelmė", "Radviliškis"]
  },
  TAURAGĖ: {
    COUNTY_NAME: "Tauragės", CITIES: ["Tauragė", "Jurbarkas", "Šilalė"]
  },
  TELŠIAI: {
    COUNTY_NAME: "Telšių", CITIES: ["Telšiai", "Mažeikiai", "Rietavas"]
  },
  UTENA: {
    COUNTY_NAME: "Utenos", CITIES: ["Utena", "Ignalina", "Zarasai"]
  },
  VILNIUS: {
    COUNTY_NAME: "Vilniaus", CITIES: ["Vilnius", "Elektrėnai", "Trakai"]
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

export const IMMUTABLE_PROFILE_INFO_COURIER = [
  "Vardas, Pavardė",
  "Gimimo Data",
  "Įdarbintas/a nuo",
  "Telefono Nr.",
  "Patvirtintas Administratoriaus",
  "Miestas"
];