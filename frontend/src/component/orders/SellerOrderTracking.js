import { getOrderDetails } from "../../controller/orderSlice";
import Header from "../common/Header";
// MUI Components
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container} from "@mui/system";

import { useSelector } from "react-redux";
import "../../css/orderTracking.css";


function SellerOrderTracking(props) {
  let orders = useSelector(getOrderDetails);

  let unprocessedProducts = orders.Unprocessed;
  let inShipmentProducts = orders.Shipped;
  let delieveredPorudcts = orders.Delivered;

  const columns = [
    { field: "orderNumber", headerName: "Order Number", width: 130 },
    {
      field: "products",
      headerName: "Products",
      width: 450,
      renderCell: (products) => (
        <ul>
          {products.value.map((product, index) => (
            <li key={index}>
              {" "}
              id: {product.id} name: {product.productName}
            </li>
          ))}
        </ul>
      ),
    },
    { field: "status", headerName: "Status", width: 130 },
  ];

  return (
    <Grid container maxWidth="xl" className="dashboard" sx={{ bgcolor: '#F7F8FC' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }} className="status-line-wrapper" >
          <Header></Header>
        </Box>
      </Box>
      <Grid
        container
        rowSpacing={5}
        sx={{ marginLeft: "8vw" }}
        className="orderTrackingContent"
      >
        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          Unprocessed Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={unprocessedProducts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Grid>

        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          In Shipment Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={inShipmentProducts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>

        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          Delievered Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={delieveredPorudcts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SellerOrderTracking;

// const renderedUnprocessed = unprocessedProducts?.map((unprocessedProduct,index) => {
//     return <Unprocess key={index}  unprocessed_section = {unprocessedProduct} />
// })

// const renderedInShipment = inShipmentProducts?.map((inShipmentProducts,index) => {
//     return <InShipment key={index} inShipment_section = {inShipmentProducts} />
// })

// <Grid container spacing={3} sx={{ marginLeft: "8vw",marginBottom: "2vw" }} className="orderTracking">
//     <Grid item xs={10}>
//         <Box>
//             <h2> Unprocessed Items</h2>
//             {renderedUnprocessed}
//         </Box>
//     </Grid>

//     <Grid item xs={10}>
//         <Box>
//             <h2> In Shipment</h2>
//             {renderedInShipment}
//         </Box>
//     </Grid>
// </Grid>
