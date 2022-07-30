import { useDispatch} from "react-redux";
import Dropzone from './Dropzone';
import { Box} from "@mui/system";
import { addImage } from "../../controller/productSlice";

export default function DragDrop() {
  let dispatch = useDispatch();

  const onDrop = (files) => {
    files.map((file) => {
      console.log(file);
      const reader = new FileReader();
      reader.onload = function (e) {
        dispatch(addImage(e.target.result));
      }
      reader.readAsDataURL(file);
      return file;
    })
  }

  return (
    <Box>
      <Dropzone onDrop={onDrop} accept={"image/*"} > </Dropzone>
    </Box>
  )
}