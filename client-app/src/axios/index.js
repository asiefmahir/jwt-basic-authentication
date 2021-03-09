import axios from 'axios'

/**
 * @exports
 * @name axiosInstance
 */
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/users',
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
})
