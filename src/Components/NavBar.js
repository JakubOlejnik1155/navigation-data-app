import React from 'react';
import Header from './Header';
import Menu from './Menu';


const Navbar = ({state, setState, setTrip}) => {
    return (
      <>
        <Header
          state={state}
          setState={setState}
          setTrip={setTrip}
        />
        <Menu
          state={state}
          setState={setState}
        />
      </>
    );
}

export default Navbar;