// pages/music-player/index.js
import {
  getSongDetail
} from '../../service/api_player'
import {
  NavBarHeight
} from '../../constants/device-const'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSong: {},
    currentPage: 0,
    contentHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传入的id
    const id = options.id
    console.log(options)
    // 通过id获取歌曲信息
    this.getPageDate(id)
    // 动态计算高度
    const screenHeight = getApp().globalData.screenHeight
    const statusBarHeight = getApp().globalData.statusBarHeight
    const contentHeight = screenHeight - statusBarHeight - NavBarHeight
    this.setData({
      contentHeight: contentHeight
    })

    // 4.创建播放器
    const audioContext = wx.createInnerAudioContext()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.play()
    setTimeout(() => {
      audioContext.pause()
    }, 5000);
  },
  // 网络请求
  getPageDate: function (id) {
    getSongDetail(id).then(res => {
      console.log(res)
      this.setData({
        currentSong: res.songs[0]
      })
    })
  },
  handleSwiperChange: function (event) {
    this.setData({
      currentPage: event.detail.current
    })
  }
})