import axios from 'axios'
import config from '../config'
import {
  Message
} from 'element-ui';
import {
  startLoading,
  endLoading
} from '../processing'
import qs from 'qs'
import quit from '@/common/quit.js'
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
    quit()
  } else {
    Message.error(error.response.data.message)
  }
}
export default {
  login: async (username, password) => {
    startLoading();
    try {
      let result = await axios.post('/login', qs.stringify({
        username,
        password
      }), {
        emulateJSON: true
      })
      endLoading()
      return result.headers['x-auth-token']
    } catch (error) {
      endLoading()
      Message.error('账号或密码错误，请重新登录')
    }
  },
  getHome: async () => {
    startLoading()
    try {
      let result = await axios.get('/home', {
        headers: authHeader()
      })
      endLoading()
      return result.data.user
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getSelf: async () => {
    startLoading()
    try {
      let result = await axios.get('/user/self', {
        headers: authHeader()
      })
      endLoading()
      return result.data
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  RetrievePassword: async (type, data) => {
    startLoading();
    try {
      console.log('data', type, data)
      let result = undefined
      if (type === 'sendSms') {
        result = await axios.get(`/user/verification/code`, {
          params: data,
        })
      } else if (type === 'verifySms') {
        result = await axios.post('/user/verification/code', data, {})
      }
      endLoading()
      return result
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  saveTestResult: async (data) => {
    startLoading()
    try {
      let result = await axios.post('user/vision/challenge', data, {
        headers: authHeader()
      })
      endLoading()
      return 'success'
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
}
