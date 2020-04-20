import {
  Loading
} from 'element-ui';
let loadingObj = null

export function startLoading() {
  if (loadingObj) {
    return
  }
  loadingObj = Loading.service({
    background: 'rgba(0, 0, 0, 0.3)',
    lock: true
  })
}

export function endLoading() {
  if (loadingObj) {
    loadingObj.close()
  }
  loadingObj = null
}
