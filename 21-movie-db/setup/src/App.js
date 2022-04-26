import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import SingleMovie from './SingleMovie';
import Movies from './Movies';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movies/:id' element={<SingleMovie />} />
      <Route path='/movies' element={< Movies />} />

    </Routes>
    </>
  );
}

export default App;
