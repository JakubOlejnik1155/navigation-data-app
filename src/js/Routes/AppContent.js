import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router';
import { theme } from '../../data/styleThemes';
import GpsData from './GpsData';
import WeatcherData from './WeatherData';
import Map from './Map';
import Trips from './Trips';
import TripSpecificdata from './TripSpecificData'
import Harbors from './Harbors';
import Error404 from './Error404';
const Container = styled.div`
    background-color: ${props => props.state.isNightModeOn ? theme.dark : theme.light};
    width: 100%;
    min-height: calc(100vh - 40px);
    max-height: calc(100vh - 40px);
`;

const AppContent = ({state, setState, trip, setTrip, distance, log}) => {

    const GoogleMap = React.useMemo( ()=> {
        return <Map state={state} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.isNightModeOn])

    const Routes = (
        <Switch>
            <Route path="/" exact> <GpsData state={state} trip={trip} setTrip={setTrip} distance={distance} log={log}/></Route>
            <Route path="/wind-data" exact> <WeatcherData state={state} setState={setState}/></Route>
            <Route path="/map" exact>  {GoogleMap}</Route>
            <Route path="/my-trips" exact> <Trips state={state}/></Route>
            <Route path="/harbors" exact> <Harbors state={state}/></Route>
            <Route path="/my-trips/:tripTime" >
                <TripSpecificdata state={state}/>
            </Route>
            <Route> <Error404 state={state}/></Route>
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