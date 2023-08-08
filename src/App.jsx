import React, {useState, useEffect, useCallback} from 'react';
import Searchbar from './components/Searchbar/serachBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/buttonLoadmore';
import Modal from './components/Modal/modalImg';
import { getPhotosByQuery } from './api/api.js';
import { ProgressBar } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  // state = {
  //   images: [],
  //   image: null,
  //   page: 1,
  //   searchquery: '',
  //   isloading: false,
  //   showModal: false,
  //   largeImageUrl: '',
  // };
  
const [images, setimages] = useState([]);
const [page, setpage] = useState(1);
const [searchquery, setsearchquery] = useState('');
const [isloading, setisloading] = useState(false);
const [showModal, setshowmodal] = useState(false);
const [largeImageUrl, setlargeImageUrl] = useState('');


  const toggleModal = () => {
   setshowmodal(true);
  };

  const handleFormSubmit = newSearchquery => {
    if (newSearchquery === searchquery) {
      return toast.warn(`вы уже просматриваете ${searchquery}`);
    }

    setsearchquery(newSearchquery.toLowerCase());
    setimages([]);
    setisloading(true);
    setpage(1);
  };


  const fetchImages = useCallback(

    async pageNumber => {
      
      const photos = await getPhotosByQuery(searchquery, pageNumber);
      
      setimages(prevImage => [...prevImage, ...photos.hits])
      setpage(1);
      setisloading(false);
      setpage(prevPage => prevPage + 1);

     
    }, [searchquery]
   
  )

  useEffect(() => {
    setpage(1);
    setimages([]);
    if(searchquery !== ''){
      fetchImages()
    }
    console.log('сработал юз');
  }, [searchquery, fetchImages]);


  useEffect(() => {
    console.log('второй юз');
    if (page === 1) 
    return;
    fetchImages(page);
  }, [page, fetchImages]);

  

 const handleImageClick = largeImageUrl => {

  setlargeImageUrl(largeImageUrl)
    
    toggleModal();
  };

  const onClose = () => {
    setshowmodal(false);
  };
const handleLoadMore = () => {
  const nextPage = page + 1;

  setpage(nextPage)
  console.log(nextPage);

}

  
    
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {isloading && (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
            isloading={isloading}
          />
        )}

        <ImageGallery
          photos={images}
          onClick={handleImageClick}
        />
        {showModal && (
          <Modal
            onClose={onClose}
            largeImageUrl={largeImageUrl}
          />
        )}
        {images.length > 0 && <Button onClick={handleLoadMore} />}
      </>
    );
  
}
