/**
 * Mock buyer for prototyping.
 */
 export const mockBuyer = {
    username: "Mock Buyer", 
    cart: {storeName:["A","B"],        
    products: [{id:1111, size: "500 g", color: "default", productName: "Sandwitch",soldBy: "A",price: 10, image:"https://media.istockphoto.com/photos/ham-sandwich-picture-id157428028?b=1&k=20&m=157428028&s=170667a&w=0&h=X8N6KX7An1IPFe0rIGIauDHUOsMOZPWM7ESplenn-gE=",quantity: 2}, 
    {id:1101, size: "2L", color: "default", productName: "Orange Juice",soldBy: "B",price: 5,quantity:1},
    {id:1102, size: "2L", color: "default", productName: "Grape Juice",soldBy: "B",price: 7,quantity:1}]
    },
    sum: 15
}