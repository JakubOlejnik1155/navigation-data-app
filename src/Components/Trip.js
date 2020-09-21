import React from 'react';
import styled from 'styled-components';
import { theme } from './../data/styleThemes';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { get, set } from 'idb-keyval';

const useStyles = makeStyles(() => ({
    deleteBtn: {
        position: 'absolute',
        top: '2px',
        right:'2px',
    },
    deleteIcon:{
        fill: theme.red,
    }
}));


const TripContainer = styled.div`
    background-color: transparent;
    color: ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
    border: 2px solid ${props => props.state.isNightModeOn ? theme.red : theme.dark};
    border-radius: 5px;
    padding: 5px;
    position: relative;
`;
const Distance = styled.span`
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 18px;
    float: right;
`;
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



const Trip = ({ trip, state }) => {
    const classes = useStyles();

    const deleteTrip = async trip => {
        await get("tripsArray").then(async array => {
            console.log(array);
            let newArray = [];
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                if(element.startTime !== trip.startTime) newArray.push(element)
            }
            await set("tripsArray", newArray);
        })
    }


    return (
        <TripContainer state={state}>
            <span style={{fontWeight: 'light', fontStyle: 'italic'}}>{new Date(trip.startTime).toLocaleDateString()}</span>
            <p>{
                    msToTime(new Date(trip.endTime).getTime() - new Date(trip.startTime).getTime()).hour + "h " +
                    msToTime(new Date(trip.endTime).getTime() - new Date(trip.startTime).getTime()).minute + "m "+
                    msToTime(new Date(trip.endTime).getTime() - new Date(trip.startTime).getTime()).seconds + "s "
                }</p>
            <Distance>{Math.round(trip.tripDistance / 1852 * 10) / 10} nm</Distance>
            <IconButton aria-label="delete" size="small"className={classes.deleteBtn} onClick={()=>{deleteTrip(trip)}}>
                <DeleteIcon fontSize="small" className={classes.deleteIcon}/>
            </IconButton>
        </TripContainer>
     );
}

export default Trip;