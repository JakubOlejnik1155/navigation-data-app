import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { theme } from '../data/styleThemes';
import MenuLink from './MenuLink';
import BoatIcon from '../images/boat.png';
import WeatherIcon from '../images/wind.png';
import MapIcon from '../images/maps-and-location.png';
import TripIcon from '../images/track.png';
import { makeStyles } from '@material-ui/core';


const MenuList = styled.div`
  background-color: ${props => props.state.isNightModeOn ? theme.dark : theme.light};
  padding: 10px;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const CRSpan = styled.span`
  font-family: Poppins, sans-serif;
  font-size: 12px;
  text-align: center;
  margin-top: auto;
  color: ${props => props.state.isNightModeOn ? theme.light : theme.dark}

`;
const useStyles = makeStyles(()=>({
  light: {
      backgroundColor: theme.light,
  }
}))

const Menu = ({state, setState}) => {

  const classes = useStyles();

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
        <List
          onClick={() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
          onKeyDown={() => setState({ ...state, isMenuOpened: !state.isMenuOpened })}
        >
          <MenuLink link='/' text="Gps Data" icon={BoatIcon} state={state} />
          <Divider className={state.isNightModeOn ? classes.light : ""}/>
          <MenuLink link='/wind-data' text="Wind Data" icon={WeatherIcon} state={state} />
          <Divider className={state.isNightModeOn ? classes.light : ""}/>
          <MenuLink link='/map' text="Map" icon={MapIcon} state={state} />
          <Divider className={state.isNightModeOn ? classes.light : ""}/>
          <MenuLink link='/my-trips' text="My Trips" icon={TripIcon} state={state} />
          <Divider className={state.isNightModeOn ? classes.light : ""}/>
        </List>
        <CRSpan state={state}>©:Jakub Olejnik 2020 / v1.0</CRSpan>
      </MenuList>
    </SwipeableDrawer>
  );

}

export default Menu;