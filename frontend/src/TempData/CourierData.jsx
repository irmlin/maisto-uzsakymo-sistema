import { TRANSPORT_TYPES, COURIER_STATES } from "../Enums/Enums";

const NewCourierData = [
{
    courierNumber: 1,
    courierName: "Petras",
    courierSurname: "Petraitis",
    courierBirthDate: new Date(2001, 11, 24),
    courierWorkStart: new Date(2021, 10, 18),
    courierPhone: "861529465",
    courierEmail: "Petraitis123@gmail.com",
    courierTransport: TRANSPORT_TYPES.CAR,
    courierStatus: COURIER_STATES.WAITING_FOR_ORDER,
    courierRate: 1.7
},
{
  courierNumber: 2,
  courierName: "Vilius",
  courierSurname: "Vilaitis",
  courierBirthDate: new Date(1998, 5, 11),
  courierWorkStart: new Date(2021, 5, 5),
  courierPhone: "863591461",
  courierEmail: "Viliukas889@gmail.com",
  courierTransport: TRANSPORT_TYPES.BICYCLE,
  courierStatus: COURIER_STATES.ONLINE,
  courierRate: 1.8
}

]

export default NewCourierData;