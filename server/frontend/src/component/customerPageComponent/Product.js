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
import { useDispatch } from "react-redux";
import { addProduct } from "../../controller/cartSlice";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

export default function Product(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      onClick={() => {
        console.log("22222");
        dispatch(addProduct(props.data));
      }}
      sx={{
        ":hover": {
          transform: "scale(1.055)",
        },
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate("/sellerX/product/" + props.data.uuid, {
            state: { data: props.data, isStatic: true },
          });
        }}
      >
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
        <Button variant="contained" size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
