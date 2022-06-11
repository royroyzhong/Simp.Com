import { useState } from 'react';
import React, { useContext } from "react";
import { BoxContainer, } from "../../css/CommonStyle";
import Box from "@mui/material/Box";
import "../../css/cart.css";
import { Grid } from '@mui/material';


function ItemInCart(props) {
    const originalQuantity = props.item.quantity;
    const [quantity, setQuantity] = useState(originalQuantity)

    function handleChangeInQuantity(newValue) {
        setQuantity(newValue)
        // change sum 
    }
    return (
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} className="itemInCart" sx={{marginLeft: "2vw" ,marginBottom: "2vw" }} spacing={2}>
            {/* <img src={props.item.image}> </img> */}

            <Grid item xs={3} direction="column">
                <img src='https://static.vecteezy.com/system/resources/previews/002/634/880/original/drag-and-drop-tool-outline-icon-vector.jpg'
                    height="100px" width="100px"></img>
            </Grid>
            <Grid item xs={1} direction="column" className='verticalLine'> </Grid>
            <Grid container spacing={2} xs={6}>
                <Grid item xs={10}> Product: {props.item.productName}</Grid>
                <Grid item xs={5}> Size: {props.item.size} </Grid>
                <Grid item xs={5}> Color: {props.item.color} </Grid>
                <Grid item xs={5}> Price: {props.item.price} </Grid>
                <Grid item xs={5}> Quantity: 
                    <input
                        type="number"
                        name="Quantity"
                        value={quantity}
                        id="quantityInputBox"
                        onChange={(e) => handleChangeInQuantity(e.target.value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ItemInCart;