import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import style from './imageGallery.module.scss'
const ImageGallery = ({ photos, onClick }) => {
  return (
    <ul className={style.gallery}>
      {photos.map(photo => (
        <ImageGalleryItem
          key={photo.id}
          src={photo.webformatURL}
          largeImageURL={photo.largeImageURL}
          alt={photo.tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
