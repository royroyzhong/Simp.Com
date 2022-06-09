import { getOrderDetails } from "../../controller/userSlice";

// MUI Components
import { Card, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";

import { useSelector } from "react-redux";
import { getOrders } from "../../controller/userSlice";
import Header from "../common/Header";
import Unprocess from "./Unprocess";
import InShipment from "./InShipment";
import "../../css/orderTracking.css";


// TODO: Search bar + nav bar

function OrderTracking(props) {

    let orders = useSelector(getOrderDetails);

    let unprocessedProducts = orders.Unprocessed
    let inShipmentProducts = orders.Shipped


    const renderedUnprocessed = unprocessedProducts?.map((unprocessedProduct,index) => {
        return <Unprocess key={index}  unprocessed_section = {unprocessedProduct} />
    })

    const renderedInShipment = inShipmentProducts?.map((inShipmentProducts,index) => {
        return <InShipment key={index} inShipment_section = {inShipmentProducts} />
    })



    return (
        <Grid container spacing={3} className="orderTracking">
            <Grid item xs>
                <Box>
                    <h2> Unprocessed Items</h2>
                    {renderedUnprocessed}
                </Box>
            </Grid>

            <Grid item xs>
                <Box>
                    <h2> In Shipment</h2>
                    {renderedInShipment}
                </Box>
            </Grid>
        </Grid>
    )


}

export default OrderTracking;


