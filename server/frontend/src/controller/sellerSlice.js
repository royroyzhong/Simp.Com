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
  reducers: {
    resetInventoryStatus: (state, action) => {
      state.inventoryStatus = REQUEST_STATE.IDLE;
    },
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
      })
      .addCase(getSellerOrderAsync.rejected, function (state, action) {
        state.getSellerOrder = REQUEST_STATE.REJECTED;
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

        // dataset for bar chart
        let barChartDataset = [
          {
            name: "Unprocessed",
            Quantity: state.orderDetail.Unprocessed.length,
          },
          { name: "Shipped", Quantity: state.orderDetail.Shipped.length },
          { name: "Delivered", Quantity: state.orderDetail.Delivered.length },
          { name: "Refunded", Quantity: state.orderDetail.Refunded.length },
        ];

        //dataset for product item
        let productDataset = [];
        for (let product of allProducts) {
          let sum = parseFloat(product.price) * parseFloat(product.quantity);
          let quantity = parseFloat(product.quantity);
          productDataset.push({
            name: product.name,
            Quantity: quantity,
            // Incomes: sum,
          });
        }
        productDataset.sort((a, b) => {
          return a.Quantity > b.Quantity;
        });
        productDataset = productDataset.slice(0, 5);
        let monthMap = {
          1: "Jan.",
          2: "Feb.",
          3: "Mar.",
          4: "Apr.",
          5: "May",
          6: "June",
          7: "July",
          8: "Aug.",
          9: "Sep.",
          10: "Oct.",
          11: "Nov.",
          12: "Dec.",
        };
        let currentYearMonthlySale = [];
        let today = new Date();
        let thisYear = today.getFullYear();
        let thisYearOrders = action.payload.filter(
          (order) => new Date(order.createdAt).getFullYear() === thisYear
        );
        for (let i = 0; i < 12; ++i) {
          let thisMonthOrders = thisYearOrders.filter(
            (order) => new Date(order.createdAt).getMonth() === i
          );
          let total = 0;
          thisMonthOrders.forEach((orders) => (total += orders.totalPrice));
          currentYearMonthlySale.push({
            month: monthMap[i + 1],
            totalSale: total,
          });
        }
        state.dataset = {
          product: productDataset,
          barChart: barChartDataset,
          lineChart: currentYearMonthlySale,
        };

        state.getSellerOrder = REQUEST_STATE.FULFILLED;
      })
      .addCase(changeStatusAsync.pending, (state) => {
        state.changeOrderStatus = REQUEST_STATE.PENDING;
      })
      .addCase(changeStatusAsync.fulfilled, (state, action) => {
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
      });
  },
});

export const { resetInventoryStatus } = sellerSlice.actions;

// ------------------ Getters ------------------- //
export const getProductList = (state) => state.seller.inventory;
export const getProductListStatus = (state) => state.seller.inventoryStatus;
export const getSellerOrder = (state) => state.seller.orders;
export const getSellerOrderDetail = (state) => state.seller.orderDetail;
export const getStats = (state) => state.seller.stats;
export const getTopProducts = (state) => state.seller.topProducts;
export const getSellerOrderStatus = (state) => state.seller.getSellerOrder;
export const getChangeOrderStatus = (state) => state.seller.changeOrderStatus;
export const getDatasets = (state) => state.seller.dataset;

export default sellerSlice.reducer;
