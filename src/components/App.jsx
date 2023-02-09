import React, { useState } from 'react';
import css from './App.module.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import fetchImg from '../services/PixabayApi';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImage] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert.error('Enter your search query');
      return;
    }

    setImage([]);
    setPage(1);
    fetchQuery(1);
  };

  const handleChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const fetchQuery = async page => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchImg(query, page);
      setImage(prevState => [...prevState, ...response]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    fetchQuery(query + 1);
  };

  const onShow = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const onClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className={css.App}>
      {error && <p>Something went wrong: {error.message}</p>}
      <Searchbar onSubmit={onSubmit} onChange={handleChange} query={query} />
      <ImageGallery images={images} onShow={onShow} />
      {images.length > 0 && !isLoading ? (
        <Button onClick={handleLoadMore} />
      ) : (
        ''
      )}
      {isLoading && <Loader />}
      {showModal && <Modal onClose={onClose} image={largeImageURL} />}
    </div>
  );
};

export default App;
