import React, {useState} from 'react';
import style from './searchbar.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
 const Searchbar = ({onSubmit}) =>  {
 
  const [searchquery, setSearchquery] = useState('');
  const onSubmitForm = event => {
    event.preventDefault();
    if (searchquery.trim() === '') {
      
      toast.warn('Please enter the string')
      return;
    }
    onSubmit(searchquery);
    setSearchquery('');
  };

 const onFormChange = event => {
   setSearchquery(
    event.currentTarget.value.toLowerCase() 
    )
  };


    return (
      <>
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

       <header className={style.searchbar}>
        <form className={style.form} onSubmit={onSubmitForm}>
          <button type="submit" className={style.button}>
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onFormChange}
            value={searchquery}
          />
        </form>
      </header>
      </>
     


    );
  
}
export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
