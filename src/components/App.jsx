import { useState, useEffect } from 'react';
import { getImages } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoadMorePresent, setIsLoadMorePresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [currentModalImg, setCurrentModalImg] = useState({
    largeImageURL: '',
    alt: '',
  });

  useEffect(() => {
    if (query !== '' || currentPage !== 1) {
      fetchNextPage();
    }
  }, [query, currentPage]);

  const fetchNextPage = async () => {
    setLoading(true);

    try {
      const fetchData = await getImages({
        per_page: perPage,
        currentPage: currentPage,
        query: query,
      });

      setImages(prevImages => [...prevImages, ...fetchData.data.hits]);
      setIsLoadMorePresent(fetchData.data.hits.length === perPage);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = ev => {
    ev.preventDefault();
    const inputValue = ev.currentTarget.elements.search.value;

    setQuery(inputValue);
    setCurrentPage(1);
    setLoading(true);
    setImages([]);
    setIsLoadMorePresent(false);
  };

  const handleLoadMoreBtnClick = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const handleModalOpen = (largeImageURL, tags) => {
    setCurrentModalImg({
      largeImageURL: largeImageURL,
      alt: tags,
    });
    setIsModalShown(true);
  };

  const handleModalClose = ev => {
    if (ev.code === 'Escape' || ev.target === ev.currentTarget) {
      setIsModalShown(false);
    }
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} handleModalOpen={handleModalOpen} />
      {loading && <Loader />}
      {isLoadMorePresent && (
        <Button handleLoadMoreBtnClick={handleLoadMoreBtnClick} />
      )}
      {isModalShown && (
        <Modal image={currentModalImg} handleModalClose={handleModalClose} />
      )}
      <ToastContainer />
    </>
  );
};
