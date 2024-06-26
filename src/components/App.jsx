import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./SearchBar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import styles from "./app.module.css";

const API_KEY = "43728085-c2fe2d16d23a402329bbec6f8";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
        );
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
        setHasMore(response.data.hits.length > 0);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImageURL) => {
    setIsModalLoading(true);
    setTimeout(() => {
      setLargeImageURL(largeImageURL);
      setIsModalLoading(false);
    }, 500);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && hasMore && (
        <Button onClick={handleLoadMore} />
      )}
      {isModalLoading && <Loader />}
      {largeImageURL && !isModalLoading && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
