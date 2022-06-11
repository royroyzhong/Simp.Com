import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Header from "../common/Header";
import { useSelector } from 'react-redux';
import { getProductList } from "../../controller/productSlice";
import avatar from "../../assets/avatar.jpg";
import snowman from "../../assets/snowman.svg";
//import food from "../../assets/food.svg";
import bomb from "../../assets/bomb.svg";
import book from "../../assets/book.svg";
import upload from "../../assets/upload.svg";
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
            <Header />
            <CardGrid />
        </Container>
    )
}

function CardGrid(props) {

    let products = useSelector(getProductList)

    return (
        <Grid container spacing={2} columns={{
            xs: 1, sm: 2, md: 12
        }}>
            {products.map((product, index) => (
                <Grid item key={index} xs={1} sm={1} md={3}>
                    <Card variant="outlined">
                        <CardActionArea>
                            <CardContent>
                                <Marginer margin="40px" />
                                <CardMedia
                                    image={imgs[product.imgRefs[0]]}
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
            ))}
            <Grid item key={-1} xs={1} sm={1} md={3}>
                <Card variant="outlined">
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