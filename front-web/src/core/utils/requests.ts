import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import history from './history'
import jwtDecode from 'jwt-decode'

type LoginDate = {
    username: string;
    password: string;
}

const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'https://nihwl-dscatalog.herokuapp.com'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog'
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123'

export const makeRequest = (params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL: BASE_URL
    })
}

export const makeLogin = (data: LoginDate) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const payload = qs.stringify({...data, grant_type: 'password'})

    return makeRequest({url: '/oauth/token', data: payload, method: 'POST', headers: headers});
}

export const makePrivateRequest = (params: AxiosRequestConfig) => {
    const token = recoverSessionData();

    const headers = { Authorization: `Bearer ${token.access_token}` }

    return makeRequest({...params, headers});
}

axios.interceptors.response.use((response) => {return response}, (error) => {
    if(error.response.status === 401){
        history.push('/auth/login')
        makeLogout()
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
    const sessionData = localStorage.getItem('sessionData') ?? '{}'
    // Dando tipo para o retorno da função
    return JSON.parse(sessionData) as SessionDate
}

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[]
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN'

export const getTokenDecoded = () => {
    const sessionData = recoverSessionData()
    try {
        const tokenDecoded = jwtDecode(sessionData.access_token)
        return tokenDecoded as AccessToken; 
    } catch (error) {
        return { } as AccessToken
    }
}

const isTokenValid = () => {
    const { exp } =  getTokenDecoded();
    return Date.now() <= exp * 1000
}

export const isAuthenticated = () => {
    // Token não pode estar expirado
    // 'authData' tem que estar no local storage
    // Destruct, pegar apenas atributo desejado do objeto

    const sessionData = recoverSessionData();
    return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = (roles : Role[] = []) => {
    // Verificar se a lista contém a role do usuário
    if (roles.length === 0){ return true;}
    const { authorities } = getTokenDecoded()

    return roles.some(r => authorities?.includes(r));
}

export const makeLogout = () => {
    localStorage.removeItem('sessionData')
    history.replace('/')
}