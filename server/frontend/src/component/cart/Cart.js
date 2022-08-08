/* Styling & MUI */
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../../css/cart.css";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

/* Styling & MUI */
import React from "react";
import { useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, loadFromStorage, getSum} from "../../controller/cartSlice";
import SellingStore from "./SellingStore";
import { useEffect } from "react";
import { submitOrderAsync } from "../orders/orderThunks";
import { getUserAsync } from "../../controller/login/thunks";

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
  let sum = useSelector(getSum);
  let uniqueStoreIds = [...new Set(cart?.map((product) => product.soldBy))];
  let storeIds = Array.from(uniqueStoreIds).sort();

  const renderedSellingStores = []

  for (let i in storeIds) {
    let storeId = storeIds[i];
    let storeName = cart.find(product => product.soldBy === storeId).storeName;
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
        <h2 id="Sum"> Total Amount: ${sum}</h2>
        <button className="Btn" id="checkoutIcon" onClick={handleCheckout}>
          {" "}
          <ShoppingCartCheckoutOutlinedIcon> </ShoppingCartCheckoutOutlinedIcon>
        </button>
      </Box>
    </Container>
  );
}

export default Cart;
