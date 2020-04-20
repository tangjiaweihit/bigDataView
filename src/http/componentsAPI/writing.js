import axios from 'axios'
import config from '../config'
import {
  Message
} from 'element-ui';
import quit from '@/common/quit'

const handleError = (error) => {
  let response = error.response
  Message.error(response.data.message)
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
  // 抢单列表
  getTaskList: async (params) => {
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=get_task_list'
      let result = await axios.get(url, {
        params: params
      })
      return checkErrorCode(result.data)
    } catch (error) {
      handleError(error)
    }
  },
  // 抢单
  doTask: async (taskId) => {
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=do_task'
      let result = await axios.post(url, {
        task_id: taskId
      })
      return checkErrorCode(result.data)
    } catch (error) {
      handleError(error)
    }
  },
  // 抢单重置
  resetTaskInfo: async (taskId) => {
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=reset_task_info'
      let result = await axios.post(url, {
        task_id: taskId
      })
      return checkErrorCode(result.data)
    } catch (error) {
      handleError(error)
    }
  },
  // 点评信息
  getReviewPage: async (params) => {
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=get_review_page'
      let result = await axios.get(url, {
        params: params
      })
      return checkErrorCode(result.data);
    } catch (error) {
      handleError(error)
    }
  },
  // 点评提交
  doReview: async (data) => {
    try {
      let url = '/index.php?c=cms_daka_ctrl&m=do_review'
      let result = await axios.post(url, data)
      return checkErrorCode(result.data)
    } catch (error) {
      handleError(error)
    }
  },
  // 视频上传
  uploadFile: async (data) => {
    try {
      let url = '/index.php?c=util_ctrl&m=upload_file'
      let result = await axios.post(url, data);
      return checkErrorCode(result.data)
    } catch (error) {
      handleError(error)
    }
  }
}
