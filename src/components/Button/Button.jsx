// import { Component } from 'react';
// import css from '../styles/Styles';
import css from '../styles/Styles.module.css';

export const Button = ({ loading, numberPage }) => {
  const handleClick = () => {
    const newPage = numberPage + 1;
    loading(newPage);
  };

  return (
    <button className={css.button} onClick={handleClick} type="button">
      Load more
    </button>
  );
};
