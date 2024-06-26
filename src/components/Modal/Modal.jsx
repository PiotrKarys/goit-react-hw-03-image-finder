import React, { Component } from "react";
import styles from "./Modal.module.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  handleKeyDown(e) {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  }

  render() {
    const { largeImageURL } = this.props;

    return (
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
