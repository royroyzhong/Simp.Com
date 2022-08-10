import { Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { getImages } from "../../controller/productSlice";
import WishlistIcon from "../cart/WishlistIcon";
import { Container } from "@mui/system";


function DragDropDisplay(props) {
  const images = useSelector(getImages);
  return (
    <Container>
          {props.isStatic ? (
            <WishlistIcon productId={props.productId}></WishlistIcon>
          ) : (
            <br></br>
          )}
      <Carousel next={(next, active) => next} prev={(prev, active) => prev}>
        {images?.map((img, index) => (
          <IndividualImage
            key={index}
            img={img.data === undefined ? img : { src: img.data }}
          />
        ))}
      </Carousel>
    </Container>
  );
}

function IndividualImage(props) {
  return (
    <Paper>
      <img src={props.img.src} height={400}></img>
    </Paper>
  );
}

export default DragDropDisplay;
