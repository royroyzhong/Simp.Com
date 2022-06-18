// MUI Components
import { Grid } from "@mui/material";
import { Box, Container} from "@mui/system";

// Other Imports 
import {useSelector} from "react-redux";
import Header from "../common/Header";
import Product from "./Product";
import { getProducts } from "../../controller/productSlice";
import "../../css/dashboard.css";

export default function CustomerPageRightContent(props) {

    let products = useSelector(getProducts);

    return (
        <Container maxWidth="xl" className="dashboard" sx={{bgcolor: '#F7F8FC'}}>
            <Box sx={{ flexGrow: 1 }}> 
                <Box sx={{flexGrow: 1}} className="status-line-wrapper" >
                    <Header></Header>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{xs:2}} columns={{ xs: 2, md: 2, lg: 16 }}>
                    {products.map((item, index) => (
                    <Grid item xs={16} sm={8} md={4} lg={4} key={index}>
                        <Product title={index} data={item}/>
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}
