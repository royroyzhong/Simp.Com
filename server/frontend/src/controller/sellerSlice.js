import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../api/client";
import {
  getSellerOrderAsync,
  changeStatusAsync,
} from "../component/orders/orderThunks";
import { REQUEST_STATE } from "./utils";

export const getProducts = createAsyncThunk("/products/get", async function () {
  let res = fetchAPI("GET", {}, {}, "products/seller")
    .then((response) => response.json())
    .then((products) => {
      let pSigs = [];
      for (let p of products) {
        let imagesFetchSigs = [];
        for (let id of p.images) {
          imagesFetchSigs.push(
            fetchAPI("GET", {}, { id: id }, "image").then((res) => {
              return res.json();
            })
          );
        }
        pSigs.push(
          Promise.all(imagesFetchSigs).then((sigs) => {
            p.images = sigs;
            return p;
          })
        );
      }
      return Promise.all(pSigs);
    });
  return res;
});

export const removeProducts = createAsyncThunk(
  "/products/remove",
  async function (id) {
    return fetchAPI("DELETE", {}, { id: id }, "products").then((response) =>
      response.text()
    );
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    // Inventory
    inventory: [],
    inventoryStatus: REQUEST_STATE.IDLE,

    // Orders
    orders: {},
    orderDetail: {},
    stats: { bestSeller: "" },
    topProducts: [],

    //status
    getSellerOrder: REQUEST_STATE.IDLE,
    changeOrderStatus: REQUEST_STATE.IDLE,

    // data vis
    dataset: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, function (state, action) {
        state.inventoryStatus = REQUEST_STATE.PENDING;
      })
      .addCase(getProducts.fulfilled, function (state, action) {
        state.inventory = action.payload;
        state.inventoryStatus = REQUEST_STATE.FULFILLED;
      })
      .addCase(getProducts.rejected, function (state, action) {
        state.inventoryStatus = REQUEST_STATE.REJECTED;
        console.log(action);
      })
      .addCase(getSellerOrderAsync.rejected, function (state, action) {
        state.getSellerOrder = REQUEST_STATE.REJECTED;
        console.log(action);
      })
      .addCase(removeProducts.fulfilled, function (state, action) {
        console.log(action);
      })
      .addCase(getSellerOrderAsync.fulfilled, function (state, action) {
        let allOrders = action.payload.map((order) => {
          return {
            orderNumber: order._id,
            products: order.products,
            status: order.status,
          };
        });
        state.orderDetail = {
          Unprocessed: allOrders.filter(
            (order) => order.status === "Unprocessed"
          ),
          Shipped: allOrders.filter((order) => order.status === "Shipped"),
          Delivered: allOrders.filter((order) => order.status === "Delivered"),
          Refunded: allOrders.filter((order) => order.status === "Refunded"),
        };
        state.orders = {
          unprocessed: state.orderDetail.Unprocessed.length,
          shipped: state.orderDetail.Shipped.length,
          delivered: state.orderDetail.Delivered.length,
          Refunded: state.orderDetail.Refunded.length,
        };
        let allProducts = [];
        action.payload.forEach((order) => {
          order.products.forEach((product) => {
            let idx = allProducts.findIndex((p) => p._id === product._id);
            if (idx !== -1) {
              allProducts[idx].quantity += product.quantity;
            } else {
              allProducts.push(product);
            }
          });
        });
        allProducts.sort((a, b) => {
          return b.quantity - a.quantity;
        });

        state.topProducts =
          allProducts.length >= 3 ? allProducts.slice(0, 3) : allProducts;
        console.log(action.payload);
        // dataset for bar chart
        let barChartDataset = [
          { unprocessed: state.orderDetail.Unprocessed.length },
          { shipped: state.orderDetail.Shipped.length },
          { delivered: state.orderDetail.Delivered.length },
          { Refunded: state.orderDetail.Refunded.length },
        ];
        //dataset for product item
        let productMap = new Map();
        for (let each of action.payload) {
          for (let product of each.products) {
            if (productMap.has(product._id)) {
              productMap.set(product._id, [
                ...productMap.get(product._id),
                product,
              ]);
            } else {
              productMap.set(product._id, [product]);
            }
          }
        }
        let productDataset = [];
        for (let key of productMap) {
          let orders = key[1];
          let sum = 0,
            quantity = 0;
          for (let order of orders) {
            sum += parseFloat(order.price) * parseFloat(order.quantity);
            console.log(sum);
            quantity += parseFloat(order.quantity);
          }
          console.log(sum);
          productDataset.push({
            name: orders[0].name,
            quantity: quantity,
            Income: sum,
          });
        }
        state.dataset = { product: productDataset, barChart: barChartDataset };

        state.getSellerOrder = REQUEST_STATE.FULFILLED;
      })
      .addCase(changeStatusAsync.pending, (state) => {
        state.changeOrderStatus = REQUEST_STATE.PENDING;
      })
      .addCase(changeStatusAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        let status = action.payload[0].status;
        state.changeOrderStatus = REQUEST_STATE.FULFILLED;
        const orderIdx = state.orderDetail.Unprocessed.findIndex(
          (order) => order._id === action.payload._id
        );
        state.orderDetail.Unprocessed[orderIdx].status = status;
        if (status === "Shipped") {
          state.orderDetail.Shipped.unshift(
            state.orderDetail.Unprocessed[orderIdx]
          );
          ++state.orders.shipped;
        } else {
          state.orderDetail.Refunded.unshift(
            state.orderDetail.Unprocessed[orderIdx]
          );
          ++state.orders.refunded;
        }
        state.orderDetail.Unprocessed.splice(orderIdx, 1);
        --state.orders.unprocessed;
      })
      .addCase(changeStatusAsync.rejected, (state, action) => {
        state.changeOrderStatus = REQUEST_STATE.REJECTED;
        console.log(action);
      });
  },
});

// ------------------ Getters ------------------- //
export const getProductList = (state) => state.seller.inventory;
export const getProductListStatus = (state) => state.seller.inventoryStatus;
export const getSellerOrder = (state) => state.seller.orders;
export const getSellerOrderDetail = (state) => state.seller.orderDetail;
export const getStats = (state) => state.seller.stats;
export const getTopProducts = (state) => state.seller.topProducts;
export const getSellerOrderStatus = (state) => state.seller.getSellerOrder;
export const getChangeOrderStatus = (state) => state.seller.changeOrderStatus;

export default sellerSlice.reducer;
