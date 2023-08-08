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
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  const handleFormSubmit = searchquery => {
    // if (searchquery === searchquery) {
    //   return toast.warn(`вы уже просматриваете ${searchquery}`);
    // }

    setsearchquery(searchquery.toLowerCase());
    setimages([]);
    setisloading(true);
    setpage(1);
  };


  const fetchImages = useCallback(

    async pageNumber => {
      const photos = await getPhotosByQuery(searchquery, page);

      setimages(prevImage => [...prevImage, photos.hits])
      setisloading(false);
      setpage(prevPage => prevPage + 1);
    }, [searchquery]
  )


  // const fetchImages = async () => {
  //   try {

      
      

      
  //     const photos = await getPhotosByQuery(searchquery, page);
      
  //     this.setState(prevState => ({
  //       // images: [...prevState.images, ...photos.hits],
  //       page: prevState.page + 1,
  //       isloading: false,
  //     }));
      
  //     if (photos.hits.length > 0 && this.state.page === 1) {
  //       toast.success('you are our images');
        
        
  //     } else if(photos.hits.length === 0){
  //       throw new Error();
  //     }
  //   } catch (err) {
      
  //     toast.error('No IMAGES found');
      
  //   }
  // };
  

  useEffect(() => {
    setpage(1);
    setimages([]);
    
    if(searchquery !== ''){
      fetchImages
    }
    
  }, [fetchImages])

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchquery !== this.state.searchquery) {
  //     this.fetchImages();
      
  //   }
  // }

 const handleImageClick = largeImageUrl => {
    this.setState({ largeImageUrl });
    this.toggleModal();
  };

  const onClose = () => {
    this.setState({ showModal: false });
  };
const handleLoadMore = () => {
  setpage(prevPage => prevPage + 1)
}
  
    // const { showModal } = this.state;
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
