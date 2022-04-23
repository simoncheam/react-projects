import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from './context';

const Submenu = () => {
  const { isSubmenuOpen, location } = useGlobalContext();
  const container = useRef(null);

  // EU gets location from the global context
  useEffect(() => {
    const submenu = container.current;
    const {center, bottom} = location; // from context
    submenu.style.left= `${center}px`;
    submenu.style.top= `${bottom}px`;

  }, [location]);

  return <aside className={`${
    isSubmenuOpen ? 'submenu show' :
     'submenu'}`}
     ref={container}>submenu </aside>;
};

export default Submenu;
