import React from 'react';
import style from './galleryitem.module.scss';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ src, alt, largeImageURL, onClick }) => {
  return (
    <li className={style.galleryitem}>
      <img
        src={src}
        alt={alt}
        width='360px'
        onClick={() => {
          onClick(largeImageURL);
        }}
      />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};