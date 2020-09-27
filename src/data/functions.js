import {SERVER} from './breakpoints';


export const postFetchFunction = async (concatURL, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(SERVER.concat(concatURL), options);
    return response.json();
};