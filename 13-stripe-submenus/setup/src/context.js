import React, { useState, useContext } from 'react';
import sublinks from './data';

// setup global context

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);
  const [location, setLocation] = useState({});
  //submenu function

  //open submenu

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text, coordinates) => {
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isSubmenuOpen,
        openSidebar,
        closeSidebar,

        openSubmenu,
        closeSubmenu,
        location
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
