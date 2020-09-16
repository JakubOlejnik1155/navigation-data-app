import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router';
import { theme } from '../data/styleThemes';
import GpsData from './Routes/GpsData';
import WeatcherData from './Routes/WeatherData';

const Container = styled.div`
    background-color: ${props => props.state.isNightModeOn ? theme.dark : theme.light};
    width: 100%;
    min-height: calc(100vh - 40px);
    max-height: calc(100vh - 40px);
`;

const AppContent = ({state, setState}) => {


    const Routes = (
        <Switch>
            <Route path="/" exact> <GpsData state={state}/></Route>
            <Route path="/wind-data" exact> <WeatcherData state={state} setState={setState}/></Route>
            <Route path="/map" exact> <span>map</span></Route>
            <Route path="/my-trips" exact> <span>trips</span></Route>
            <Route> <span>No souch route</span></Route>
        </Switch>
    )

    return (
        <Container
            state={state}
        >
         {Routes}
        </Container>
    );
}

export default AppContent;