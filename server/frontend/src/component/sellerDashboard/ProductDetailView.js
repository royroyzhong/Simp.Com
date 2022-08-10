import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Fade,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  addFeature,
  addTag,
  getBufferProduct,
  getFeatures,
  getImages,
  getName,
  getPrice,
  getStorage,
  getTags,
  loadProduct,
  postNewProduct,
  restockProductAsync,
  rmvFeature,
  rmvTag,
  setName,
  setPrice,
  setStorage,
  updateProduct,
} from "../../controller/productSlice";

import {
  removeProducts,
  resetInventoryStatus,
} from "../../controller/sellerSlice";
import DragDrop from "../common/DragDrop";
import DragDropDisplay from "../common/DragDropDisplay";

export default function ProductPage(props) {
  let dispatch = useDispatch();
  let product = useSelector(getBufferProduct);

  let { productId } = useParams();

  let location = useLocation();
  let navigate = useNavigate();

  let leftStackStyle = {
    minWidth: 350,
  };

  let [isStatic, setStatic] = useState(false);
  // false not in wishlist, true in wishlist

  // Set initial data if this is a static page
  useEffect(() => {
    if (location.state !== null && location.state.isStatic) {
      setStatic(true);
      // Set ProductSlice data
      let features = {};
      for (let description of location.state.data.descriptions) {
        features[description["title"]] = description["content"];
      }
      dispatch(
        loadProduct({
          name: location.state.data.name,
          title: "",
          features: features,
          tags: location.state.data.tags,
          price: location.state.data.price,
          storage: location.state.data.storage,
          images: location.state.data.images,
        })
      );
    }
  }, [dispatch, location]);

  return (
    <Container sx={{ md: 4, mt: 4 }}>
      <Stack direction={"row"} spacing={2}>
        <Stack>
          <ImagesDisplay isStatic={isStatic} productId={productId}></ImagesDisplay>
          {isStatic ? (
            <div></div>
          ) : (
            <DragDrop onDrop={DragDrop.onDrop} accept={"image/*"} />
          )}
        </Stack>
        <Stack
          divider={<Divider orientation="horizontal" flexItem></Divider>}
          spacing={2}
          sx={leftStackStyle}
        >

          <TitleDisplay isStatic={isStatic} />
          <PriceAndQuantity isStatic={isStatic} />
          <TagDisplay isStatic={isStatic} />
          <TextDisplay isStatic={isStatic} />
          {isStatic ? (
            <div></div>
          ) : (
            <Button
              onClick={(e) => {
                if (productId === undefined || productId === null) {
                  dispatch(
                    postNewProduct({
                      name: product.name,
                      tags: product.tags,
                      features: product.features,
                      price: product.price,
                      storage: product.storage,
                      images: product.images,
                    })
                  );
                } else {
                  if (product.storage > 0) {
                    dispatch(restockProductAsync(productId));
                  }
                  dispatch(
                    updateProduct({
                      _id: productId,
                      name: product.name,
                      tags: product.tags,
                      features: product.features,
                      price: product.price,
                      storage: product.storage,
                      images: product.images,
                    })
                  );
                }
                dispatch(resetInventoryStatus());
                navigate(-1);
              }}
            >
              Save
            </Button>
          )}
          {isStatic || productId === undefined ? (
            <div></div>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={(e) => {
                dispatch(removeProducts(productId));
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

function ImagesDisplay(props) {
  let cardstyle = {
    minWidth: 400,
  };

  let imgStyle = {
    objectFit: "contain",
    border: "1px solid #eee",
  };

  let smImgStyle = {
    objectFit: "contain",
  };

  let { productId } = useParams();
  const images = useSelector(getImages);
  return (
    <Card variant="outlined" sx={cardstyle}>
      <CardContent>
        <DragDropDisplay isStatic={props.isStatic} productId={productId}></DragDropDisplay>
        <ImageList cols={5} rowHeight={100} sx={{ margin: 0 }}>
          {images?.map((img, index) => (
            <ImageListItem key={index} sx={imgStyle}>
              <CardMedia
                image={img.data === undefined ? img.src : img.data}
                height={100}
                width={200}
                component={"img"}
                sx={smImgStyle}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </CardContent>
    </Card>
  );
}

function TitleDisplay(props) {
  let name = useSelector(getName);
  let dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h4">Product Name:</Typography>
      {props.isStatic ? (
        <Typography variant="h4">{name}</Typography>
      ) : (
        <TextField
          value={name}
          size="big"
          variant="outlined"
          onChange={(event) => {
            dispatch(setName(event.target.value));
          }}
        />
      )}
    </div>
  );
}

function PriceAndQuantity(props) {
  let price = useSelector(getPrice);
  let storage = useSelector(getStorage);
  let dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h5">Price</Typography>
      {props.isStatic ? (
        <Typography variant="h5">{price}</Typography>
      ) : (
        <TextField
          value={price}
          type="number"
          inputProps={{ min: 0 }}
          size="small"
          variant="outlined"
          onChange={(event) => {
            dispatch(setPrice(event.target.value));
          }}
        />
      )}
      <Typography variant="h5">Storage</Typography>
      {props.isStatic ? (
        <Typography variant="h5">{storage}</Typography>
      ) : (
        <TextField
          value={storage}
          type="number"
          size="small"
          variant="outlined"
          onChange={(event) => {
            dispatch(setStorage(event.target.value));
          }}
        />
      )}
    </div>
  );
}

function TagDisplay(props) {
  let tags = useSelector(getTags);
  let dispatch = useDispatch();

  const [shouldInputShow, toggleInput] = useState(false);
  const [tagBuffer, setTagBuffer] = useState("");

  const handleToggle = () => {
    toggleInput((prev) => !prev);
    if (tagBuffer !== "") dispatch(addTag(tagBuffer));
    setTagBuffer("");
  };

  const handleRmv = (toRmv) => {
    dispatch(rmvTag(toRmv));
  };

  let style = {
    height: "30%",
  };

  let tagInputStyle = {
    maxWidth: 164,
    zIndex: 1000,
    backgroundColor: "white",
  };

  return (
    <Box sx={style}>
      <Typography variant="h5" align="left">
        Tags
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tags.map((tag, index) => (
          <Tag isStatic={props.isStatic} key={index} rmv={handleRmv}>
            {tag}
          </Tag>
        ))}
        {props.isStatic ? null : (
          <Box display={"flex"}>
            <AddCircleOutlineIcon onClick={handleToggle} sx={{ margin: 1.5 }} />
            <Fade in={shouldInputShow} sx={tagInputStyle}>
              <TextField
                value={tagBuffer}
                size="small"
                variant="outlined"
                autoFocus={shouldInputShow}
                onBlur={handleToggle}
                onChange={(event) => setTagBuffer(event.target.value)}
              />
            </Fade>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function TextDisplay(props) {
  let textStyle = {
    textAlign: "left",
  };

  let inputSpacing = {
    marginBottom: "16px",
  };

  let dispatch = useDispatch();
  let features = useSelector(getFeatures);

  const [shouldInputShow, toggleInput] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleToggle = () => {
    toggleInput((prev) => !prev);
    if (description !== "" || title !== "")
      dispatch(
        addFeature({
          title: title,
          description: description,
        })
      );
    if (description !== "" && title !== "") {
      setDescription("");
      setTitle("");
    }
  };

  const handleRmv = (toRmv) => {
    dispatch(rmvFeature(toRmv));
  };

  return (
    <Stack>
      <Box>
        {Object.entries(features).map(([fk, fv], index) => (
          <Box key={index} sx={textStyle}>
            <Typography variant="h5">{fk}</Typography>
            {props.isStatic ? (
              <div></div>
            ) : (
              <Button onClick={(e) => handleRmv(fk)}>delete</Button>
            )}
            <Typography paragraph>{fv}</Typography>
          </Box>
        ))}
        {props.isStatic ? (
          <div></div>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Fade in={!shouldInputShow}>
              <AddCircleOutlineIcon onClick={handleToggle} sx={{}} />
            </Fade>
            <Fade in={shouldInputShow}>
              <Box>
                <TextField
                  sx={inputSpacing}
                  value={title}
                  size="large"
                  variant="standard"
                  autoFocus={shouldInputShow}
                  placeholder="title"
                  multiline
                  fullWidth
                  onChange={(event) => setTitle(event.target.value)}
                />
                <TextField
                  value={description}
                  size="small"
                  variant="outlined"
                  multiline
                  fullWidth
                  onBlur={handleToggle}
                  minRows={10}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Box>
            </Fade>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

function Tag(props) {
  let style = {
    backgroundColor: "#ddddee",
    fontSize: 16,
    padding: 1,
    margin: 1,
    borderRadius: 1,
  };
  return (
    <div>
      <Typography sx={style}>{props.children}</Typography>
      {props.isStatic ? (
        <div></div>
      ) : (
        <Button size="small" onClick={(e) => props.rmv(props.children)}>
          delete
        </Button>
      )}
    </div>
  );
}
