import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Grid, IconButton } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPI } from '../../api/client';
import { getDisplayProductList } from "../../controller/buyerSlice";
import { deleteProduct, updateQuantity } from '../../controller/cartSlice';
import "../../css/cart.css";

function ItemInCart(props) {
    const dispatch = useDispatch();

    function handleChangeInQuantity(newValue) {
        dispatch(updateQuantity({
            _id: props.item._id,
            quantity: newValue,
        }));
        let tempCart = JSON.parse(sessionStorage.getItem('Cart'));
        let value = parseInt(newValue);
        if (value >= 0) {
            let productIdx = tempCart.findIndex(p => p._id === props.item._id);
            tempCart[productIdx].quantity = value;
        }
        sessionStorage.setItem('Cart', JSON.stringify(tempCart));
    }

    function handleDelete() {
        dispatch(deleteProduct({
            _id: props.item._id,
        }));
        let updatedCart = JSON.parse(sessionStorage.getItem('Cart'));
        updatedCart = updatedCart.filter(p => p._id !== props.item._id);
        sessionStorage.setItem('Cart', JSON.stringify(updatedCart));
    }

    let [img, setImg] = useState('https://static.vecteezy.com/system/resources/previews/002/634/880/original/drag-and-drop-tool-outline-icon-vector.jpg')
    let [isImgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        let pid = props.item._id;
        if (isImgLoaded) return;
        fetchAPI('GET', {}, { id: pid }, 'products')
            .then(res => res.json())
            .then(p => {
                setImgLoaded(true);
                if (p.images.length > 0) {
                    return p.images[0];
                } else {
                    return Promise.reject("no image");
                }
            })
            .then(img => fetchAPI('GET', {}, { id: img }, "image"))
            .then(res => res.json())
            .then(img => setImg(img.data))
    }, [])

    return (
        <Grid container columns={{ xs: 4, md: 8 }} className="itemInCart" sx={{ marginLeft: "2vw", marginBottom: "2vw" }} spacing={2}>
            <Grid item xs={3} >
                <img src={img}
                    height="100px" width="100px"></img>
            </Grid>
            <Grid item xs={1} className='verticalLine'> </Grid>
            <Grid container item spacing={2} xs={6}>
                <Grid item xs={10}> Product: {props.item.name}</Grid>
                <Grid item xs={4}> Price: {props.item.price} </Grid>
                <Grid item xs={5}> Quantity:
                    <input
                        type="number"
                        name="Quantity"
                        value={props.item.quantity}
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