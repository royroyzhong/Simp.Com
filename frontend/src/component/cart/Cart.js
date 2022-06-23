import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSelector } from 'react-redux';
import { getCart } from '../../controller/cartSlice';
import SellingStore from './SellingStore';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import "../../css/cart.css";
import { Container } from "@mui/system";
import Header from "../common/Header";


function Cart() {
  let cart = useSelector(getCart);
  let storeNames = cart.storeName;
  const renderedSellingStores = []
  for (let i in storeNames) {
    var storeName = storeNames[i]
    let tempArray = cart.products.filter(p => p.soldBy === storeName)
    renderedSellingStores.push(<SellingStore key={i} StoreName={storeName} products={tempArray} ></SellingStore>)
    i++;
  }

  let priceArray = cart.products.map(p => p.price);
  const reducer = (accumulator, curr) => accumulator + curr;
  const sum = priceArray.reduce(reducer);


  function handleCheckout() { }

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
        <h2 id="Sum"> Sum: {sum}</h2>
        <button className="Btn" id="checkoutIcon" onClick={handleCheckout}> <ShoppingCartCheckoutOutlinedIcon> </ShoppingCartCheckoutOutlinedIcon></button>
      </Box>
    </Container>
  );

}

export default Cart;
