import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [queryParam, setQueryParam] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1) // ! resets page value


  };

  // page change -->  refetch
  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);

    let url;
    const urlPage = `&page=${page}`; //page url
    const urlQuery = `&query=${queryParam}`

    if(queryParam){

      url = ` ${searchUrl}${clientID}${urlPage}${urlQuery}`
    }else{

      url = `${mainUrl}${clientID}${urlPage}`; // * main url
    }



    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data)

      setPhotos((oldPhotos)=>{

        if(queryParam && page ===1){
          return data.results
        }else if(queryParam){

          return [...oldPhotos, ...data.results]

        }else{

          return [...oldPhotos, ...data]

        }
      });


      setLoading(false);


    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        console.log('END! - fetch new images');

        setPage((oldPage) => { //? where does the old page come from?
          return oldPage + 1;
        });
      }
      // check innder hight, scroll amount
      // console.log(`inner height ${window.innerHeight}`);
      // console.log(`scrollY: ${window.scrollY}`);
      // console.log(`bodyHeight ${document.body.scrollHeight}`);

      // eslint-disable-next-line
    });

    return () => window.removeEventListener('scroll', event);
  }, []);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input className="form-input" type="text" placeholder="search" value={queryParam}
          onChange={(e)=>setQueryParam(e.target.value)} />
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
