/* Styling & MUI */
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../../css/cart.css";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

/* Styling & MUI */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, loadFromStorage } from "../../controller/cartSlice";
import SellingStore from "./SellingStore";

import { useDispatch } from "react-redux";
import { submitOrderAsync } from "./cartThunks";
import { getUserAsync } from "../../controller/login/thunks";

import { transporter, mailOptions } from "../orders/emailNotification";

function Cart() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    //sessionStorage.clear();
    let localStorage = sessionStorage.getItem('Cart');
    if (localStorage != null) {
      dispatch(loadFromStorage(JSON.parse(localStorage)));
    }
  }, []);

  let cart = useSelector(getCart);
  let uniqueStoreNames = [...new Set(cart?.map((product) => product.soldBy))];
  let storeNames = Array.from(uniqueStoreNames).sort();

  const renderedSellingStores = []

  for (let i in storeNames) {
    let storeName = storeNames[i];
    let tempArray = cart?.filter((p) => p.soldBy === storeName);
    renderedSellingStores.push(
      <SellingStore
        key={i}
        StoreName={storeName}
        products={tempArray}
      ></SellingStore>
    );
    i++;
  }

  const handleCheckout = (event) => {
    event.preventDefault();
    dispatch(getUserAsync()).then((result) => {
      let statusCode = result.payload.statusCode;
      if (statusCode !== 200) {
        navigate("/login");
      } else {
        dispatch(submitOrderAsync(cart)).then(() => {
          sessionStorage.clear();
        }).catch(err => {console.log(err)});
      }
    });
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent' + info.response);
      }
  })
  }

  return (
    <Container
      maxWidth="xl"
      className="dashboard"
      sx={{ bgcolor: "#F7F8FC", marginTop: "-1vw" }}
    >
      <Box className="cart">
        <h1> Cart</h1>
        <Grid
          container
          rowSpacing={5}
          sx={{ marginLeft: "8vw", marginBottom: "2vw" }}
        >
          <Grid item xs={10} rowSpacing={5}>
            <Box>{renderedSellingStores}</Box>
          </Grid>
        </Grid>
        <h2 id="Sum"> Sum: {cart.sum}</h2>
        <button className="Btn" id="checkoutIcon" onClick={handleCheckout}>
          {" "}
          <ShoppingCartCheckoutOutlinedIcon> </ShoppingCartCheckoutOutlinedIcon>
        </button>
        <button onClick={handleSendEmail}> Test </button>
      </Box>
    </Container>
  );
}

export default Cart;
