import React from 'react';
import { get } from 'idb-keyval';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../data/styleThemes';
import formatcoords from 'formatcoords';
import SpecificRouteMap from './SpecificRouteMap';

const Container = styled.div`
    background-color: ${(props) => props.state.isNightModeOn === true ? theme.dark : theme.light};
    width: 100%;
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
`;
const HeadData = styled.div`
    color: ${(props) => props.state.isNightModeOn === true ? theme.red : theme.dark};
    background-color: transparent;
    width: 100%;
    flex-basis: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const Data = styled.div`
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 36px;
    position: relative;
`;
const DataCoords = styled.div`
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 16px;
    position: relative;
`;
const DataUnits = styled.span`
    font-size: 16px;
    font-weight: normal;
`;
const MapContainer = styled.div`
    flex-grow: 1;
    background-color: gray;
`;
const findAvg = array => {
    let sum = 0;
    array.forEach(element => {
        sum = sum + element;
    });
    return sum / array.length;
}
const findMax = array => {
    let max = 0;
    array.forEach(element => {
        if (element > max) max = element
    });
    return max;
}
function msToTime(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}


const TripSpecificdata = ({state}) => {
    const { tripTime } = useParams();
    const [trip, setTrip] = React.useState(null);

    const GoogleMap = React.useMemo(() => {
        return trip ? <SpecificRouteMap state={state} trip={trip}/> : "Loading Map"
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isNightModeOn, trip])
    React.useEffect(()=> {
        async function getTrip(tripTime){
            await get("tripsArray").then(array => {
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    if(element.startTime === tripTime) setTrip(element);
                }
            })
        }
        getTrip(tripTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
            <Container state = {state} >
                <HeadData state={state}>
                    <Data>
                        {trip && Math.round(trip.tripDistance / 1852 * 10) / 10}
                        <DataUnits>nm</DataUnits>
                    </Data>
                    <Data>
                        <sup style={{ fontWeight: 'normal', fontSize: '12px', fontStyle: 'italic'}}>MAX </sup>
                        {trip && Math.round(findMax(trip.speedArray) * 1.94384449*10)/10}
                        <DataUnits>knt</DataUnits>
                    </Data>
                    <Data>
                        <sup style={{ fontWeight: 'normal', fontSize: '12px', fontStyle: 'italic'}}>AVG </sup>
                        {trip && Math.round(findAvg(trip.speedArray) * 1.94384449*10)/10}
                        <DataUnits>knt</DataUnits>
                    </Data>
                </HeadData>
            <MapContainer>
                {trip && GoogleMap}
            </MapContainer>
            <HeadData state={state}>
                <Data>
                    { trip && msToTime(new Date(trip.endTime).getTime() - new Date(trip.startTime).getTime()).hour }
                        <DataUnits>{"h "}</DataUnits>
                    {trip &&  msToTime(new Date(trip.endTime).getTime() - new Date(trip.startTime).getTime()).minute}
                        <DataUnits>m</DataUnits>
                </Data>
                <div>
                    <DataCoords><sup style={{ fontWeight: 'normal', fontSize: '11px', fontStyle: 'italic' }}>FROM </sup>
                        {trip && formatcoords(trip.coordsArray[0][0], trip.coordsArray[0][0]).format('DDMMssX', { latLonSeparator: '| ', decimalPlaces: 0 }).split('|')[0]}
                        {trip && formatcoords(trip.coordsArray[0][1], trip.coordsArray[0][1]).format('DDMMssX', { latLonSeparator: '| ', decimalPlaces: 0}).split('|')[1]}
                    </DataCoords>
                    <DataCoords><sup style={{ fontWeight: 'normal', fontSize: '11px', fontStyle: 'italic' }}>TO </sup>
                        {trip && formatcoords(trip.coordsArray[trip.coordsArray.length-1][0], trip.coordsArray[trip.coordsArray.length-1][0]).format('DDMMssX', { latLonSeparator: '| ', decimalPlaces: 0 }).split('|')[0]}
                        {trip && formatcoords(trip.coordsArray[trip.coordsArray.length-1][1], trip.coordsArray[trip.coordsArray.length-1][1]).format('DDMMssX', { latLonSeparator: '| ', decimalPlaces: 0}).split('|')[1]}
                    </DataCoords>
                </div>

            </HeadData>
        </Container >


     );
}

export default TripSpecificdata;