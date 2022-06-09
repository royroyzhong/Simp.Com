/**
 * Mock user for prototyping.
 */
export default mockUser = {
    username: "Doge Commerce", 
    orders: {
        processed: 10086,
        shipped: 9999,
        arrived: 1,
        restock: 1024
    },
    orders_detail: {
        Unprocessed: [{Order_Number: 1234, Products: [{id:1111, productName: "Sandwitch"}], Status: "Unprocessed"},
        {Order_Number: 1235, Products: [{id:1101, productName: "Orange Juice"}], Status: "Unprocessed"}],
        Shipped:[{Order_Number: 1034, Products: [{id:1111, productName: "Sandwitch"}], Status: "Shipped"},
        {Order_Number: 1035, Products: [{id:1101, productName: "Orange Juice"}], Status: "Shipped"}],
        Delivered: [{Order_Number: 1020, Products: [{id:1111, productName: "Sandwitch"}], Status: "Delivered"},
        {Order_Number: 1021, Products: [{id:1101, productName: "Orange Juice"}], Status: "Delivered"}],
    },
    status: {
        bestSeller: "茴香臭豆腐 榴莲小笼包 孟婆汤 套餐"
    }
}