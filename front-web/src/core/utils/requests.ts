import axios, { Method } from 'axios'

type Params = {
    met?: Method;
    url: string;
    data?: object;
    params?: object;
}

// Usando proxy
const BASE_URL = 'http://localhost:3000'

export const makeRequest = ({met, url, data, params}: Params) => {
    return axios({
        method: met,
        url: `${BASE_URL}${url}`,
        data,
        params
    })
    
}