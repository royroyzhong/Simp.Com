import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import upload from "../../assets/upload.svg";
import { loadImages, loadProduct } from "../../controller/productSlice";
import { getProductList, getProductListStatus, getProducts } from "../../controller/sellerSlice";
import { REQUEST_STATE } from "../../controller/utils";
import { Marginer } from "../../css/CommonStyle";

export default function ProductBoard(props) {

    return (
        <Container maxWidth={"lg"} >
            <CardGrid />
        </Container>
    )
}

function CardGrid(props) {

    let products = useSelector(getProductList);
    let status = useSelector(getProductListStatus);
    let gridStyle = {
        xs: 1, sm: 2, md: 12
    };

    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        if (status === REQUEST_STATE.IDLE) {
            dispatch(getProducts());
        }
    }, [dispatch, status]);

    return (
        <Grid container spacing={2} columns={gridStyle}>
            {status === REQUEST_STATE.FULFILLED ? products.map((product, index) => (
                <Grid item key={index} xs={1} sm={1} md={3}>
                    <Card variant="outlined" onClick={() => {
                        // Set ProductSlice data
                        let features = {}
                        for (let description of product.descriptions) {
                            features[description['title']] = description['content'];
                        }
                        dispatch(loadProduct({
                            name: product.name,
                            title: "",
                            features: features,
                            tags: product.tags,
                            price: product.price,
                            storage: product.storage,
                            images: product.images
                        }))
                        navigate("/seller/product/" + product._id);
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Marginer margin="40px" />
                                <CardMedia
                                    image={product.images.length > 0 ? product.images[0].data : ""}
                                    height={100}
                                    sx={{
                                        objectFit: "contain"
                                    }}
                                    component={"img"} />
                                <Marginer margin="40px" />
                                <Typography gutterBottom variant="h5">
                                    {product.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )) : null}
            <Grid item key={-1} xs={1} sm={1} md={3}>
                <Card variant="outlined" onClick={(e) => {
                    dispatch(loadProduct({
                        name: "",
                        title: "",
                        features: {},
                        tags: [],
                        price: 0,
                        storage: 0,
                        images: []
                    }))
                    navigate("/seller/product_page");
                }}>
                    <CardActionArea>
                        <CardContent>
                            <Marginer margin="40px" />
                            <CardMedia
                                image={upload}
                                height={100}
                                sx={{
                                    objectFit: "contain"
                                }}
                                component={"img"}
                            />
                            <Marginer margin="40px" />
                            <Typography gutterBottom variant="h5">
                                New Product
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    )
}