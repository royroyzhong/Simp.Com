import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSelector } from 'react-redux';
import { getCart } from '../../controller/CartSlice';
import SellingStore from './SellingStore';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import "../../css/cart.css";


function Cart() {
  let cart = useSelector(getCart);
  let storeNames = cart.storeName;
  const renderedSellingStores = []
  for (let i in storeNames) {
    var storeName = storeNames[i]
    let tempArray = cart.products.filter(p => p.soldBy == storeName)
    renderedSellingStores.push(<SellingStore key={i} StoreName={storeName} products={tempArray} ></SellingStore>)
    i++;
  }

  let priceArray = cart.products.map(p => p.price);
  const reducer = (accumulator,curr) => accumulator + curr;
  const sum = priceArray.reduce(reducer);


  function handleCheckout() { }

  return (
    <Box sx={{ flexGrow: 1 }} className="cart">
      <Grid item xs={3} sx={{ marginLeft: "8vw" }}>
        {renderedSellingStores}
      </Grid>
      <h2 id="Sum"> Sum: {sum}</h2>
      <button className="Btn" id="checkoutIcon" onClick={handleCheckout}> <ShoppingCartCheckoutIcon></ShoppingCartCheckoutIcon></button>
    </Box>
  );

}

export default Cart;

