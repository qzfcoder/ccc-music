// pages/music-player/index.js
import {
  getSongDetail
} from '../../service/api_player'
import {
  NavBarHeight
} from '../../constants/device-const'
import {
  audioContext
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSong: {},
    currentPage: 0,
    contentHeight: 0,
    isMusicLyric: true,
    duration: 0,
    currentTime: 0,
    sliderValue: 0
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
    const screenWidth = getApp().globalData.screenWidth
    const contentHeight = screenHeight - statusBarHeight - NavBarHeight
    if (screenHeight / screenWidth < 1.8) {
      this.setData({
        isMusicLyric: false
      })
    }
    this.setData({
      contentHeight: contentHeight
    })

    // 4.使用audioContext播放歌曲
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true
    audioContext.stop()
    audioContext.onCanplay(() => {
      // audioContext.play()
      // audioContext.stop()
    })

    audioContext.onTimeUpdate(() => {
      const currentTime = audioContext.currentTime * 1000
      this.setData({
        currentTime
      })
    })

    // 5.audioContext的事件监听
    // this.setupAudioContextListener()
  },
  // 网络请求
  getPageDate: function (id) {
    getSongDetail(id).then(res => {
      console.log(res)
      this.setData({
        currentSong: res.songs[0],
        duration: res.songs[0].dt
      })
    })
  },
  handleSwiperChange: function (event) {
    this.setData({
      currentPage: event.detail.current
    })
  },
  handleSliderChange: function (event) {
    const value = event.detail.value
    const rate = value / 100
    this.setData({
      currentTime: this.data.duration * rate,
      // sliderValue: value
    })
    audioContext.pause()
    audioContext.seek(this.data.currentTime / 1000)
  }
})