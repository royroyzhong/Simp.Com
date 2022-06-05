// MUI Components
import { Card, Grid } from "@mui/material";
import { Box, Container} from "@mui/system";

// Other Imports 
import {useSelector} from "react-redux";
import { getOrders } from "../../controller/userSlice";
import Header from "../common/Header";
import "../../css/dashboard.css";

// Fake resources...

export default function Dashboard(props) {

    let orders = useSelector(getOrders);

    return (
        <Container maxWidth="xl" className="dashboard">
            
            <Box sx={{ flexGrow: 1 }}> 
                <Box sx={{flexGrow: 1}} className="status-line-wrapper" >
                    <Header></Header>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid spacing={{xs:4}} container columns={{ xs: 4, md: 4, lg: 12 }}>
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