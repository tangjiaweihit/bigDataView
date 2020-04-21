let baseURL = 'http://vision-api.yottasystem.com'
let mumuqingURL = 'https://vision-api.mumuqing.net'

if (process.env.NODE_ENV == 'development') {
  // baseURL = 'http://10.0.0.7:9010'
}
console.log('now url is:', window.location.host)
if (window.location.host.indexOf('mumuqing.net') > -1) {
  baseURL = mumuqingURL
}
export default {
  baseURL
}
