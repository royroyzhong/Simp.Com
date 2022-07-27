import { useSelector } from "react-redux";
import { getOrderHistory } from "../../controller/buyerSlice";

import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Grid } from "@mui/material";

import { Box, Container } from "@mui/system";

export default function BuyerOrderTracking(props) {
  let orders = useSelector(getOrderHistory);

  const columns = [
    { field: "orderNumber", headerName: "Order Number", width: 130 },
    { field: "storeName", headerName: "Store", width: 130 },
    {
      field: "products",
      headerName: "Products",
      width: 350,
      getApplyQuickFilterFn: getApplyFilterFnProducts,
      renderCell: (products) => (
        <ul>
          {products.value.map((product, index) => (
            <li key={index}>
              Name: {product.productName} Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      ),
    },
    { field: "status", headerName: "Status", width: 130 },
    { field: "total", headerName: "Total", width: 130 },
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
            getRowId={(order) => order.orderNumber}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
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
        each.id === value ||
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
