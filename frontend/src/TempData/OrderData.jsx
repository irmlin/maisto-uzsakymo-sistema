import { ORDER_STATES } from "../Enums/Enums";

const OrderData = [
  {
    orderNumber: "1",
    orderState: ORDER_STATES.COMPLETED,
    orderDate: new Date(2018, 11, 24, 10, 33),
    orderPrice: 10.50,
    recipientAddress: "Pramonės pr. 100, Kaunas",
    recipientName: "Mantas",
    recipientLastName: "Mantaitis",
    recipientComments: "Palikite prie durų!",
    restaurantName: "Can Can Pizza",
    restaurantAddress: "Savanorių pr. 40, Kaunas"
  },
  {
    orderNumber: "2",
    orderState: ORDER_STATES.COMPLETED,
    orderDate: new Date(2018, 11, 24, 10, 33),
    orderPrice: 15.50,
    recipientAddress: "Pramonės pr. 200, Kaunas",
    recipientName: "Mantas",
    recipientLastName: "Mantaitis",
    recipientComments: "Palikite prie durų!",
    restaurantName: "Can Can Pizza",
    restaurantAddress: "Savanorių pr. 40, Kaunas"
  },
  {
    orderNumber: "3",
    orderState: ORDER_STATES.COMPLETED,
    orderDate: new Date(2018, 11, 24, 10, 33),
    orderPrice: 20.50,
    recipientAddress: "Pramonės pr. 1, Kaunas",
    recipientName: "Mantas",
    recipientLastName: "Mantaitis",
    recipientComments: "Palikite prie durų!",
    restaurantName: "Can Can Pizza",
    restaurantAddress: "Savanorių pr. 40, Kaunas"
  },
];

export default OrderData;