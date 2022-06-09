import { useState } from 'react';
import React, { useContext } from "react";
import {
  BoxContainer,
  Marginer,
} from "../loginComponent/CommonStyle";
import Box from "@mui/material/Box";
import "../../css/cart.css";

function ItemInCart(props) {
    const originalQuantity = props.item.quantity;
    const [quantity, setQuantity] = useState(originalQuantity)
    function handleChangeInQuantity(newValue) {
        setQuantity(newValue)
        // change sum 
    }
    return (
        <BoxContainer>
            <img ></img>
        <Box sx={{ flexGrow: 1 }}  className="itemInCart">
            <h3> Product: {props.item.productName}</h3>
            <Marginer direction="vertical" margin="1vh" />
            {/* <img src={props.item.image}> </img> */}
            <p> Size: {props.item.size} </p>
            <p> Color: {props.item.color}</p>
            <p id = "Price"> Price: {props.item.price}</p>
            <label className='Quantity' id="Quantity"> Quantity:
                <input
                    type="number"
                    name= "Quantity"
                    value={quantity}
                    onChange={(e) => handleChangeInQuantity(e.target.value)}
                />
            </label>
            </Box>
        </BoxContainer>
    )
}

export default ItemInCart;