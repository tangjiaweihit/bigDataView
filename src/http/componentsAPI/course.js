import axios from 'axios'
import {
  Message
} from 'element-ui';
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
    getCourseList: async (params) => {
        try {
            let url = '/index.php?c=cms_course_ctrl&m=get_course_list'
            let result = await axios.get(url, {params: params})
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    getCourseDetail: async (params) => {
        try {
            let url = '/index.php?c=Cms_course_ctrl&m=get_course_detail'
            let result = await axios.get(url, {params: params})
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    uploadMedia: async (data) => {
        try {
            let url = '/index.php?c=util_ctrl&m=cms_upload_media'
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    createCourse: async (data) => {
        try {
            let url = '/index.php?c=cms_course_ctrl&m=create_course'
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    updateCourse: async (data) => {
        try {
            let url = '/index.php?c=cms_course_ctrl&m=update_course'
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    delCourse: async (data) => {
        try {
            let url = '/index.php?c=cms_course_ctrl&m=del_course'
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    addChapter: async (data) => {
        try {
            let url = '/index.php?c=cms_chapter_ctrl&m=add_chapter_for_course'
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    updateChapter: async (data) => {
        try {
            let url = '/index.php?c=cms_chapter_ctrl&m=update_chapter'
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    delChapter: async (data) => {
        try {
            let url = '/index.php?c=cms_chapter_ctrl&m=del_chapter'
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    getChapterDetail: async (data) => {
        try {
            let url = `/index.php?c=cms_chapter_ctrl&m=get_chapter_detail`
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    getWordVideo: async (data) => {
        try {
            let url = `/index.php?c=cms_video_ctrl&m=get_word_video_info`
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    saveVideo: async (data) => {
        try {
            let url = `/index.php?c=cms_video_ctrl&m=save_video`
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
    updateVideo: async (data) => {
        try {
            let url = `/index.php?c=cms_video_ctrl&m=update_video`
            let result = await axios.post(url, data)
            return checkErrorCode(result.data)
        } catch (error) {
            handleError(error)
        }
    },
}