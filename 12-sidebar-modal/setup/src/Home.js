import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { AppContext, useGlobalContext } from './context';
const Home = () => {

  const {openSidebar, openModal} = useGlobalContext();

  const data = useGlobalContext();
  //console.log(data); // getting the data from the context
  return (
    <main>
      <button className="sidebar-toggle" onClick={openSidebar}>
        <FaBars />
      </button>

      <button className="btn" onClick={openModal}>show modal</button >
    </main>
  );
};

export default Home;
