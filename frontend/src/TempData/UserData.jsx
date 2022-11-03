import { COURIER_STATES, TRANSPORT_TYPES } from "../Enums/Enums";

const DEFAULT_USERS = {
  COURIER: {
    name: "Kurjeris1",
    lastName: "Jonaitis",
    birthDate: new Date("1900-01-01"),
    employmentDate: new Date("2022-11-01"),
    phoneNumber: "860000001",
    email: "courier1@mail.com",
    transport: TRANSPORT_TYPES.CAR,
    userName: "kurjerissss123",
    password: "sadasdas",
    state: COURIER_STATES.WAITING_FOR_ORDER
  },
CLIENT: {

  },
RESTAURANT: {

  },
ADMINISTRATOR: {

  }
};

export default DEFAULT_USERS;