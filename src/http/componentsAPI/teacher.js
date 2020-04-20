import axios from 'axios'
import config from '../config'
import {
  Message
} from 'element-ui';
import {
  startLoading,
  endLoading
} from '../processing'
import quit from '@/common/quit'

import cookie from 'js-cookie'
// axios.defaults.baseURL = config.baseURL

// function authHeader() {
//   return {
//     'x-auth-token': cookie.get('token')
//   }
// }

// let base64 = ''
const handleError = (error) => {
  let response = error.response
  Message.error(error.response.data.message)
}
const checkErrorCode = (result) => {
  if (result.code == -2) {
    Message.error(result.msg)
    quit()
    return {
      code: -1
    }
  } else if ((result.code == -1)) {
    Message.error(result.msg)
    return {
      code: -1
    }
  } else {
    return result
  }
}
export default {
  getHomeWorkList: async () => {
    startLoading();
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=get_daka_list'
      let result = await axios.get(url)

      endLoading()
      return checkErrorCode(result.data)
      //   return result
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getAntiPhoto: async () => {
    startLoading();
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=get_need_review_daka_info'
      let result = await axios.get(url)

      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  setAntiPhoto: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=set_daka_review_status'
      let result = await axios.get(url, {
        params: data
      })

      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getCompleteCheck: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=check_complete_status'
      let result = await axios.get(url)

      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  setCompleteCheck: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=set_complete_status'
      let result = await axios.post(url, data)

      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getFinancialList: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_saler_ctrl&m=get_order_list'
      let result = await axios.get(url, {
        params: data
      })

      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getCourseSampleList: async () => {
    startLoading();
    try {
      let url = '/index.php?c=cms_saler_ctrl&m=get_simple_course_list'
      let result = await axios.get(url)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
}
