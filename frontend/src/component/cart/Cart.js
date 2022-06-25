/* Styling & MUI */
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../../css/cart.css";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

/* Styling & MUI */
import React from "react";
import { useSelector } from 'react-redux';
import { getCart } from '../../controller/cartSlice';
import SellingStore from './SellingStore';
import Header from "../common/Header";


function Cart() {
  let cart = useSelector(getCart);
  console.log("Rerender")

  let uniqueStoreNames = [... new Set(cart.products.map(product => product.soldBy))];
  let storeNames = Array.from(uniqueStoreNames).sort();
  // cart.storeName;

  const renderedSellingStores = []
  for (let i in storeNames) {
    var storeName = storeNames[i]
    let tempArray = cart.products.filter(p => p.soldBy === storeName)
    renderedSellingStores.push(<SellingStore key={i} StoreName={storeName} products={tempArray} ></SellingStore>)
    i++
  }
  
  const handleCheckout = event => { 
    event.preventDefault()
    // missing handler
  }

  return (
    <Container maxWidth="xl" className="dashboard" sx={{ bgcolor: '#F7F8FC' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }} className="status-line-wrapper" >
          <Header></Header>
        </Box>
      </Box>
      <Box className="cart">
        <h1> Cart</h1>
        <Grid container rowSpacing={5} sx={{ marginLeft: "8vw", marginBottom: "2vw" }}>
          <Grid item xs={10} rowSpacing={5}>
            <Box>
              {renderedSellingStores}
            </Box>
          </Grid>
        </Grid>
        <h2 id="Sum"> Sum: {cart.sum}</h2>
        <button className="Btn" id="checkoutIcon" onClick={handleCheckout}> <ShoppingCartCheckoutOutlinedIcon> </ShoppingCartCheckoutOutlinedIcon></button>
      </Box>
    </Container>
  );

}

export default Cart;

