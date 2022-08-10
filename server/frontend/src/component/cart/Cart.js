/* Styling & MUI */
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../../css/cart.css";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  loadFromStorage,
  getSum,
  getSubmitOrderStatus,
} from "../../controller/cartSlice";
import SellingStore from "./SellingStore";
import { useEffect, useState } from "react";
import { submitOrderAsync } from "../orders/orderThunks";
import { getUserAsync } from "../../controller/login/thunks";

function Cart() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [sucess, setSucess] = useState(false);
  const [failure, setFailure] = useState(false);

  let cart = useSelector(getCart);
  let sum = useSelector(getSum);
  let uniqueStoreIds = [...new Set(cart?.map((product) => product.soldBy))];
  let storeIds = Array.from(uniqueStoreIds).sort();
  const renderedSellingStores = [];

  useEffect(() => {
    //sessionStorage.clear();
    let localStorage = sessionStorage.getItem("Cart");
    if (localStorage != null) {
      dispatch(loadFromStorage(JSON.parse(localStorage)));
    }
  }, []);

  for (let i in storeIds) {
    let storeId = storeIds[i];
    let storeName = cart.find(
      (product) => product.soldBy === storeId
    ).storeName;
    let tempArray = cart?.filter((p) => p.soldBy === storeId);
    renderedSellingStores.push(
      <SellingStore
        key={i}
        StoreName={storeName}
        products={tempArray}
      ></SellingStore>
    );
    i++;
  }

  const handleSucessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSucess(false);
  };

  const handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailure(false);
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    dispatch(getUserAsync()).then((result) => {
      let statusCode = result.payload.statusCode;
      if (statusCode !== 200) {
        navigate("/login");
      } else {
        dispatch(submitOrderAsync(cart))
          .then((orderResult) => {
            sessionStorage.clear();
            setSucess(true);
          })
          .catch((err) => {
            setFailure(true);
          });
      }
    });
  };

  const successAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSucessClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const failureAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleFailureClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
        <h2 id="Sum"> Total Amount: ${sum.toFixed(2)}</h2>
        <button className="Btn" id="checkoutIcon" onClick={handleCheckout}>
          {" "}
          <ShoppingCartCheckoutOutlinedIcon> </ShoppingCartCheckoutOutlinedIcon>
        </button>
      </Box>
      <Snackbar
        open={sucess}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleSucessClose}
        message="Order Submitted Sucessfully"
        action={successAction}
      >
        <Alert severity="success">
          <AlertTitle> Order Submitted Sucessfully </AlertTitle>
        </Alert>
      </Snackbar>
      <Snackbar
        open={failure}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleFailureClose}
        message="Sorry, some of the product "
        action={failureAction}
      >
        <Alert severity="error">
          <AlertTitle> Order Submition Failure </AlertTitle>
          Sorry, some of the products your requested don't have enough quantity
          in stock. Please check again. Thanks!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Cart;
