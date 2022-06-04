import { Card } from "@mui/material";
import { Box, Container} from "@mui/system";
import { Grid } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { getOrders } from "../../controller/userSlice";
import "../../css/dashboard.css";

export default function Dashboard(props) {

    let orders = useSelector(getOrders);

    return (
        <Container maxWidth="bg">
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{flexGrow: 1}}>
                    <h3 id="orders-title">Orders</h3>
                </Box>
                <Grid spacing={{xs:2}} container columns={{ xs: 4, md: 4, lg: 12 }}>
                    {Object.entries(orders).map(([key,val], index) => (
                    <Grid item xs={4} md={2} lg={3} key={index}>
                        <OrderStatus title={key} data={val}/>
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

function OrderStatus(props) {

    return (
        <Card variant="outlined">
            <div className="card-wrapper">
                <p className="card-title">{props.title}</p>
                <p className="card-display">{props.data}</p>
            </div>
        </Card>
    )
}