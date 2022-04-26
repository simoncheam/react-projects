import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [queryParam, setQueryParam] = useState('');
  const mounted = useRef(false);
  const [newImages, setNewImages] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!queryParam) return;

    if (page === 1) {
      fetchImages();
      return;
    }

    setPage(1); // ! resets page value
  };

  // page change -->  refetch
  useEffect(() => {
    fetchImages();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


  // ! 2nd UE - only run after initial render
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    console.log('second ');
    if(!newImages) return;
    if(loading) return;

    setPage((oldPage) => oldPage+1)


  }, [newImages]);

  // ! refactored scrolling functionality

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', event);

    return () => window.removeEventListener('scroll', event);
  }, []);



  const fetchImages = async () => {
    setLoading(true);

    let url;
    const urlPage = `&page=${page}`; //page url
    const urlQuery = `&query=${queryParam}`;

    if (queryParam) {
      url = ` ${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`; // * main url
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      // console.log(data);

      setPhotos((oldPhotos) => {
        if (queryParam && page === 1) {
          return data.results;
        } else if (queryParam) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            className="form-input"
            type="text"
            placeholder="search"
            value={queryParam}
            onChange={(e) => setQueryParam(e.target.value)}
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => (
            <Photo key={photo.id} {...photo} />
          ))}
        </div>
        {loading && <h2 className="loading">Loading... </h2>}
      </section>
    </main>
  );
}

export default App;

//removed:

// useEffect(() => {
//   const event = window.addEventListener('scroll', () => {
//     if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
//       console.log('END! - fetch new images');

//       setPage((oldPage) => { //? where does the old page come from?
//         return oldPage + 1;
//       });
//     }
//     // check innder hight, scroll amount
//     // console.log(`inner height ${window.innerHeight}`);
//     // console.log(`scrollY: ${window.scrollY}`);
//     // console.log(`bodyHeight ${document.body.scrollHeight}`);

//   });

//   return () => window.removeEventListener('scroll', event);
//   // eslint-disable-next-line

// }, []);
