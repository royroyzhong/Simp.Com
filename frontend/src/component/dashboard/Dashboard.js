import { Card, Input, TextField } from "@mui/material";
import { Box, Container} from "@mui/system";
import { Grid } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { getOrders } from "../../controller/userSlice";
import SearchIcon from '@mui/icons-material/Search';
import "../../css/dashboard.css";
import {quinn} from '../../utils/mockFetch';

export default function Dashboard(props) {

    let orders = useSelector(getOrders);

    return (
        <Container maxWidth="bg" className="dashboard">
            
            <Box sx={{ flexGrow: 1 }}> 
                <Box sx={{flexGrow: 1}} className="status-line-wrapper">
                    <h3 className="section-title">
                        Welcome Message 
                    </h3>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Box>
                                <p>Hello {quinn.name}</p>
                            </Box>
                        </Grid>
                        <Grid item xs={"auto"}>
                            <SearchBar />
                        </Grid>
                        <Grid item xs={"auto"}>
                            <Box>
                                <h4>{quinn.name}</h4>
                            </Box> 
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{flexGrow: 1}}>
                    <h3 id="orders-title" className="section-title">Orders</h3>
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

function SearchBar(props) {

    return (
        <Box>
            <SearchIcon sx={{fontSize: 40, color: "grey"}}></SearchIcon>
            <TextField variant="outlined" label="Search" size="small"></TextField>
        </Box>
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