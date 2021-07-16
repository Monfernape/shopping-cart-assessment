import axios, { ResponseType } from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    transformResponse: (response) => {
        response.data
    }
})

export default axiosInstance