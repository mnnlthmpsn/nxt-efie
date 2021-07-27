import axios from "axios"

const apiURL = 'https://efi-back.herokuapp.com'

export const loginURI = async params => {
    try {
        const res = await axios.post(`${apiURL}/auth/local`, params)
        return res.data
    } catch (err) {
        throw err
    }
}

export const signupURI = async params => {
    try {
        const res = await axios.post(`${apiURL}/auth/local/register`, params)
        return res.data
    } catch (err) {
        throw err
    }
}

export const checkEmail = async email => {
    try {
        const res = await axios.get(`${apiURL}/users?email=${email}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export const getHomes = async id => {
    try {
        const res = await axios.get(`${apiURL}/homes?landlord=${id}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export const uploadHome = async fdt => {
    try {
        const res = await axios.post(`${apiURL}/homes`, fdt)
        return res
    } catch (err) {
        throw err
    }
}

export const getTowns = async () => {
    try {
        const res = await axios.get(`${apiURL}/towns`)
        return res.data
    } catch (err) {
        throw err
    }
}

export const getSuburbsURI = async tid => {
    try {
        const res = await axios.get(`${apiURL}/suburbs?town=${tid}`)
        return res.data
    } catch (err) {
        throw err
    }
}

export const getHomeURI = async hid => {
    try {
        const res = await axios.get(`${apiURL}/homes/${hid}`)
        return res.data
    } catch (err) {
        throw err
    }
}