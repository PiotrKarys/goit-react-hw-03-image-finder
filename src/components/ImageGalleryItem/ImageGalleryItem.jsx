import React from "react";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <li
      className={styles.galleryItem}
      onClick={() => onImageClick(image.largeImageURL)}>
      <img src={image.webformatURL} alt="" className={styles.image} />
    </li>
  );
};

export default ImageGalleryItem;
