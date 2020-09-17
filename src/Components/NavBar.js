import React from 'react';
import Header from './Header';
import Menu from './Menu';


const Navbar = ({state, setState, setTrip, trip}) => {
    return (
      <>
        <Header
          state={state}
          setState={setState}
          setTrip={setTrip}
          trip={trip}
        />
        <Menu
          state={state}
          setState={setState}
        />
      </>
    );
}

export default Navbar;