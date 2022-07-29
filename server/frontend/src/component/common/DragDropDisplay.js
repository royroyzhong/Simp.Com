import React from "react";
import Carousel from 'react-material-ui-carousel'
import { getImages } from '../../controller/productSlice';
import { useSelector } from 'react-redux';
import { Paper, Button } from '@mui/material'

function DragDropDisplay() {
  const images = useSelector(getImages);
  return (
    <Carousel
      next={(next, active) => next}
      prev={(prev, active) => prev}
    >
      {
        images?.map((img, index) => <IndividualImage key={index} img={img} />)
      }

    </Carousel>
  )
}

function IndividualImage(props) {
  return (
    <Paper>
      <img src={props.img.src} height={400} ></img>
    </Paper>
  )

}

export default DragDropDisplay