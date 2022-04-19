import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);



 const removeTour = (id) => {
   // returns true for all sub-items(tour) that does not match "id"
    const newTours = tours.filter((tour)=> tour.id !==id)
  setTours(newTours)
  }


  useEffect(() => {
    fetchTours();
    //API stuff
  }, []);

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      console.log(tours);
      setTours(tours)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else {
    if(tours.length===0){
      return <main>
        <div className='title'>
          <h2>No tours left</h2>
          <button className='btn' onClick={fetchTours}>
            Refresh
          </button>
        </div>


      </main>
    }

    return (
      <main>
        <Tours tours={tours} removeTour ={removeTour}/>
      </main>
    );
  }
}

export default App;
