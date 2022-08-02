import Grid from "@mui/material/Grid";
import ItemInCart from './ItemInCart';
import "../../css/cart.css";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { submitOrderAsync } from './cartThunks';
import { getCart } from "../../controller/cartSlice";
import { getUserAsync } from "../../controller/login/thunks";
import { useNavigate } from "react-router-dom";

function SellingStore(props) {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const cart = useSelector(getCart);
    
    const renderedProducts = props.products?.map((product, index) => {
        return <ItemInCart key={index} item={product} />
    })

    const handleCheckout = event => {
        event.preventDefault();
        dispatch(getUserAsync()).then((result) => {
            let statusCode = result.payload.statusCode;
            if (statusCode !== 200) {
                navigate("/login");
            } else {
                dispatch(submitOrderAsync(props.products))
                let updatedCart = cart.filter(product => props.products.findIndex(p => p._id === product._id) === -1);
                sessionStorage.setItem('Cart', JSON.stringify(updatedCart));
            }
        });
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