import React from 'react';
import style from './modal.module.scss';
import PropTypes from 'prop-types';
export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
   
  }
  componentDidUpdate() {
    window.removeEventListener('keydown', this.handleKeyDown);
   
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={style.Overlay} onClick={this.handleBackDropClick}>
        <div className={style.Modal}>
          <img src={this.props.largeImageUrl} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};