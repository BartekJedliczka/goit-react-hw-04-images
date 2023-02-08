import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  render() {
    const { query, onSubmit, onChange } = this.props;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <span className={css.SearchForm__button__label}>Search</span>
          </button>
          <input
            onChange={onChange}
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.string,
};
export default Searchbar;
