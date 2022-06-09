/**
 * Mock buyer for prototyping.
 */
 export const mockBuyer = {
    username: "Mock Buyer", 
    cart: {storeName:["A","B"],        
    products: [{id:1111, size: "500 g", color: "default", productName: "Sandwitch",soldBy: "A",price: 10, image:"frontend/src/assets/mockSandwitch.jpg",quantity: 2}, 
    {id:1101, size: "2L", color: "default", productName: "Orange Juice",soldBy: "B",price: 5,quantity:1}]
    },
    sum: 15
}