import axios from "axios";
import queryString from "query-string"
import base64 from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getApi = axios.create({
    baseURL: "https://nihwl-dscatalog.herokuapp.com"
})

const CLIENT_ID = 'dscatalog'
const CLIENT_SECRET = 'dscatalog123'

interface AuthProps {
    username: string;
    password: string;
}

export const makeLogin = async (info: AuthProps) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`
    const headers = {
        Authorization: `Basic ${base64.encode(token)}`,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    const result = await getApi.post('/oauth/token', queryString.stringify({ ...info, grant_type: 'password' }), { headers })
    console.log(result.data)

    const { access_token } = result.data

    setKeys("@token", access_token)
}

const setKeys = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.error('Deu merda')
    } 
}

export const isAuthenticated = async () => {
    try {
        const token = await AsyncStorage.getItem("@token")
        console.log('AQUI: ' + token)
        return token ? true : false 

    } catch (e) {
        console.error('Deu merda')
    } 
}

export const doLogout = async () => {
    try {
        await AsyncStorage.removeItem("@token")
    } catch (e) {
        console.error('Deu merda')
    }
}