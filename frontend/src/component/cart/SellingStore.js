import Grid from "@mui/material/Grid";
import ItemInCart from './ItemInCart';
import "../../css/cart.css";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { useDispatch } from 'react-redux';
import { submitOrderAsync } from './cartThunks';

function SellingStore(props) {
    const dispatch = useDispatch();
    const renderedProducts = props.products?.map((product, index) => {
        return <ItemInCart key={index} item={product} />
    })

    const handleCheckout = event => { 
        event.preventDefault()
        dispatch(submitOrderAsync(props.products))
      }

    return (
        <Grid container className="sellingStore" sx={{ marginBottom: "2vw" }} >
            <Grid item xs={10} sx={{ marginBottom: "2vw" }} id="storeName">
                {props.StoreName}
            </Grid>
            <Grid item xs={10}>
                {renderedProducts}
            </Grid>
            <button className="Btn" id="subCheckoutIcon" onClick={handleCheckout}> <ShoppingCartCheckoutOutlinedIcon> </ShoppingCartCheckoutOutlinedIcon></button>
        </Grid>
    )
}

export default SellingStore;