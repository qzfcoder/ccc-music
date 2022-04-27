// app.js
import {
  getLoginCode,
  sendCodeToServer,
  checkToken,
  checkSession,
} from './service/api_login'
import {
  TOKEN_KEY
} from './constants/token_const'
App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0
  },
  onLaunch: function () {
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    // 2.让用户默认进行登录
    this.handleLogin()
    // 3、获取用户的信息
  },
  handleLogin: async function () {
    const token = wx.getStorageSync(TOKEN_KEY)
    // token有没有过期
    const checkResult = await checkToken()
    console.log(checkResult)
    // 判断session是否过期
    const isSessionExpire = await checkSession()

    if (!token || checkResult.errorCode || !isSessionExpire) {
      this.loginAction()
    }
  },
  loginAction: async function () {
    const code = await getLoginCode()
    // 将code发送给服务器
    const result = await sendCodeToServer(code)
    const token = result.token
    console.log(token)
    wx.setStorageSync(TOKEN_KEY, token)
  }
})