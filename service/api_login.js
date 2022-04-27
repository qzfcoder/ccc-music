import {
  ttLoginRequest
} from './index'
export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: res => {
        const code = res.code
        resolve(code)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export function sendCodeToServer(code) {
  return ttLoginRequest.post("/login", {
    code
  })
}
export function checkToken() {
  return ttLoginRequest.post("/auth", {}, true)
}
export function postFavorRequest(id) {
  return ttLoginRequest.post("/api/favor", { id }, true)
}

export function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '啦啦啦啦啦啦啦啦啦啦啦',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}