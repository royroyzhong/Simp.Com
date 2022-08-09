import Grid from "@mui/material/Grid";
import ItemInCart from './ItemInCart';
import "../../css/cart.css";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { useDispatch } from 'react-redux';
import { submitOrderAsync } from '../orders/orderThunks';
import { getUserAsync } from "../../controller/login/thunks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function SellingStore(props) {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [sucess, setSucess] = useState(false);
    const [failure, setFailure] = useState(false);

    const handleSucessClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSucess(false);
      };
    
      const handleFailureClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setFailure(false);
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
    
    const renderedProducts = props.products?.map((product, index) => {
        return <ItemInCart key={index} item={product} />
    })

    const handleCheckout = event => {
        event.preventDefault();
        dispatch(getUserAsync()).then((result) => {
            let statusCode = result.payload.statusCode;
            if (statusCode !== 200) {
                navigate("/login");
            } else {
                dispatch(submitOrderAsync(props.products));
                let updatedCart = JSON.parse(sessionStorage.getItem('Cart'));
                updatedCart = updatedCart.filter(product => props.products.findIndex(p => p._id === product._id) === -1);
                sessionStorage.setItem('Cart', JSON.stringify(updatedCart));
            }
        });
      }

    return (
        <Grid container className="sellingStore" sx={{ marginBottom: "2vw" }} >
            <Grid item xs={10} sx={{ marginBottom: "2vw" }} id="storeName">
                {props.StoreName}
            </Grid>
            <Grid item xs={10}>
                {renderedProducts}
            </Grid>
            <button className="Btn" id="subCheckoutIcon" onClick={handleCheckout}> <ShoppingCartCheckoutOutlinedIcon> </ShoppingCartCheckoutOutlinedIcon></button>
            <Snackbar
        open={sucess}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleFailureClose}
        message="Sorry, some of the product "
        action={failureAction}
      >
        <Alert severity="error">
          <AlertTitle> Order Submition Failure </AlertTitle>
          Sorry, some of the products your requested don't have enough quantity in stock. Please check again. Thanks!
        </Alert>
      </Snackbar>
        </Grid>
    )
}

export default SellingStore;