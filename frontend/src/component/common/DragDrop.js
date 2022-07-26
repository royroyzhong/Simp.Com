import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import Dropzone from './Dropzone';
import cuid from "cuid";
import { Box, Container } from "@mui/system";
import { getImages } from '../../controller/productSlice';
import  {addImage} from "../../controller/productSlice";

export default function DragDrop() {
    let images = useSelector(getImages);
  
    let dispatch = useDispatch();

    const [imageBuffer, setImageBuffer] = useState([]);

    const onDrop = (file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageBuffer({id:images.length, src:e.target.result});
        dispatch(addImage(imageBuffer));
      }
      reader.readAsDataURL(file);
      return file;
    }
  // useCallback(acceptedFiles => {
  //   acceptedFiles.map(file => {
  //     const reader = new FileReader();
  //     reader.onload = function(e) {
  //       setImages(prevState => [
  //         ...prevState,
  //         { id: cuid(), src: e.target.result }
  //       ]);
  //     };
  //     reader.readAsDataURL(file);
  //     return file;
  //   });
  // }, []);
      return (
        <Box> 
            <h1> Drag & Drop </h1>
            <Dropzone onDrop = {onDrop} accept={"image/*"} > </Dropzone>
        </Box>
      )
}