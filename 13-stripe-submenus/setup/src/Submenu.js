import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from './context';

const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext();
  const container = useRef(null);
  const [columns, setColumns] = useState('col-2');

  // EU gets location from the global context
  useEffect(() => {
    setColumns('col-2');
    const submenu = container.current;
    const { center, bottom } = location; // from context
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    // column styling for links
    if (links.length === 3) {
      setColumns('col-3');
    } else if (links.length > 3) {
      setColumns('col-4');
    }
  }, [location, links]);

  return (
    <aside className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`} ref={container}>
      <h4>{page}</h4>
      <div className={`submenu-center col-2 ${columns}`}>
        {links.map(({ label, url, icon }, index) => (
          <a key={index} href={url}>
            {icon}
            {label}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Submenu;
