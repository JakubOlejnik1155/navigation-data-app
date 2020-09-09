import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { theme } from '../data/styleThemes';
import styled from 'styled-components';


const MenuList = styled.div`
  background-color: ${props => props.state.isNightModeOn ? theme.dark : theme.light};
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Menu = ({state, setState}) => {

  return (
    <SwipeableDrawer
        anchor = "left"
        open = {state.isMenuOpened}
        onClose = {() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
        onOpen = {() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
    >
      <MenuList
        state = {state}
      >
        <span>LIST OF MENU ITEMS</span>
        <span>LIST OF MENU ITEMS</span>
        <span>LIST OF MENU ITEMS</span>
      </MenuList>
    </SwipeableDrawer>
  );

}

export default Menu;