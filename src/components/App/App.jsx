// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { Grid } from 'react-loader-spinner';
import { getImages } from 'services/fetch';

// import Searchbar from './Searchbar/Searchbar';
// import Button from './Button/Button';
// import Modal from './Modal/Modal';
// import ImageGallery from './Image/ImageGallary';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  // state = {
  //   isShown: false,
  //   page: 1,
  //   loader: false,
  //   total: 0,
  //   result: [],
  //   search: '',
  //   modalUrl: null,
  // };

  const [isShown, setIsShown] = useState(false);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState('');
  const [modalUrl, setModalUrl] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setLoader(true);

    async function fetch(prevProp, prevState) {
      if (page === 1) {
        // this.setState({
        //   result: [],
        //   total: 0,
        //   loader: true,
        // });

        setResult([]);
        setTotal(0);
        setLoader(true);

        try {
          const data = await getImages(search);
          const res = data.hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });

          setResult(res);
          setTotal(data.totalHits);
          setLoader(false);
        } catch (error) {
          setLoader(false);
        }
      } else {
        try {
          const data = await getImages(search, page);
          const res = data.hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });

          // result: [...prevState.result, ...res],
          // loader: false,
          // page,
          setResult(prevResults => [...prevResults, ...res]);
          setLoader(false);
          setPage(page);
        } catch (error) {
          setLoader(false);
        }
      }
    }
    fetch();
  }, [search, page]);

  const formSubmit = searchValue => {
    setSearch(searchValue);
    setPage(1);
  };

  const loadMore = page => {
    setPage(page);
  };

  const toggleModal = () => {
    setIsShown(!isShown);
  };

  const openModalImg = e => {
    if (e.nodeName !== 'IMG') {
      return;
    }

    toggleModal();
    setModalUrl(e.dataset.url);

    // const { search, loader, result, page, modalUrl, total } = this.state;
  };

  return (
    <div>
      <Searchbar onSubmit={formSubmit} />
      {loader && (
        <Grid
          height="120"
          width="120"
          color="#303f9f"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          // align-items="center"
          // justify-content="center"
          // margin="0 auto"
        />
      )}

      {result.length > 0 && (
        <ImageGallery items={result} openModal={openModalImg} />
      )}

      {isShown && <Modal urlImage={modalUrl} toggleModal={toggleModal} />}

      {result.length > 0 && result.length < total && !loader && (
        <Button value={search} loadMore={loadMore} numberPage={page} />
      )}

      {total === 0 && search && !loader && <p>No photo after your search...</p>}
    </div>
  );
};
