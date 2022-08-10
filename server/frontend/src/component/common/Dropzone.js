import React from "react";
import { useDropzone } from "react-dropzone";
import "../../css/dropBox.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from "@mui/system";

/* Citation: https://blog.logrocket.com/drag-and-drop-react-dnd/*/

const Dropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="dropBox">
        {isDragActive ? (
          <p>Release to drop the files here</p>
        ) : (
          <Box>
            <CloudUploadIcon sx={{fontSize: "100px"}} ></CloudUploadIcon>
            <h1>
              Drop your images here
            </h1>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
