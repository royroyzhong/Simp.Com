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
        restore: 2048
    },
    orders_detail: {
        Unprocessed: [{Order_Number: 1234, Products: [{id:1111, productName: "Sandwitch"}], Status: "Unprocessed"},
        {Order_Number: 1235, Products: [{id:1101, productName: "Orange Juice"}], Status: "Unprocessed"}],
        Shipped:[{Order_Number: 1034, Products: [{id:1111, productName: "Sandwitch"}], Status: "Shipped"},
        {Order_Number: 1035, Products: [{id:1101, productName: "Orange Juice"}], Status: "Shipped"}],
        Delivered: [{Order_Number: 1020, Products: [{id:1111, productName: "Sandwitch"}], Status: "Delivered"},
        {Order_Number: 1021, Products: [{id:1101, productName: "Orange Juice"}], Status: "Delivered"}],
    },
    stats: {
        bestSeller: "想吃锅贴"
    }
}

