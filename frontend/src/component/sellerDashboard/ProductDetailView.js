import { Card, CardContent, CardMedia, Divider, Fade, Grid, ImageList, ImageListItem, Stack, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import upload from "../../assets/upload.svg";

import book from "../../assets/book.svg";
import bomb from "../../assets/bomb.svg";
import flask from "../../assets/flask.svg";
import food from "../../assets/food.svg";

import Header from "../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { addFeature, addTag, getBuffer } from "../../controller/productSlice";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";

let imgs = [book, bomb, flask, food];

export default function ProductPage(props) {

    let leftStackStyle = {
        minWidth: 350
    }

    return (
        <Container >
            <Header />
            <Stack direction={'row'} spacing={2}>
                <ImagesDisplay></ImagesDisplay>
                <Stack
                    divider={
                        <Divider orientation="horizontal" flexItem></Divider>
                    }
                    spacing={2}
                    sx={leftStackStyle}
                >
                    <TagDisplay />
                    <TextDisplay />
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
                <ImageList cols={5} rowHeight={100} sx={{margin:0}}>
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

function TagDisplay(props) {

    let dispatch = useDispatch();
    let buffer = useSelector(getBuffer);

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
            <Box sx={{display: "flex", flexWrap:"wrap"}} >
                {buffer.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
                <Box display={'flex'} >
                    <AddCircleOutlineIcon onClick={handleToggle} sx={{padding: 1.5}}/>
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
    
    let dispatch = useDispatch();
    let buffer = useSelector(getBuffer);

    const [shouldInputShow, toggleInput] = useState(false);
    const [inputBuffer, setInputBuffer] = useState("");

    const handleToggle = () => {
        toggleInput((prev) => !prev);
        if (inputBuffer !== "")
            dispatch(addFeature(inputBuffer));
        setInputBuffer("");
    }

    return (
        <Stack>
            <Typography variant="h5" align="left">Add a description</Typography>
            <Box >
                {buffer.features.map((f, index) => (
                    <Tag key={index}>{f}</Tag>
                ))}
                <Box >
                    <AddCircleOutlineIcon onClick={handleToggle} sx={{padding: 1.5}}/>
                    <Fade in={shouldInputShow} >
                        <TextField
                            value={inputBuffer}
                            size="small"
                            variant="outlined"
                            autoFocus={shouldInputShow}
                            onBlur={handleToggle}
                            onChange={event => setInputBuffer(event.target.value)} />
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
