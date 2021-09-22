import axios, { Method } from 'axios'
import qs from 'qs'
import history from './history'

type Params = {
    met?: Method;
    url: string;
    data?: object | string;
    params?: object;
    headers?: object;
}

type LoginDate = {
    username: string;
    password: string;
}

const BASE_URL = 'https://nihwl-dscatalog.herokuapp.com'

export const makeRequest = ({met, url, data, params, headers}: Params) => {
    return axios({
        method: met,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers
    })
}

const CLIENT_ID = 'dscatalog'
const CLIENT_SECRET = 'dscatalog123'

export const makeLogin = (data: LoginDate) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const payload = qs.stringify({...data, grant_type: 'password'})

    return makeRequest({url: '/oauth/token', data: payload, met: 'POST', headers: headers});
}

export const makePrivateRequest = ({met, url, data, params}: Params) => {
    const token = recoverSessionData();

    const headers = { Authorization: `Bearer ${token.access_token}` }

    return makeRequest({met, url, data, params, headers});
}

axios.interceptors.response.use((response) => {return response}, (error) => {
    if(error.response.status === 401){
        history.push('/admin/auth/login')
    }
    return Promise.reject(error);
})

type SessionDate = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    firstname: string;
    id: number;
}

export const storageSessionData = (sessionDate: SessionDate) => {
    localStorage.setItem('sessionData', JSON.stringify(sessionDate))
}

export const recoverSessionData = () => {
    const sessionData = localStorage.getItem('sessionData') ?? '{ }'
    // Dando tipo para o retorno da função
    return JSON.parse(sessionData) as SessionDate
}