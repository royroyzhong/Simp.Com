import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { addImage } from "../../controller/productSlice";
import Dropzone from "./Dropzone";

export default function DragDrop() {
  let dispatch = useDispatch();

  const onDrop = (files) => {
    files.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        dispatch(addImage(e.target.result));
      };
      reader.readAsDataURL(file);
      return file;
    });
  };

  return (
    <Box>
      <Dropzone onDrop={onDrop} accept={"image/*"}></Dropzone>
    </Box>
  );
}
