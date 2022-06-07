// MUI Components
import { Card, Grid } from "@mui/material";
import { Box, Container} from "@mui/system";
// Recahrt Components 
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Area, AreaChart }from 'recharts';
// Other Imports 
import {useSelector} from "react-redux";
import { getOrders } from "../../controller/userSlice";
import Header from "../common/Header";
import "../../css/dashboard.css";
import { Marginer } from "../../css/CommonStyle";

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
            <Marginer />
            <Card className="infograph-wrapper" variant="outlined" sx={
                {
                    padding: 2,
                    marginTop: 4 
                }
            }>
                <InfoGraph />
            </Card>
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

    let data = [
        {
            day: "Monday",
            numorders: 1000,
        },
        {
            day: "Tuesday", 
            numorders: 1299
        },
        {
            day: "Wednesday",
            numorders: 1023
        },
        {
            day: "Thursday",
            numorders: 889
        },
        {
            day: "Friday",
            numorders: 1120
        },
        {
            day: "Saturday",
            numorders: 996
        },
        {
            day: "Sunday",
            numorders: 667
        }
    ]
    return (
        <Grid spacing={{xs: 0}} container columns={{xs: 12, md: 12}} className="infograph-board">
            <Grid item xs={"auto"} >
                    <LineChart
                    width={800}
                    height={400}
                    data={data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                    <XAxis dataKey="day" />
                    <YAxis></YAxis>
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="numorders" stroke="#3751FF" yAxisId={0} />
                    </LineChart>
                </Grid> 
                <Grid item xs >
                    <div> stack stub </div> 
                </Grid>
            </Grid>
        )
    }