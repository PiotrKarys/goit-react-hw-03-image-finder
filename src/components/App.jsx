import React, { Component } from "react";
import axios from "axios";
import Searchbar from "./SearchBar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import styles from "./app.module.css";

const API_KEY = "43728085-c2fe2d16d23a402329bbec6f8";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      query: "",
      page: 1,
      isLoading: false,
      largeImageURL: null,
      hasMore: true,
      isModalLoading: false,
    };
  }

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then((response) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.data.hits],
          hasMore: response.data.hits.length > 0,
        }));
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchSubmit = (newQuery) => {
    this.setState(
      {
        query: newQuery,
        page: 1,
        images: [],
      },
      () => {
        this.fetchImages();
      },
    );
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchImages();
      },
    );
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ isModalLoading: true });
    setTimeout(() => {
      this.setState({
        largeImageURL: largeImageURL,
        isModalLoading: false,
      });
    }, 500);
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { images, isLoading, hasMore, largeImageURL, isModalLoading } =
      this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && hasMore && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isModalLoading && <Loader />}
        {largeImageURL && !isModalLoading && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
