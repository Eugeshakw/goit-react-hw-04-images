import React, {Component} from 'react';
import style from './searchbar.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
export default class Searchbar extends Component {
  state = {
    searchquery: '',
  };

  onSubmitForm = event => {
    event.preventDefault();
    if (this.state.searchquery.trim() === '') {
      
      toast.warn('Please enter the string')
      return;
    }
    this.props.onSubmit(this.state.searchquery);
    this.setState({ searchquery: '' });
  };

  onFormChange = event => {
    this.setState({ searchquery: event.currentTarget.value.toLowerCase() });
  };

  render() {
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
        <form className={style.form} onSubmit={this.onSubmitForm}>
          <button type="submit" className={style.button}>
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onFormChange}
            value={this.state.searchquery}
          />
        </form>
      </header>
      </>
     


    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
