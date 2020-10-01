import {API, SERVER} from './breakpoints';
import {get} from "idb-keyval";


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
export const getFetchFunction = async (concatURL) => {
    let response = null;
    await get("jwt").then(async value => {
        const options = {
            method: 'GET',
            headers: {
                'auth-token': `${value}`
            }
        };
        response = await fetch(SERVER.concat(concatURL), options);
    })
    return response.json();
}
export const patchFetchFunction = async (concatURL, data) => {
    let response = null;
    await get("jwt").then(async value => {
        const options = {
            method: 'PATCH',
            headers: {
                'auth-token': `${value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        response = await fetch(SERVER.concat(concatURL), options);
    })
    return response.json();
};
export const deleteFetchFunction = async (concatURL) => {
    let response = null;
    await get("jwt").then(async value => {
        const options = {
            method: 'DELETE',
            headers: {
                'auth-token': `${value}`
            }
        };
        response = await fetch(API.concat(concatURL), options);
    })
    return response.json();
}