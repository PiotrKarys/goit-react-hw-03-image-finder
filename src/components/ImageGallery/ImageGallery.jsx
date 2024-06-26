import React from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
