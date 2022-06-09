import { createSlice } from "@reduxjs/toolkit";

class Product {
    constructor(name) {
        this.uuid = null;
        this.name = name;
        this.price = 0;
        this.features = [];
        this.imgRefs = [];
    }

    setPrice = (newPrice) => {
        this.price = newPrice;
        return this;
    }

    setName = (newName) => {
        this.name = newName;
        return this;
    }

    addImage = (img) => {
        this.imgRefs.push(img);
        return this;
    }

    addFeature = (type, data) => {
        this.features = [...this.features, {
            type: type,
            data: data
        }]
        return this;
    }


}
const productSlice = createSlice({
    name: "products",
    initialState: {
        inventory: [new Product("Quinn").setPrice(99).addImage("book"), new Product("LaLa").setPrice(33).addImage("snowman")],
        bufferProduct: new Product("")
    },
    reducers: {
        // TODO: non-buffer state modification should be performed after backend update succeed. 
        addProduct: (state) => {
            state.inventory.push(state.bufferProduct);
            state.bufferProduct = new Product("");
        },
        removeProduct: (state, action) => {
            state.inventory = state.inventory.filter((product, i) => {
                return (i !== action.payload);
            });
        }
    } 

});

// ++++++++++++++++ Getters ++++++++++++++++++++ // 
export const getProductList = (state) => state.products.inventory;
export const getBuffer = (state) => state.products.bufferProduct;

export default productSlice.reducer;