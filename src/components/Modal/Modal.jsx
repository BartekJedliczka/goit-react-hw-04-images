import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount(e) {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(e) {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      return this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    return (
      <div className={css.Overlay} onClick={this.props.onClose}>
        <div className={css.Modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  image: PropTypes.string.isRequired,
};

export default Modal;
