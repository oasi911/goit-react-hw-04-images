import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Modal(props) {
  const { image, handleModalClose } = props;

  useEffect(() => {
    window.addEventListener('keydown', handleModalClose);
    return () => {
      window.removeEventListener('keydown', handleModalClose);
    };
  }, [handleModalClose]);

  return (
    <div className="Overlay" onClick={handleModalClose}>
      <div className="Modal">
        <img
          src={image.largeImageURL}
          alt={image.alt}
          width="800"
          height="600"
        />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  handleModalClose: PropTypes.func.isRequired,
};
