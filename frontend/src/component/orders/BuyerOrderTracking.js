import { useSelector } from "react-redux";
import { getOrderHistory } from '../../controller/buyerSlice';

import { DataGrid } from "@mui/x-data-grid";
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
            renderCell: (products) => (
                <ul>
                    {products.value.map((product, index) => (
                        <li key={index}>
                        Name: {product.productName}  Quantity: {product.quantity}
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
        <Container maxWidth="xl" className="dashboard" sx={{bgcolor: '#F7F8FC'}}>
            <Grid
                container
                rowSpacing={5}
                sx={{ marginLeft: "8vw", marginTop:"2vw"}}
                className="orderTrackingContent"
            >
                <Grid item xs={10} className="orderTrackingHeader">
                    {" "}
                    Order History
                </Grid>
                <Grid item xs={10} style={{ height: 600 }}>
                    <DataGrid
                        rows={orders}
                        getRowId={order => order.orderNumber}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </Grid>
            </Grid>
        </Container>
    )

}
