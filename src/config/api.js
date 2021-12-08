require('dotenv').config()

let baseURL = 'http://localhost:4000/'
if (process.env.APP_ENV === 'production')
  baseURL = 'https://101-server.vercel.app/'
const baseAPI = `${baseURL}api/`

module.exports = {
  baseURL,
  baseAPI
}