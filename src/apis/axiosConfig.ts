import { getCookie } from '@helpers/cookies'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.timeout = 1000000 // Set a timeout limit
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] =`Bearer ${getCookie('token')}`
