import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ItemInCart from './ItemInCart';
import "../../css/cart.css";


function SellingStore(props) {
    const renderedProducts = props.products?.map((product,index) => {
        return <ItemInCart key={index}  item = {product} />
    })

    return (
        <Container className="sellingStore">
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={3} sx={{ marginLeft: "8vw" }}>
                    <h2> {props.StoreName} </h2>
                    {renderedProducts}
                </Grid>
            </Box>
        </Container>
    )
}

export default SellingStore;