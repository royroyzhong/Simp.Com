import { Button, Card, CardContent, CardMedia, Divider, Fade, ImageList, ImageListItem, Stack, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import upload from "../../assets/upload.svg";

import bomb from "../../assets/bomb.svg";
import book from "../../assets/book.svg";
import flask from "../../assets/flask.svg";
import food from "../../assets/food.svg";

import { useDispatch, useSelector } from "react-redux";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import { addFeature, addTag, getBufferProduct, getFeatures, getName, getTags, getTitle, postNewProduct, setName, setTitle, updateProduct } from "../../controller/productSlice";
import { useParams } from "react-router-dom";

let imgs = [book, bomb, flask, food];

export default function ProductPage() {

    let dispatch = useDispatch();
    let product = useSelector(getBufferProduct);

    let { productId } = useParams()

    let leftStackStyle = {
        minWidth: 350
    }

    return (
        <Container sx={{ md: 4, mt: 4 }}>
            <Stack direction={'row'} spacing={2}>
                <ImagesDisplay></ImagesDisplay>
                <Stack
                    divider={
                        <Divider orientation="horizontal" flexItem></Divider>
                    }
                    spacing={2}
                    sx={leftStackStyle}
                >
                    <TitleDisplay />
                    <TagDisplay />
                    <TextDisplay />
                    <Button onClick={(e) => {

                        if (productId === undefined || productId === null) {
                            dispatch(postNewProduct({
                                name: product.name,
                                tags: product.tags,
                                features: product.features,
                                price: product.price,
                            }))
                        }
                        else 
                            dispatch(updateProduct({
                                uuid: productId,
                                name: product.name,
                                tags: product.tags,
                                features: product.features,
                                price: product.price,
                            }))
                    }}>Save</Button>
                </Stack>

            </Stack>
        </Container>
    )
}

function ImagesDisplay(props) {

    let cardstyle = {
        minWidth: 400
    }

    let imgStyle = {
        objectFit: "contain",
        border: "1px solid #eee"
    }

    let smImgStyle = {
        objectFit: "contain"
    }

    return (
        <Card variant="outlined" sx={cardstyle}>
            <CardContent>
                <CardMedia
                    image={book}
                    height={400}
                    component={"img"}
                    sx={imgStyle}
                />
                <ImageList cols={5} rowHeight={100} sx={{ margin: 0 }}>
                    {
                        imgs.slice(0, 5).map((img, index) => (
                            <ImageListItem key={index} sx={imgStyle}>
                                <CardMedia
                                    image={img}
                                    height={100}
                                    component={"img"}
                                    sx={smImgStyle}
                                />
                            </ImageListItem>
                        ))
                    }
                    <ImageListItem key={-1} sx={imgStyle}>
                        <CardMedia
                            image={upload}
                            height={100}
                            component={"img"}
                            sx={smImgStyle}
                        />
                    </ImageListItem>
                </ImageList>
            </CardContent>
        </Card>
    )
}

function TitleDisplay(props) {

    let name = useSelector(getName);
    let dispatch = useDispatch();

    return (
        <div>
            <Typography variant="h4">Product Name:</Typography>
            <TextField
                value={name}
                size="big"
                variant="outlined"
                onChange={event => {
                    dispatch(setName(event.target.value))
                }} />
        </div>
    )
}

function TagDisplay(props) {

    let tags = useSelector(getTags);
    let dispatch = useDispatch();

    const [shouldInputShow, toggleInput] = useState(false);
    const [tagBuffer, setTagBuffer] = useState("");

    const handleToggle = () => {
        toggleInput((prev) => !prev);
        if (tagBuffer !== "")
            dispatch(addTag(tagBuffer));
        setTagBuffer("");

    }

    let style = {
        height: "30%"
    }

    let tagInputStyle = {
        position: "absolute",
        maxWidth: 164,
        zIndex: 1000,
        backgroundColor: "white"
    }

    return (
        <Box sx={style}>
            <Typography variant="h5" align="left">Tags</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }} >
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
                <Box display={'flex'} >
                    <AddCircleOutlineIcon onClick={handleToggle} sx={{ margin: 1.5 }} />
                    <Fade in={shouldInputShow} sx={tagInputStyle}>
                        <TextField
                            value={tagBuffer}
                            size="small"
                            variant="outlined"
                            autoFocus={shouldInputShow}
                            onBlur={handleToggle}
                            onChange={event => setTagBuffer(event.target.value)} />
                    </Fade>
                </Box>
            </Box>
        </Box>
    )
}

function TextDisplay(props) {

    let textStyle = {
        textAlign: 'left'
    }

    let inputSpacing = {
        marginBottom: '16px'
    }

    let dispatch = useDispatch();
    let features = useSelector(getFeatures);


    const [shouldInputShow, toggleInput] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleToggle = () => {
        toggleInput((prev) => !prev);
        if (description !== "" || title !== "")
            dispatch(addFeature({
                title: title,
                description: description
            }));
        if (description !== "" && title !== "") {
            setDescription("");
            setTitle("");
        }
    }

    return (
        <Stack>
            <Box >
                {Object.entries(features).map(([fk, fv], index) => (
                    <Box key={index} sx={textStyle}>
                        <Typography variant="h5">{fk}</Typography>
                        <Typography paragraph>{fv}</Typography>
                    </Box>
                ))}
                <Box sx={{ display: "flex" }}>
                    <Fade in={!shouldInputShow}>
                        <AddCircleOutlineIcon onClick={handleToggle} sx={{}} />
                    </Fade>
                    <Fade in={shouldInputShow} >
                        <Box >
                            <TextField
                                sx={inputSpacing}
                                value={title}
                                size="large"
                                variant="standard"
                                autoFocus={shouldInputShow}
                                placeholder="title"
                                multiline
                                fullWidth
                                onChange={event => setTitle(event.target.value)} />
                            <TextField
                                value={description}
                                size="small"
                                variant="outlined"
                                multiline
                                fullWidth
                                onBlur={handleToggle}
                                minRows={10}
                                onChange={event => setDescription(event.target.value)} />
                        </Box>
                    </Fade>
                </Box>
            </Box>

        </Stack>
    )
}

function Tag(props) {

    let style = {
        backgroundColor: "#ddddee",
        fontSize: 16,
        padding: 1,
        margin: 1,
        borderRadius: 1
    }
    return (
        <Typography sx={style}>
            {props.children}
        </Typography>
    )
}
