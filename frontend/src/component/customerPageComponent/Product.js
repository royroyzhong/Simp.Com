import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import picture from "../../assets/picture.svg";
import { Marginer } from "../../css/CommonStyle";
import { useDispatch } from 'react-redux';
import { addProduct } from "../../controller/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Product(props) {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    return (
        <Card variant="outlined" onClick={() => {console.log("22222");dispatch(addProduct(props.data));}}>
             <CardActionArea onClick={() => {
                navigate("/sellerX/product/" + props.data.uuid, {state: {data: props.data, isStatic: true}});
             }}>
                <CardContent>
                    <Marginer margin="40px" />
                    <CardMedia
                        image={picture}
                        height={100}
                        sx={{ objectFit: "contain" }}
                        component={"img"}
                    />
                    <Marginer margin="40px" />
                    <Typography gutterBottom variant="h5">
                        {props.data.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
    }