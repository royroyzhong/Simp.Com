import React from "react";
import { getImages } from '../../controller/productSlice';
import { useSelector } from 'react-redux';

// Rendering individual images
const Image = ({ image }) => {
  return (
    <div className="file-item">
      <img alt={`img - ${image.id}`} src={image.src} className="file-img" height={300} width={300}/>
    </div>
  );
};

// ImageList Component
const DragDropDisplay = () => {
  const images = useSelector(getImages);

  // render each image by calling Image component
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        key={`${image.id}-image`}
      />
    );
  };

  // Return the list of files
  return <section className="file-list">{images?.map(renderImage)}</section>;
};

export default DragDropDisplay;