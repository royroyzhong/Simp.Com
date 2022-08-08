import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderHistory } from "../../controller/buyerSlice";
import { getBuyerOrderAsync } from "./orderThunks";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Grid } from "@mui/material";

import { Container } from "@mui/system";

export default function BuyerOrderTracking() {
  let orders = useSelector(getOrderHistory);
  let dispatch = useDispatch();
  console.log(orders);

  useEffect(() => {
      dispatch(getBuyerOrderAsync());
  }, []);

  const columns = [
    { field: "_id", headerName: "Order Number", width: 130 },
    { field: "store", headerName: "Store", width: 130 },
    {
      field: "products",
      headerName: "Products",
      width: 350,
      getApplyQuickFilterFn: getApplyFilterFnProducts,
      renderCell: (products) => (
        <ul>
          {products.value.map((product, index) => (
            <li key={index}>
              Name: {product.name}, Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    { field: "status", headerName: "Status", width: 130 },
    { field: "totalPrice", headerName: "Total", width: 130 },
    { field: "date", headerName: "Date of purchase", width: 130 },
  ];

  return (
    <Container maxWidth="xl" className="dashboard" sx={{ bgcolor: "#F7F8FC" }}>
      <Grid
        container
        rowSpacing={5}
        sx={{ marginLeft: "8vw", marginTop: "0.5vw" }}
        className="orderTrackingContent"
      >
        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          Order History
        </Grid>
        <Grid item xs={10} style={{ height: 600 }}>
          <DataGrid
            rows={orders}
            getRowId={(order) => order._id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
const getApplyFilterFnProducts = (value) => {
  return (params) => {
    for (let each of params.value) {
      each.productName.includes(value);
      if (
        each.color.toLowerCase().includes(value.toLowerCase()) ||
        each._id === value ||
        each.price === value ||
        each.productName.toLowerCase().includes(value.toLowerCase()) ||
        each.quantity === value ||
        each.size.toLowerCase().includes(value.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  };
};
