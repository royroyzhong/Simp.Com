import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../controller/cartSlice";
import { Marginer } from "../../css/CommonStyle";

export default function Product(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [popUp, setPopup] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setPopup(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        ":hover": {
          transform: "scale(1.055)",
        },
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate("/buyer/product/" + props.data._id, {
            state: { data: props.data, isStatic: true },
          });
        }}
      >
        <CardContent>
          <Marginer margin="40px" />
          <CardMedia
            image={
              props.data.images.length > 0 ? props.data.images[0].data : ""
            }
            height={100}
            sx={{ objectFit: "contain" }}
            component={"img"}
          />
          <Marginer margin="40px" />
          <Typography
            gutterBottom
            align="left"
            variant="h5"
            sx={{ paddingLeft: "5px" }}
          >
            {props.data.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider light />

      <CardContent>
        <Typography
          align="left"
          variant="body1"
          sx={{ flex: 1, paddingLeft: "20px" }}
        >
          {props.data.storage + " in stock"}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          align="left"
          variant="body1"
          sx={{ flex: 1, paddingLeft: "20px" }}
        >
          {"$" + props.data.price}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            dispatch(addProduct(props.data));
            let updatedCart = JSON.parse(sessionStorage.getItem("Cart"));
            if (updatedCart != null) {
              let productIdx = updatedCart.findIndex(
                (p) => p._id === props.data._id
              );
              if (productIdx !== -1) {
                updatedCart[productIdx].quantity += 1;
              } else {
                updatedCart.push({
                  _id: props.data._id,
                  name: props.data.name,
                  soldBy: props.data.soldBy,
                  price: props.data.price,
                  quantity: 1,
                  storeName: props.data.storeName,
                });
              }
            } else {
              updatedCart = [
                {
                  _id: props.data._id,
                  name: props.data.name,
                  soldBy: props.data.soldBy,
                  price: props.data.price,
                  quantity: 1,
                  storeName: props.data.storeName,
                },
              ];
            }
            setPopup(true);
            sessionStorage.setItem("Cart", JSON.stringify(updatedCart));
          }}
        >
          Add to Cart
        </Button>
        <Snackbar
          open={popUp}
          autoHideDuration={600}
          onClose={handleClose}
          message="Added to cart sucessfully"
          action={action}
        />
      </CardActions>
    </Card>
  );
}
