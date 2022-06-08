// MUI Components
import { Card, Divider, Grid, List, ListItem, ListItemText, Stack } from "@mui/material";
import { Box, Container } from "@mui/system";
// Other Imports 
import { useSelector } from "react-redux";
// Recahrt Components 
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getOrders, getRecentAwaitingActions, getStats, getTopProducts } from "../../controller/userSlice";
import "../../css/dashboard.css";
import Header from "../common/Header";
import Title from "../common/Title";


// Fake resources...

export default function Dashboard(props) {

    let orders = useSelector(getOrders);

    return (
        <Container maxWidth="md" className="dashboard">

            <Box sx={{ flexGrow: 1 }} className="status-line-wrapper" >
                <Header></Header>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid spacing={{ xs: 4 }} container columns={{ xs: 4, md: 4, lg: 12 }}>
                    {Object.entries(orders).map(([key, val], index) => (
                        <Grid item xs={4} md={2} lg={3} key={index}>
                            <OrderStatus title={key} data={val} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Card className="infograph-wrapper" variant="outlined" sx={
                {
                    padding: 2,
                    marginTop: 4
                }
            }>
                <InfoGraph />
            </Card>
            <Box sx={{ marginTop: 4 }}>
                <ProcessingList />
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

    let stats = useSelector(getStats);

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
        <Stack direction={"row"} spacing={2} divider={<Divider orientation="vertical" flexItem></Divider>}>
            <Box>
                <Title>
                    Weekly Overview
                </Title>
                <LineChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="day" />
                    <YAxis></YAxis>
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="numorders" stroke="#3751FF" yAxisId={0} />
                </LineChart>
            </Box>
            <Box sx={{ width: '100%' }}>
                <List>
                    <ListItem>
                        Best Seller
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={stats.bestSeller} />
                    </ListItem>
                    <Divider />
                </List>
            </Box>
        </Stack>
    )
}

function ProcessingList(props) {

    let awaitingActions = useSelector(getRecentAwaitingActions);
    let topProducts = useSelector(getTopProducts);

    return (
        <Stack direction={"row"} spacing={2}>
            <Card variant="outlined" sx={{ width: '50%' }}>
                <Title>
                    Awaiting Actions
                </Title>
                <List>
                    {awaitingActions.map((a, i) => (<ListItem key={i}>{a}</ListItem>))}
                </List>
            </Card>
            <Card variant="outlined" sx={{ width: '50%' }}>
                <Title>
                    Top Products
                </Title>
                <List>
                    {topProducts.map((p, i) => (<ListItem key={i}>{p}</ListItem>))}
                </List>
            </Card>
        </Stack>
    )
}

