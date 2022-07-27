/**
 * A mock resource utility. It only provide some dummy data, thus cannot
 * mimic a real REST resource.
 */

export const quinn = {
  name: "Quinn Doge",
  orders: {
    processed: 10086,
    shipped: 10000,
    recieved: 1,
    restore: 2048,
  },
  orders_detail: {
    Unprocessed: [
      {
        id: 1,
        orderNumber: 1234,
        products: [
          { id: 1111, productName: "Sandwitch" },
          { id: 1111, productName: "Sandwitch" },
        ],
        status: "Unprocessed",
      },
      {
        id: 2,
        orderNumber: 1235,
        products: [{ id: 1101, productName: "Orange Juice" }],
        status: "Unprocessed",
      },
    ],
    Shipped: [
      {
        id: 1,
        orderNumber: 1034,
        products: [{ id: 1111, productName: "Sandwitch" }],
        status: "Shipped",
      },
      {
        id: 2,
        orderNumber: 1035,
        products: [{ id: 1101, productName: "Orange Juice" }],
        status: "Shipped",
      },
    ],
    Delivered: [
      {
        id: 1,
        orderNumber: 1020,
        products: [{ id: 1111, productName: "Sandwitch" }],
        status: "Delivered",
      },
      {
        id: 2,
        orderNumber: 1021,
        products: [{ id: 1101, productName: "Orange Juice" }],
        status: "Delivered",
      },
    ],
  },
  stats: {
    bestSeller: "想吃锅贴",
  },
  recentAwaitingActions: [231, 434, 556],
  topProducts: ["item1", "item2", "item3"],
  email: "123@gmail.com",
  address: "1163 Maple Ave",
  phone: "(778)123-4561",
  firstName: "Quinn",
  lastName: "Doge",
};

export const gavin = {
  name: "Gavin doge",
  products: [
    "B.O.1",
    "B.O.2",
    "B.O.3",
    "B.O.4",
    "B.O.1",
    "B.O.2",
    "B.O.3",
    "B.O.4",
    "B.O.1",
    "B.O.2",
    "B.O.3",
    "B.O.4",
    "B.O.1",
    "B.O.2",
    "B.O.3",
    "B.O.4",
  ],
};
