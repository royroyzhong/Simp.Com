import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import Dropzone from '../../utils/Dropzone';
import cuid from "cuid";
import { Box, Container } from "@mui/system";

export default function DragDrop() {
    const [images, setImages] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
      acceptedFiles.map(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
          setImages(prevState => [
            ...prevState,
            { id: cuid(), src: e.target.result }
          ]);
        };
        reader.readAsDataURL(file);
        return file;
      });
    }, []);
  
      return (
        <Box> 
            <h1> Drag & Drop </h1>
            <Dropzone onDrop = {onDrop} accept={"image/*"} > </Dropzone>
        </Box>
      )
}