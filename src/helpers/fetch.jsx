
// const baseURL = process.env.REACT_APP_API_URL
const baseURL = 'https://backchatapi.azurewebsites.net/api'


// const { REACT_APP_API_URL } = process.env;
export const fetchSinToken = async (endpoint, data, method='GET') => {


    const url = `${baseURL}/${endpoint}`;

    if (method === 'GET') {
        const resp = await fetch(url);
        return await resp.json();
    }else {
        const resp = await fetch(url,{
            method,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        return await resp.json();

    }



}

export const fetchConToken = async (endpoint, data, method='GET') => {


    const url = `${baseURL}/${endpoint}`;
    console.log(url);
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        const resp = await fetch(url,{
            headers: { 
                'Content-Type': 'application/json',
                'x-token': token}
        });
        return await resp.json();
    }else {
        const resp = await fetch(url,{
            method,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        return await resp.json();

    }



}