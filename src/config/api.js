require('dotenv').config()
const ambient = process.env.APP_ENV

let baseURL = 'http://localhost:4000/'
if (ambient === 'production')
  baseURL = 'https://101-server.vercel.app/'
const baseAPI = `${baseURL}api/`

module.exports = {
  baseURL,
  baseAPI
}