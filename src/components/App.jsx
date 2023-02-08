import React, { Component } from 'react';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import { fetchImg } from '../services/PixabayApi';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    webformatURL: '',
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Enter your search query');
      return;
    }

    this.setState({ images: [], page: 1 }, () => {
      this.fetchQuery(this.state.query);
    });
  };

  handleChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  fetchQuery = async valueQuery => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetchImg(valueQuery, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...response],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchQuery(this.state.query);
    });
  };

  onShow = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, largeImageURL, showModal } = this.state;

    return (
      <div className={css.App}>
        <Searchbar
          onSubmit={this.onSubmit}
          onChange={this.handleChange}
          query={this.state.query}
        />
        <ImageGallery images={images} onShow={this.onShow} />
        {images.length && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.onClose} image={largeImageURL} />}
      </div>
    );
  }
}

export default App;
