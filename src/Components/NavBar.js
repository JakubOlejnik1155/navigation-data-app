import React from 'react';
import Header from './Header';
import Menu from './Menu';


const Navbar = ({state, setState, setTrip, setDistance}) => {
    return (
      <>
        <Header
          state={state}
          setState={setState}
          setTrip={setTrip}
          setDistance={setDistance}
        />
        <Menu
          state={state}
          setState={setState}
        />
      </>
    );
}

export default Navbar;