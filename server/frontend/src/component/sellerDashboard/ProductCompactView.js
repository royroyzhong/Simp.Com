import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import avatar from "../../assets/avatar.jpg";
import snowman from "../../assets/snowman.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bomb from "../../assets/bomb.svg";
import book from "../../assets/book.svg";
import upload from "../../assets/upload.svg";
import { loadProduct } from "../../controller/productSlice";
import { getProductList, getProductListStatus, getProducts } from "../../controller/sellerSlice";
import { Marginer } from "../../css/CommonStyle";

const imgs = {
    avatar: avatar,
    snowman: snowman,
    book: book,
    bomb: bomb
}

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
                            images: product.images.map(i => JSON.parse(i))
                        }))
                        navigate("/sellerX/product/" + product.uuid);
                    }}>
                        <CardActionArea>
                            <CardContent>
                                <Marginer margin="40px" />
                                <CardMedia
                                    image={product.images.length > 0 ? JSON.parse(product.images[0]).src : ""}
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