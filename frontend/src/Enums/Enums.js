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
  PAYED: "Apmokėtas",                                 // when user created the order
  APPROVED_BY_RESTAURANT: "Patvirtintas restorano",   // when restaurant sees the order and accepts it
  DONE_COOKING: "Pagamintas",                         // when restaurant is finished cooking the food
  FOOD_TAKEN: "Maistas paimtas",                      // when courier has taken the food
  COMPLETED: "Užbaigtas",                             // when courier has delivered the food
  CANCELLED: "Atšauktas"                              // when client or restaurant cancel the order
});

export const ORDER_STATES_FOR_COURIER = Object.freeze({
  FOOD_TAKEN: "Maistas paimtas",
  COMPLETED: "Užbaigtas"         
});

export const IMMUTABLE_PROFILE_INFO_COURIER = [
  "Vardas, pavardė",
  "Gimimo data",
  "Įdarbintas/a nuo",
  "Telefono dr.",
  "Patvirtintas administratoriaus",
  "Miestas"
];