import axios from 'axios'
import config from '../config'
import {
  Message
} from 'element-ui';
import {
  startLoading,
  endLoading
} from '../processing'

axios.defaults.baseURL = config.baseURL

let base64 = ''

function authHeader() {
  return {
    'x-auth-token': localStorage.getItem('token')
  }
}
const handleError = (error) => {
  let response = error.response
  if (response && (response.status == 401 || response.status == 403)) {
    Message.error(error.response.data.message)
  } else {
    Message.error(error.response.data.message)
  }
}
export default {
  // login: async (username, password) => {
  //   startLoading();
  //   try {
  //     let result = await axios.post('/login', qs.stringify({
  //       username,
  //       password
  //     }), {
  //       emulateJSON: true
  //     })
  //     endLoading()
  //     return result.headers['x-auth-token']
  //   } catch (error) {
  //     endLoading()
  //     Message.error('账号或密码错误，请重新登录')
  //   }
  // },
  getProvinceList: async (date) => {
    startLoading()
    try {
      let result = await axios.get(`/province/${date}`, {})
      endLoading()
      return result
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getStatisticsData: async (date) => {
    startLoading()
    try {
      let result = await axios.get(`/statistics/${date}`, {})
      endLoading()
      return result
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  
}
