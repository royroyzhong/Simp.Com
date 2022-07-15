import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Header from "../common/Header";
import { useDispatch, useSelector } from 'react-redux';
import avatar from "../../assets/avatar.jpg";
import snowman from "../../assets/snowman.svg";
//import food from "../../assets/food.svg";
import bomb from "../../assets/bomb.svg";
import book from "../../assets/book.svg";
import upload from "../../assets/upload.svg";
import { Marginer } from "../../css/CommonStyle";
import { getProductList, getProductListStatus, getProducts } from "../../controller/sellerSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadProduct } from "../../controller/productSlice";

const imgs = {
    avatar: avatar,
    snowman: snowman,
    book: book,
    bomb: bomb
}

export default function ProductBoard(props) {

    return (
        <Container maxWidth={"lg"} >
            <Header />
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
        if (status === 'idle') {
            dispatch(getProducts());
        }
    }, [dispatch, status]);

    return (
        <Grid container spacing={2} columns={gridStyle}>
            {status === 'succeed' ? products.map((product, index) => (
                <Grid item key={index} xs={1} sm={1} md={3}>
                    <Card variant="outlined" onClick={(e) => {
                        // Set ProductSlice data
                        let features = {}
                        for (let description in product.descriptions) {
                            features[Object.keys(description)[0]] = Object.values(description)[0]
                        }
                        dispatch(loadProduct({
                            name: product.name,
                            title: "",
                            features: features,
                            tags: product.tags,
                            price: 0
                        }))
                        navigate("/sellerX/product/" + product.uuid);
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Marginer margin="40px" />
                                <CardMedia
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
                    navigate("/sellerX/product_page");
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