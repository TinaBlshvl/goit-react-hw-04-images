import css from '../styles/Styles.module.css';
import { useState } from 'react';
// import { Component } from 'react';
import { GrSearch } from 'react-icons/gr';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleText = e => {
    setValue(e.target.value.trim());
  };

  const onSubmitSearch = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmitSearch}>
        <button type="submit" className={css.searchFormButton}>
          <GrSearch className={css.searchIcon} />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={value}
          onChange={handleText}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
