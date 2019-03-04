import axios from 'axios'

const { API_BASE_URL } = process.env

export const getEmissionsByCountry = (country, perCapita = false) => (
    axios.get(`${API_BASE_URL}/emissions?country=${country}&perCapita=${perCapita ? 'true' : 'false'}`)
)

export const getPopulationsByCountry = (country) => (
    axios.get(`${API_BASE_URL}/populations?country=${country}`)
)

export const getCountries = (query) => (
    axios.get(`${API_BASE_URL}/countries?search=${query || ''}`)
)
