import React, { useEffect } from 'react';
import { get } from 'idb-keyval';
import  styled  from 'styled-components';
import { theme } from '../../data/styleThemes';
import SailingSVG from '../../images/sailing.svg';
import Trip from '../Trip';

const TripsContainer = styled.div`
    background-color: transparent;
    color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    width: 100%;
    padding: 5px;
    height: calc(100vh - 40px);
    overflow-y: scroll;
`;
const NoRoutes = styled.div`
    background-color: transparent;
    color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    width: 100%;
    padding: 5px;
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const NoRoutesInfo = styled.p`
    margin-top: 5px;
    text-align: center;
    font-family: 'Poppins',sans-serif;
    font-size: 24px;
`;



const Trips = ({state}) => {

    const [tripsArray, setTripsArray] = React.useState([]);


    useEffect(()=>{
        async function getTripsArray(){
            await get("tripsArray").then(val => {
                setTripsArray(val);
            })
        }
        // eslint-disable-next-line no-unused-vars
        let a = getTripsArray();
        return ()=>{
            a = false;
        }
    },[])
    return (
        <TripsContainer state={state}>
            {tripsArray && tripsArray.length >0  ? tripsArray.map(trip => <Trip key={trip.startTime} trip={trip} state={state}/>):(
                <NoRoutes state={state}>
                    <img src={SailingSVG} alt="boat" width="200" height="200"/>
                    <NoRoutesInfo>You don't have any travels yet</NoRoutesInfo>
                </NoRoutes>
            )}
        </TripsContainer>
     );
}

export default Trips;