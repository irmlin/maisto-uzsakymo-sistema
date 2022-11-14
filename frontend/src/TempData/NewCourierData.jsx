import { TRANSPORT_TYPES } from "../Enums/Enums";

const NewCourierData = [
{
    courierNumber: 1,
    courierName: "Petras",
    courierSurname: "Petraitis",
    courierBirthDate: new Date(2001, 11, 24),
    courierPhone: "861529465",
    courierEmail: "Petraitis123@gmail.com",
    courierTransport: TRANSPORT_TYPES.CAR,
},
{
  courierNumber: 2,
  courierName: "Vilius",
  courierSurname: "Vilaitis",
  courierBirthDate: new Date(1998, 5, 11),
  courierPhone: "863591461",
  courierEmail: "Viliukas889@gmail.com",
  courierTransport: TRANSPORT_TYPES.BICYCLE,
}

]

export default NewCourierData;