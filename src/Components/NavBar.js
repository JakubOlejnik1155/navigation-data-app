import React from 'react';
import Header from './Header';
import Menu from './Menu';


const Navbar = ({state, setState}) => {
    return (
      <>
        <Header
          state={state}
          setState={setState}
        />
        <Menu
          state={state}
          setState={setState}
        />
      </>
    );
}

export default Navbar;