import React from "react";
import style from './loadmore.module.scss'
import PropTypes from 'prop-types';
const Button = ({onClick}) => {
    return (
        <div>
            <button
            className={style.loadmore}
            type="button"
            onClick={onClick}>
                loadMore
            </button>
        </div>
    )
}
export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    
  }; 
