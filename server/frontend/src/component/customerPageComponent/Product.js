import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import picture from "../../assets/picture.svg";
import { Marginer } from "../../css/CommonStyle";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, getCart } from "../../controller/cartSlice";
import Divider from "@mui/material/Divider";

export default function Product(props) {
  let dispatch = useDispatch();
  let cart = useSelector(getCart);

  return (
    <Card
      variant="outlined"
      sx={{
        ":hover": {
          transform: "scale(1.055)",
        },
      }}
    >
      <CardActionArea>
        <CardContent>
          <Marginer margin="40px" />
          <CardMedia
            image={picture}
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

      <CardActions>
        <Typography
          align="left"
          variant="body1"
          sx={{ flex: 1, paddingLeft: "20px" }}
        >
          $12.99
        </Typography>
        <Button variant="contained" size="small" color="primary" onClick={() => {
          dispatch(addProduct(props.data));
          let updatedCart = [...cart];
          let productIdx = updatedCart.findIndex(p => p._id === props.data._id);
          if (productIdx !== -1) {
            ++updatedCart[productIdx].quantity;
          } else {
            updatedCart.push({
              id: props.data._id,
              name: props.data.name,
              soldBy: props.data.soldBy,
              price: props.data.price,
              quantity: 1});
          }
          sessionStorage.setItem('Cart', JSON.stringify(updatedCart));
        }}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
