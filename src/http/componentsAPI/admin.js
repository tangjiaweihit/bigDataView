import axios from 'axios'
// import md5 from 'md5'
import config from '../config'
import {
  Message
} from 'element-ui';
import {
  startLoading,
  endLoading
} from '../processing'
import cookie from 'js-cookie'
import quit from '@/common/quit'
// axios.defaults.baseURL = config.baseURL

function authHeader() {
  return {
    // Accept: 'application/json',
    'Content-Type': 'text/html; charset=UTF-8',
  }
}
const handleError = (error) => {
  console.log('response', error)
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
  login: async (uerrname, password) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_ctrl&m=login_cms'
      const data = {
        mobile: uerrname,
        pwd: md5(password)
      }
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getCourseSettingList: async () => {
    startLoading();
    try {
      let url = '/index.php?c=cms_course_ctrl&m=get_course_list'
      let result = await axios.get(url)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getCourseSettingDetail: async (course_id) => {
    startLoading();
    try {
      let url = '/index.php?c=Cms_course_ctrl&m=get_course_detail'
      const params = {
        course_id,
      }

      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getCourseManageList: async (params) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_course_ctrl&m=course_page_to_auth'
      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getCourseManageDetail: async (params) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_course_ctrl&m=user_course_page_to_auth'
      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  setCourseManageDetailLockNum: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_course_ctrl&m=unlock_user_course'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  setCourseManageDetailTempCourseTime: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_course_ctrl&m=delay_user_free_course'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getAccountList: async (params) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=get_user_list'
      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getEmployeeList: async (params) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=get_staff_list'
      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  addNewStudent: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=add_user'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  updateNewStudent: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=update_user'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  updateStopStudent: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=set_user_status'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  updateNewAccount: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=update_staff'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  addNewAccount: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=add_staff'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  resetPassword: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=reset_pwd'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getSalerList: async params => {
    startLoading();
    try {
      let url = '/index.php?c=cms_saler_ctrl&m=get_saler_list'
      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  addNewSalar: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_saler_ctrl&m=add_saler'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getActivList: async () => {
    startLoading();
    try {
      let url = '/index.php?c=cms_ad_ctrl&m=get_ad_list'
      let result = await axios.post(url)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getTraceList: async params => {
    startLoading();
    try {
      let url = '/index.php?c=cms_trace_ctrl&m=get_trace_list'
      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getFeedbackList: async params => {
    startLoading();
    try {
      let url = '/index.php?c=cms_trace_ctrl&m=get_feedback_list'
      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getFeedbackDetail: async params => {
    startLoading();
    try {
      let url = '/index.php?c=cms_trace_ctrl&m=get_feedback_detail'
      let result = await axios.get(url, {
        params: params,
      })
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getAllSalerList: async () => {
    startLoading();
    try {
      let url = '/index.php?c=cms_saler_ctrl&m=get_all_salers'
      let result = await axios.get(url)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },
  getStudentShowTag: async (data) => {
    startLoading();
    try {
      let url = '/index.php?c=cms_user_ctrl&m=set_user_tag'
      let result = await axios.post(url, data)
      endLoading()
      return checkErrorCode(result.data)
    } catch (error) {
      endLoading()
      handleError(error)
    }
  },

}
