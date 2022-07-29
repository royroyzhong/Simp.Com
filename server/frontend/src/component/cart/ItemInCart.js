import { useState } from 'react';
import React from "react";
import "../../css/cart.css";
import { Grid } from '@mui/material';
import { deleteProduct, updateQuantity } from '../../controller/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { IconButton } from '@mui/material';
import { getCart } from "../../controller/cartSlice";

function ItemInCart(props) {
    const originalQuantity = props.item.quantity;
    const [quantity, setQuantity] = useState(originalQuantity)

    const dispatch = useDispatch();
    const cart = useSelector(getCart);

    function handleChangeInQuantity(newValue) {
        setQuantity(newValue);
        dispatch(updateQuantity({
            id: props.item.id,
            quantity: newValue,
        }));
        let value = parseInt(newValue);
        if (value >= 0) {
            let productIdx = cart.findIndex(p => p.id === props.item.id);
            cart[productIdx].quantity= value;
        }
        sessionStorage.setItem('Cart', JSON.stringify(cart));
    }

    function handleDelete() {
        dispatch(deleteProduct({
            id:props.item.id,
        }));
        let updatedCart = cart.filter(p => p.id !== props.item.id);
        sessionStorage.setItem('Cart', JSON.stringify(updatedCart));
    }

    return (
        <Grid container columns={{xs:4, md:8}} className="itemInCart" sx={{marginLeft: "2vw" ,marginBottom: "2vw" }} spacing={2}>
            {/* <img src={props.item.image}> </img> */}

            <Grid item xs={3} >
                <img src='https://static.vecteezy.com/system/resources/previews/002/634/880/original/drag-and-drop-tool-outline-icon-vector.jpg'
                    height="100px" width="100px"></img>
            </Grid>
            <Grid item xs={1}  className='verticalLine'> </Grid>
            <Grid container item spacing={2} xs={6}>
                <Grid item xs={10}> Product: {props.item.name}</Grid>
                <Grid item xs={4}> Price: {props.item.price} </Grid>
                <Grid item xs={5}> Quantity: 
                    <input
                        type="number"
                        name="Quantity"
                        value={quantity}
                        id="quantityInputBox"
                        min="0"
                        onChange={(e) => handleChangeInQuantity(e.target.value)}
                    />
                </Grid>
                <IconButton className="Btn" id="clearProductIcon" onClick={handleDelete}> <ClearOutlinedIcon> </ClearOutlinedIcon> </IconButton>
            </Grid>
        </Grid>
    )
}

export default ItemInCart;