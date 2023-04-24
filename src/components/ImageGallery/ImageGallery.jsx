import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImagesList } from './ImageGallery.styled';

export function ImageGallery({ images }) {
  return (
    <ImagesList>
      {images.map(image => (
        <ImageGalleryItem key={image.id} {...image} />
      ))}
    </ImagesList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;
