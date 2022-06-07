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
        <Container maxWidth="lg" className="dashboard">
            
            <Box sx={{flexGrow: 1}} className="status-line-wrapper" >
                <Header></Header>
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
            <Box>
                <InfoGraph />
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

function InfoGraph(props) {
    return (
        <Grid spacing={{xs: 0}} container columns={{xs: 12, md: 12}}>
            <Grid item xs={11} md={8}>
                <div>graph stub</div>
            </Grid>
            <Grid item xs={1} md={4}>
                <div> stack stub </div> 
            </Grid>
        </Grid>
    )
}