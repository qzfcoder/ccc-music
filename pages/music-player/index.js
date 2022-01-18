// pages/music-player/index.js
// import {
//   getSongDetail,
//   getSongLyric
// } from '../../service/api_player'
import {
  NavBarHeight
} from '../../constants/device-const'
import {
  audioContext,
  playerStore
} from '../../store/index'
// import {
//   parseLyric
// } from '../../utils/parseLyric'

const playModeNames = ['order', 'repeat', 'random']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 网络请求的数据
    currentSong: {},
    lyricInfos: [],
    duration: 0,

    currentTime: 0,
    currentLyricText: '',
    currentLyricIndex: 0,

    currentPage: 0,
    contentHeight: 0,
    isMusicLyric: true,
    sliderValue: 0,

    isSliderChanging: false,

    lyricScrollTop: 0,

    playModeIndex: 0,
    playModeName: 'order',
    isPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传入的id
    const id = options.id
    console.log(options)
    // 通过id获取歌曲信息
    // this.getPageDate(id)
    this.setupPlayStoreListener()
    playerStore.dispatch("playMusicWithSongIdAction", {
      id
    })
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
  },

  setupPlayStoreListener: function () {
    playerStore.onStates(["currentSong", "lyricInfos", "duration"], ({
      currentSong,
      lyricInfos,
      duration
    }) => {
      if (currentSong) this.setData({
        currentSong
      })
      if (lyricInfos) this.setData({
        lyricInfos
      })
      if (duration) this.setData({
        duration
      })
    })
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
      currentTime,
      currentLyricIndex,
      currentLyricText
    }) => {

      if (currentTime && !this.data.isSliderChanging) this.setData({
        currentTime,
        sliderValue: currentTime / this.data.duration * 100
      })
      if (currentLyricIndex) this.setData({
        currentLyricIndex,
        lyricScrollTop: 35 * currentLyricIndex
      })
      if (currentLyricText) this.setData({
        currentLyricText
      })
    })
    playerStore.onStates(["playModeIndex", "isPlay"], ({
      playModeIndex,
      isPlay
    }) => {
      if (playModeIndex !== undefined) {
        this.setData({ 
          playModeIndex, 
          playModeName: playModeNames[playModeIndex] 
        })
      }

      if (isPlay !== undefined) {
        this.setData({ 
          isPlay,
          playingName: isPlay ? "pause": "resume" 
        })
      }
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
      isSliderChanging: false,
      // sliderValue: value
    })
    audioContext.pause()
    audioContext.seek(this.data.currentTime / 1000)
  },
  handleSliderChanging: function (event) {
    const value = event.detail.value
    const currentTime = this.data.duration * value / 100
    this.setData({
      isSliderChanging: true,
      currentTime
    })
  },
  // 返回时间
  handelBackClick: function () {
    wx.navigateBack()
  },
  handleModeBtnClick: function () {
    let playModeIndex = this.data.playModeIndex + 1
    if (playModeIndex === 3) {
      playModeIndex = 0
    }
    console.log('eeeeee', playModeIndex)
    playerStore.setState('playModeIndex', playModeIndex)
  },
  handlePlayBtnClick: function () {
    // playerStore.setState('isPlay', !this.data.isPlay)
    console.log(!this.data.isPlay)
    playerStore.dispatch("changeMusicPlayStatus", !this.data.isPlay)
  },
  handlePrevBtnClick: function () {
    playerStore.dispatch("changeNewMusicAction", false)
  },
  handleNextBtnClick: function () {
    playerStore.dispatch("changeNewMusicAction")
  },
})