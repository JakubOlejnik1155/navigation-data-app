import React from 'react';
import {useParams} from 'react-router-dom'

const TripSpecificdata = ({state}) => {
    const { tripTime } = useParams();
    return (
        <>
            {tripTime}
        </>
     );
}

export default TripSpecificdata;