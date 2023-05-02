// import { Component } from 'react';
import { useEffect } from 'react';
import css from '../styles/Styles.module.css';
// import css from '../styles/Styles';

export const Modal = ({ urlImage, toggleModal }) => {
  useEffect(() => {
    const onEsc = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    const onBackdrop = e => {
      if (e.target.nodeName !== 'IMG') {
        toggleModal();
      }
    };
    window.removeEventListener('keydown', onEsc);
    window.removeEventListener('click', onBackdrop);

    window.addEventListener('keydown', onEsc);
    window.addEventListener('click', onBackdrop);
  }, [toggleModal]);

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={urlImage} alt="" />
      </div>
    </div>
  );
};
